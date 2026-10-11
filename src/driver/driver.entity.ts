import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tour } from '../tour/tour.entity';

/** Availability state of a driver. */
export type DriverStatus = 'ACTIVE' | 'ON_TOUR' | 'INACTIVE';

/** A driver-guide on the team, managed from the admin dashboard. */
@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ default: '' })
  phone!: string;

  /** Photo URL (uploaded to Neon storage or pasted). */
  @Column({ type: 'text', default: '' })
  photo!: string;

  @Column({ type: 'text', default: '' })
  bio!: string;

  @Column({ default: '' })
  vehicleModel!: string;

  @Column({ default: '' })
  plate!: string;

  @Column({ type: 'int', default: 4 })
  capacity!: number;

  @Column({ type: 'varchar', length: 20, default: 'ACTIVE' })
  status!: DriverStatus;

  /** Manual sort position (lower = earlier). */
  @Column({ type: 'int', default: 0 })
  orderIndex!: number;

  @Index()
  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  /**
   * Tours this driver is assigned to (many-to-many). Driver is the owning side;
   * the join table `driver_tours` links driver.id ↔ tour.id.
   */
  @ManyToMany(() => Tour, { cascade: false })
  @JoinTable({
    name: 'driver_tours',
    joinColumn: { name: 'driverId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tourId', referencedColumnName: 'id' },
  })
  tours!: Tour[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
