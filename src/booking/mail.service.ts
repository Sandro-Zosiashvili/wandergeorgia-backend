import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { CreateBookingDto } from './dto/create-booking.dto';
import { buildAdminEmail, buildCustomerEmail } from './email-templates';
import { BANNER_BASE64, BANNER_CID, BANNER_FILENAME } from './banner-image';

/** Header banner shipped inline with every email, referenced by cid in the HTML. */
const bannerAttachment = {
  filename: BANNER_FILENAME,
  content: BANNER_BASE64,
  encoding: 'base64' as const,
  cid: BANNER_CID,
  contentDisposition: 'inline' as const,
};

/**
 * Wraps a single Nodemailer transport (Hostinger SMTP) and knows how to send
 * the two booking emails: one to the admin, one to the customer.
 *
 * Host/port default to Hostinger; override with MAIL_HOST / MAIL_PORT if the
 * mailbox ever moves to another provider. Port 465 uses SSL, 587 uses STARTTLS.
 */
@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter!: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    const user = this.config.get<string>('MAIL_USER');
    const pass = this.config.get<string>('MAIL_APP_PASSWORD');

    if (!user || !pass) {
      this.logger.warn(
        'MAIL_USER / MAIL_APP_PASSWORD are not set — emails will fail until you fill in .env',
      );
    }

    // Hostinger SMTP (host/port overridable via env; 465 = SSL, 587 = STARTTLS).
    const host = this.config.get<string>('MAIL_HOST') ?? 'smtp.hostinger.com';
    const port = Number(this.config.get<string>('MAIL_PORT') ?? 465);

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  /**
   * Send both emails for one booking. The admin email is the important one —
   * if the customer copy fails we don't want to fail the whole request, so it's
   * best-effort and logged.
   */
  async sendBookingEmails(dto: CreateBookingDto): Promise<void> {
    const from = `"WanderKartli" <${this.config.get<string>('MAIL_USER')}>`;
    const adminTo = this.config.get<string>('ADMIN_EMAIL');

    const admin = buildAdminEmail(dto);
    const customer = buildCustomerEmail(dto);

    // 1) Admin — must succeed. Reply-To = customer so the team can reply directly.
    await this.transporter.sendMail({
      from,
      to: adminTo,
      replyTo: `"${dto.name}" <${dto.email}>`,
      subject: admin.subject,
      text: admin.text,
      html: admin.html,
      attachments: [bannerAttachment],
    });

    // 2) Customer copy — best-effort.
    try {
      await this.transporter.sendMail({
        from,
        to: dto.email,
        subject: customer.subject,
        text: customer.text,
        html: customer.html,
        attachments: [bannerAttachment],
      });
    } catch (err) {
      this.logger.error(
        `Booking saved & admin notified, but the customer copy to ${dto.email} failed.`,
        err instanceof Error ? err.stack : String(err),
      );
    }
  }
}
