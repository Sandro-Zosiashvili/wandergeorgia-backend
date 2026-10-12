import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/** A full-screen hero slideshow image, managed from the admin dashboard. */
@Entity('hero_images')
export class HeroImage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** Full image URL (uploaded to Neon storage or pasted). */
  @Column({ type: 'text' })
  imageUrl!: string;

  /** Accessible alt text. */
  @Column({ type: 'text', default: '' })
  alt!: string;

  /** Small location tag shown on the slide (e.g. "Kazbegi"). */
  @Column({ default: '' })
  place!: string;

  /** Manual sort position (lower = earlier). */
  @Column({ type: 'int', default: 0 })
  orderIndex!: number;

  /** Per-locale overrides, e.g. `{ ru: { alt, place } }`. */
  @Column({ type: 'jsonb', nullable: true })
  i18n!: Record<string, Record<string, unknown>> | null;

  @Index()
  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
