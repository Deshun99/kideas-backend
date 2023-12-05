import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'upvotes' })
export class Upvote {
    @PrimaryGeneratedColumn()
}
