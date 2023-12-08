import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Multimedia } from "./multimedia.entity";
import { User } from "./user.entity";

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  commentMessage: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Multimedia, (multimedia) => multimedia.comments, {
    nullable: false,
  })
  multimedia: Multimedia;

  @ManyToOne(() => User, (user) => user.comments, {
    nullable: false,
  })
  user: User;

  constructor(entity: Partial<Comment>) {
    Object.assign(this, entity);
  }
}
