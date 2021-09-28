import { Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('issues')
class Issue {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({nullable: true})
  solicitation!: string;

  @Column({nullable: true})
  solution!: string;

  @Column({nullable: true})
  customerContactId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Issue };