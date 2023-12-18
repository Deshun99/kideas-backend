import UserRoleEnum from "src/enums/userRole.enum";
import UserStatusEnum from "src/enums/userStatus.enum";

export class CreateUserDto {
  userName: string;
  email: string;
  password: string;
  contactNo: string;
  createdAt: Date;
  profilePictureUrl: string;
  status: UserStatusEnum;
  role: UserRoleEnum;
  points: number;
}
