// Mock Email Service
// Architecture ready for SendGrid, Resend, or Nodemailer integration

export class EmailService {
  static async sendBookingConfirmation(
    email: string,
    bookingNumber: string,
    scheduledDate: Date
  ): Promise<void> {
    console.log(`📧 [MOCK EMAIL] Booking Confirmation sent to ${email}`)
    console.log(`   Booking: ${bookingNumber}`)
    console.log(`   Date: ${scheduledDate.toLocaleDateString()}`)
    
    // TODO: Replace with actual email service
    // Example with SendGrid:
    // await sendgrid.send({
    //   to: email,
    //   from: 'hello@finemovepro.com',
    //   subject: `Booking Confirmation - ${bookingNumber}`,
    //   html: generateBookingConfirmationHTML(bookingNumber, scheduledDate)
    // })
  }

  static async sendQuoteApproval(
    email: string,
    quoteNumber: string,
    price: number
  ): Promise<void> {
    console.log(`📧 [MOCK EMAIL] Quote Approval sent to ${email}`)
    console.log(`   Quote: ${quoteNumber}`)
    console.log(`   Price: $${price}`)
  }

  static async sendInvoice(
    email: string,
    invoiceNumber: string,
    amount: number,
    pdfUrl?: string
  ): Promise<void> {
    console.log(`📧 [MOCK EMAIL] Invoice sent to ${email}`)
    console.log(`   Invoice: ${invoiceNumber}`)
    console.log(`   Amount: $${amount}`)
    console.log(`   PDF: ${pdfUrl || 'Not attached'}`)
  }

  static async sendPasswordReset(email: string, resetLink: string): Promise<void> {
    console.log(`📧 [MOCK EMAIL] Password Reset sent to ${email}`)
    console.log(`   Link: ${resetLink}`)
  }

  static async sendWelcomeEmail(email: string, name: string): Promise<void> {
    console.log(`📧 [MOCK EMAIL] Welcome Email sent to ${email}`)
    console.log(`   Name: ${name}`)
  }

  static async sendBookingReminder(
    email: string,
    bookingNumber: string,
    scheduledDate: Date
  ): Promise<void> {
    console.log(`📧 [MOCK EMAIL] Booking Reminder sent to ${email}`)
    console.log(`   Booking: ${bookingNumber}`)
    console.log(`   Date: ${scheduledDate.toLocaleDateString()}`)
  }

  static async sendStatusUpdate(
    email: string,
    bookingNumber: string,
    status: string
  ): Promise<void> {
    console.log(`📧 [MOCK EMAIL] Status Update sent to ${email}`)
    console.log(`   Booking: ${bookingNumber}`)
    console.log(`   Status: ${status}`)
  }
}
