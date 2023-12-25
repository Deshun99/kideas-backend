import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Topic } from "./topic.entity";

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  categoryTitle: string;

  @Column()
  isArchived: boolean;

  @Column()
  forumGuidelines: string;

  @OneToMany(() => Topic, (topic) => topic.category, { cascade: true })
  topics: Topic[];

  constructor(entity: Partial<Category>) {
    Object.assign(this, entity);
  }
}
