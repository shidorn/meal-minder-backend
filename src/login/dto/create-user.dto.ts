export class CreateUserDto {
  user_id: number;
  username: string;
  profileImage: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  created_at: Date;
  updated_at: Date;
}
