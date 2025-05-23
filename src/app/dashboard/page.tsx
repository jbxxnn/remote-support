import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Dashboard - VPS Dashboard",
  description: "Overview of VPS monitoring and support",
};

async function getStats() {
  const [activeClients, activeEvents, totalDevices] = await Promise.all([
    prisma.client.count({ where: { status: "ACTIVE" } }),
    prisma.event.count({ where: { status: "NEW" } }),
    prisma.device.count(),
  ]);

  return {
    activeClients,
    activeEvents,
    totalDevices,
  };
}

async function getRecentEvents() {
  return prisma.event.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      client: true,
      device: true,
    },
  });
}

export default async function DashboardPage() {
  const [stats, recentEvents] = await Promise.all([
    getStats(),
    getRecentEvents(),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <dl className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Active Clients
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {stats.activeClients}
          </dd>
        </dl>
        <dl className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Active Events
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {stats.activeEvents}
          </dd>
        </dl>
        <dl className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Devices
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {stats.totalDevices}
          </dd>
        </dl>
      </div>

      {/* Recent Events */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Events</h2>
          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Client
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Device
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Type
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentEvents.map((event) => (
                      <tr key={event.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {event.client.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {event.device?.label || "N/A"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {event.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {event.status}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(event.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 