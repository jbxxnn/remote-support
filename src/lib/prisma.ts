import { PrismaClient } from '../generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export commonly used types
export type { User, Client, Device, Event, Note, Schedule, SOP, Station } from '../generated/prisma'

// Export enums
export { 
  UserRole, 
  ClientStatus, 
  DeviceType, 
  DeviceStatus, 
  EventType, 
  EventStatus, 
  StationStatus 
} from '../generated/prisma' 