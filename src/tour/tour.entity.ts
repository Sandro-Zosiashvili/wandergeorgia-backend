import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/** One day of a tour's itinerary (title + description + its own highlights). */
export interface ItineraryDay {
  title: string;
  description: string;
  highlights: string[];
}

/** A tour in the catalog, managed from the admin dashboard. */
@Entity('tours')
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  /** URL-safe unique identifier used by /tours/[slug]. */
  @Index({ unique: true })
  @Column()
  slug!: string;

  /** 'one-day' | 'multi-day' — validated at the DTO layer. */
  @Column({ default: 'one-day' })
  type!: 'one-day' | 'multi-day';

  /** City / region the tour is based in. */
  @Column({ default: '' })
  location!: string;

  /** Human-readable duration, e.g. "8 hours" or "5 days". */
  @Column({ default: '' })
  duration!: string;

  /** Base price in whole USD. */
  @Column({ type: 'int', default: 0 })
  basePrice!: number;

  @Column({ type: 'text', default: '' })
  overview!: string;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  highlights!: string[];

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  included!: string[];

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  excluded!: string[];

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  itinerary!: ItineraryDay[];

  @Column({ type: 'text', default: '' })
  coverImage!: string;

  @Column({ type: 'jsonb', default: () => "'[]'::jsonb" })
  gallery!: string[];

  @Index()
  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
