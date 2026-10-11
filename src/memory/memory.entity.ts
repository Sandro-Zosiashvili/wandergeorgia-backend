import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * A "Traveler Moment" — a guest-shared photo or video clip from a tour, shown
 * on the home "Moments" section and the /memories gallery. Managed from the
 * admin dashboard.
 */
@Entity('memories')
export class Memory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** 'image' | 'video' — validated at the DTO layer. */
  @Column({ default: 'image' })
  type!: 'image' | 'video';

  /** Full-resolution photo, or the video file played in the lightbox. */
  @Column({ type: 'text', default: '' })
  mediaUrl!: string;

  /** Grid preview image (also the video poster). May be blank for images. */
  @Column({ type: 'text', default: '' })
  thumbnailUrl!: string;

  /** Tour this moment is from, shown as a location tag. */
  @Column({ default: '' })
  tourTitle!: string;

  /** Short traveler quote / caption. */
  @Column({ type: 'text', default: '' })
  caption!: string;

  @Column({ default: '' })
  travelerName!: string;

  /** Traveler's home country — rendered as a tag with a flag. */
  @Column({ default: '' })
  country!: string;

  /** The moment's date as an ISO day string (YYYY-MM-DD). */
  @Column({ type: 'varchar', length: 20, default: '' })
  date!: string;

  /** Manual sort position (lower = earlier). */
  @Column({ type: 'int', default: 0 })
  orderIndex!: number;

  @Index()
  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
