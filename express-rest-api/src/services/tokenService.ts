import jwt from 'jsonwebtoken';
import { Token } from '../models/token';
import { UserModel } from '../types/types';

class TokenService {
  generateToken(payload: UserModel) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '30m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30d'});

    return {
      accessToken,
      refreshToken
    };
  };

  validateAccessToken(token: string) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
      console.log(tokenData);

      return tokenData;
    } catch (err) {
      return null;
    }
  };

  validateRefreshToken(token: string) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
      
      return tokenData;
    } catch (err) {
      return null;
    }
  };

  async saveToken(userId: string, refreshToken: string) {
    try {
      const tokenData = await Token.findOne({user: userId});

      if (tokenData) {
        tokenData.refreshToken = refreshToken;
        await tokenData.save();

        return tokenData;
      }

      const token = await Token.create({user: userId, refreshToken});
      return token;
    } catch (err) {
      console.log(err);
    }
  };

  async removeToken(refreshToken: string) {
    const deletedToken = await Token.deleteOne({refreshToken});
    return deletedToken;
  };

  async findTokenInDb(refreshToken: string) {
    const tokenToFind = await Token.findOne({refreshToken});

    return tokenToFind;
  }
}

export default new TokenService();