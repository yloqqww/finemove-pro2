import { prisma } from '@/lib/prisma'

export class NotificationService {
  static async createNotification(
    userId: string,
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info',
    bookingId?: string
  ) {
    return await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        bookingId,
        read: false,
      },
    })
  }

  static async notifyBookingCreated(booking: any) {
    await this.createNotification(
      booking.customer.userId,
      'Booking Created',
      `Your booking ${booking.bookingNumber} has been created successfully.`,
      'success',
      booking.id
    )
  }

  static async notifyBookingConfirmed(booking: any) {
    await this.createNotification(
      booking.customer.userId,
      'Booking Confirmed',
      `Your booking ${booking.bookingNumber} has been confirmed. We'll see you on ${new Date(booking.scheduledDate).toLocaleDateString()}.`,
      'success',
      booking.id
    )
  }

  static async notifyBookingStatusChanged(booking: any, newStatus: string) {
    const statusMessages: { [key: string]: string } = {
      IN_PROGRESS: 'Your booking is now in progress. Our team is on the way!',
      COMPLETED: 'Your booking has been completed successfully. Thank you for choosing FineMove Pro!',
      CANCELLED: 'Your booking has been cancelled.',
      RESCHEDULED: 'Your booking has been rescheduled.',
    }

    await this.createNotification(
      booking.customer.userId,
      'Booking Status Update',
      statusMessages[newStatus] || `Your booking status has been updated to ${newStatus}`,
      newStatus === 'COMPLETED' ? 'success' : 'info',
      booking.id
    )
  }

  static async notifyQuoteApproved(quote: any) {
    await this.createNotification(
      quote.customer.userId,
      'Quote Approved',
      `Your quote ${quote.quoteNumber} has been approved! Price: $${quote.estimatedPrice}`,
      'success'
    )
  }

  static async notifyQuoteRejected(quote: any) {
    await this.createNotification(
      quote.customer.userId,
      'Quote Update',
      `Your quote ${quote.quoteNumber} has been updated. Please review the details.`,
      'info'
    )
  }

  static async notifyInvoiceGenerated(invoice: any) {
    await this.createNotification(
      invoice.customerId,
      'Invoice Generated',
      `Invoice ${invoice.invoiceNumber} is now available. Amount: $${invoice.total}`,
      'info'
    )
  }

  static async getUserNotifications(userId: string, unreadOnly: boolean = false) {
    return await prisma.notification.findMany({
      where: {
        userId,
        ...(unreadOnly && { read: false }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })
  }

  static async markAsRead(notificationId: string) {
    return await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    })
  }

  static async markAllAsRead(userId: string) {
    return await prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    })
  }

  static async getUnreadCount(userId: string): Promise<number> {
    return await prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    })
  }
}
