import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

/** Lifecycle of a booking request. */
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

/** A tour booking request submitted from the website. */
@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  fullName!: string;

  @Index()
  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  tourTitle!: string;

  @Column({ type: 'timestamp' })
  startDate!: Date;

  @Column({ type: 'int' })
  daysCount!: number;

  @Column({ type: 'int' })
  passengers!: number;

  @Column()
  vehicleType!: string;

  @Column({ type: 'int' })
  totalPrice!: number;

  @Column({ type: 'text', nullable: true })
  specialRequests!: string | null;

  /** Internal admin-only notes, editable from the dashboard. */
  @Column({ type: 'text', nullable: true })
  adminNotes!: string | null;

  /** Payment state, set by the admin. Plain varchar (not a pg enum) so the
   *  column can be added without enum-type DDL. */
  @Column({ type: 'varchar', length: 20, default: 'UNPAID' })
  paymentStatus!: 'UNPAID' | 'DEPOSIT_PAID' | 'FULL_PAID';

  /** Assigned driver's name (from the team roster), or null. */
  @Column({ type: 'text', nullable: true })
  driverName!: string | null;

  @Index()
  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status!: BookingStatus;

  @CreateDateColumn()
  createdAt!: Date;
}
