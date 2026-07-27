import { prisma } from '@/lib/prisma'
import { TimeSlot } from '@prisma/client'
import { addDays } from 'date-fns'

export class CalendarService {
  static async getAvailableSlots(startDate: Date, endDate: Date) {
    return await prisma.calendarSlot.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
        available: true,
      },
      orderBy: {
        date: 'asc',
      },
    })
  }

  static async checkAvailability(date: Date, timeSlot: TimeSlot): Promise<boolean> {
    const slot = await prisma.calendarSlot.findUnique({
      where: {
        date_timeSlot: {
          date,
          timeSlot,
        },
      },
    })

    if (!slot) return false
    return slot.available && slot.booked < slot.capacity
  }

  static async bookSlot(date: Date, timeSlot: TimeSlot): Promise<void> {
    const slot = await prisma.calendarSlot.findUnique({
      where: {
        date_timeSlot: {
          date,
          timeSlot,
        },
      },
    })

    if (!slot) {
      // Create new slot if doesn't exist
      await prisma.calendarSlot.create({
        data: {
          date,
          timeSlot,
          capacity: 3,
          booked: 1,
          available: true,
        },
      })
    } else {
      await prisma.calendarSlot.update({
        where: {
          date_timeSlot: {
            date,
            timeSlot,
          },
        },
        data: {
          booked: slot.booked + 1,
          available: slot.booked + 1 < slot.capacity,
        },
      })
    }
  }

  static async releaseSlot(date: Date, timeSlot: TimeSlot): Promise<void> {
    const slot = await prisma.calendarSlot.findUnique({
      where: {
        date_timeSlot: {
          date,
          timeSlot,
        },
      },
    })

    if (slot && slot.booked > 0) {
      await prisma.calendarSlot.update({
        where: {
          date_timeSlot: {
            date,
            timeSlot,
          },
        },
        data: {
          booked: slot.booked - 1,
          available: true,
        },
      })
    }
  }

  static async initializeCalendarSlots(days: number = 90): Promise<void> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < days; i++) {
      const date = addDays(today, i)
      
      for (const slot of [TimeSlot.MORNING, TimeSlot.AFTERNOON, TimeSlot.EVENING]) {
        const exists = await prisma.calendarSlot.findUnique({
          where: {
            date_timeSlot: {
              date,
              timeSlot: slot,
            },
          },
        })

        if (!exists) {
          await prisma.calendarSlot.create({
            data: {
              date,
              timeSlot: slot,
              capacity: 3,
              booked: 0,
              available: true,
            },
          })
        }
      }
    }
  }
}
