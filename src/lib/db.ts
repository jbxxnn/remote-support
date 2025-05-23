import { prisma } from './prisma'
import { 
  UserRole,
  ClientStatus,
  DeviceStatus,
  EventType,
  EventStatus,
  StationStatus
} from '../generated/prisma'

// User operations
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      accounts: true,
      stations: true
    }
  })
}

export async function createUser(data: {
  name?: string
  email: string
  password?: string
  role?: UserRole
}) {
  return prisma.user.create({
    data
  })
}

// Client operations
export async function getClientById(id: string) {
  return prisma.client.findUnique({
    where: { id },
    include: {
      devices: true,
      schedules: true,
      sopAssignments: {
        include: {
          sop: true
        }
      }
    }
  })
}

export async function getClientsByStatus(status: ClientStatus) {
  return prisma.client.findMany({
    where: { status },
    include: {
      devices: true,
      events: {
        where: {
          status: 'NEW'
        }
      }
    }
  })
}

// Event operations
export async function createEvent(data: {
  type: EventType
  clientId: string
  deviceId?: string
  clipUrl?: string
}) {
  return prisma.event.create({
    data,
    include: {
      client: true,
      device: true
    }
  })
}

export async function updateEventStatus(id: string, status: EventStatus, staffId?: string) {
  return prisma.event.update({
    where: { id },
    data: {
      status,
      staffId,
      resolvedAt: status === 'RESOLVED' ? new Date() : undefined
    },
    include: {
      client: true,
      device: true,
      staff: true
    }
  })
}

// Device operations
export async function updateDeviceStatus(id: string, status: DeviceStatus) {
  return prisma.device.update({
    where: { id },
    data: { status }
  })
}

// Station operations
export async function updateStationStatus(id: string, status: StationStatus, userId?: string) {
  return prisma.station.update({
    where: { id },
    data: {
      status,
      userId,
      lastActive: new Date()
    }
  })
}

// SOP operations
export async function getSOPsByEventType(eventType: EventType) {
  return prisma.sOP.findMany({
    where: { eventType },
    include: {
      assignments: {
        include: {
          client: true
        }
      }
    }
  })
}

// Note operations
export async function createNote(data: {
  content: string
  eventId: string
  staffId: string
}) {
  return prisma.note.create({
    data,
    include: {
      event: true,
      staff: true
    }
  })
}

// Schedule operations
export async function getClientSchedule(clientId: string) {
  return prisma.schedule.findMany({
    where: { clientId },
    orderBy: [
      { dayOfWeek: 'asc' },
      { startTime: 'asc' }
    ]
  })
} 