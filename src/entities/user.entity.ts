import UserRoleEnum from "src/enums/userRole.enum";
import UserStatusEnum from "src/enums/userStatus.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  contactNo: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.ACTIVE,
  })
  status: UserStatusEnum;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.CONTENT_CREATOR,
  })
  role: UserRoleEnum;

  @Column({ default: 0 })
  points: number;
}
