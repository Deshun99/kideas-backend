import MultimediaStatusEnum from "src/enums/multimediaStatus.enum";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Topic } from "./topic.entity";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity({ name: 'multimedias' })
export class Multimedia {
  @PrimaryGeneratedColumn()
  multimediaId: number;

  @Column()
  videoLinkUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  thumbnailUrl: string;

  @Column()
  multimediaTitle: string;

  @Column()
  multimediaDescription: string;

  @Column({
    type: 'enum',
    enum: MultimediaStatusEnum,
    default: MultimediaStatusEnum.ACTIVE,
  })
  status: MultimediaStatusEnum;

  @ManyToOne(() => Topic, (topic) => topic.multimedias, {
    nullable: false,
  })
  topic: Topic;

  @ManyToOne(() => User, (user) => user.multimedias, {
    nullable: false,
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.multimedia, {
    cascade: true,
  })
  comments: Comment[];

  constructor(entity: Partial<Multimedia>) {
    Object.assign(this, entity);
  }
}
