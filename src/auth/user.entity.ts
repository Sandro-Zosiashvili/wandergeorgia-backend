import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

/** Admin user for the private dashboard. No public registration — seeded only. */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email!: string;

  /** bcrypt hash — never returned to the client. */
  @Column()
  password!: string;

  @Column({ default: 'ADMIN' })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
