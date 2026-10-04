import { Injectable, Logger } from '@nestjs/common';
import type { CreateBookingDto } from './dto/create-booking.dto';
import { MailService } from './mail.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    private readonly mail: MailService,
    private readonly prisma: PrismaService,
  ) {}

  async submit(dto: CreateBookingDto): Promise<{ ok: true }> {
    // Honeypot tripped → almost certainly a bot. Pretend success, send nothing.
    if (dto.company) {
      this.logger.warn(`Honeypot tripped for "${dto.email}" — dropped silently.`);
      return { ok: true };
    }

    // Persist the booking (status defaults to PENDING). A DB hiccup must never
    // swallow the request, so we log and still send the notification emails.
    await this.save(dto);

    await this.mail.sendBookingEmails(dto);
    this.logger.log(`Booking request emailed for "${dto.name}" — ${dto.tourTitle}.`);
    return { ok: true };
  }

  /** Store the booking row in Neon. Failures are logged, not thrown. */
  private async save(dto: CreateBookingDto): Promise<void> {
    try {
      const booking = await this.prisma.booking.create({
        data: {
          fullName: dto.name,
          email: dto.email,
          phone: dto.phone,
          tourTitle: dto.tourTitle,
          startDate: new Date(dto.arrivalDate),
          daysCount: dto.days ?? 1,
          passengers: dto.travelers,
          vehicleType: dto.vehicle ?? 'Not specified',
          totalPrice: dto.total,
          specialRequests: dto.flightDetails ?? null,
        },
      });
      this.logger.log(`Booking saved to Neon (id ${booking.id}).`);
    } catch (err) {
      this.logger.error(
        `Failed to save booking for "${dto.email}" — emailing anyway.`,
        err instanceof Error ? err.stack : String(err),
      );
    }
  }
}
