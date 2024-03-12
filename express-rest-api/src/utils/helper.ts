import UserDto from "../dtos/user-dto";
import tokenService from "../services/tokenService";
import { UserModel } from "../types/types";

export const createUserDtoWithTokens = async (model: UserModel) => {
  const userDto = new UserDto(model);

  // Create a new object with the required properties
  const userModel: UserModel = {
    _id: model._id,
    password: model.password,
    role: model.role,
    email: userDto.email,
    name: userDto.name
  };

  const tokens = tokenService.generateToken({ ...userModel });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};