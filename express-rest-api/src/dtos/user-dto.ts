import { UserModel } from "../types/types";

//class that creates data-transfer-object, which doesn`t have any secure information and may be sent to frontend

class UserDto {
  name: String;
  email: String;
  id: string;

  constructor(model: UserModel ) {
    this.email = model.email;
    this.name = model.name,
    this.id = model._id.toString();
  }
}

export default UserDto;