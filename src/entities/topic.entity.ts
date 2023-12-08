import TopicStatusEnum from "src/enums/topicStatus.enum";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { Multimedia } from "./multimedia.entity";

@Entity({ name: 'topics' })
export class Topic {
  @PrimaryGeneratedColumn()
  topicId: number;

  @Column()
  topicTitle: string;

  @Column()
  topicDesiption: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: TopicStatusEnum,
    default: TopicStatusEnum.ACTIVE,
  })
  status: TopicStatusEnum;

  @ManyToOne(() => User, (user) => user.topics, {
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Category, (category) => category.topics, {
    nullable: false,
  })
  category: Category;

  @OneToMany(() => Multimedia, (multimedia) => multimedia.topic, { cascade: true })
  multimedias: Multimedia[];

  constructor(entity: Partial<Topic>) {
    Object.assign(this, entity);
  }
}