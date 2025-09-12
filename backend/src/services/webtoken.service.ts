import jwt from "jsonwebtoken";
import { DotenvConfig } from "../config/env.config";

class WebTokenService {
  sign(id: string, role?: string, username?: string) {
    const payload: any = {
      id,
      role,
      username,
    };

    const token = jwt.sign(payload, DotenvConfig.SECRET_KEY as string, {
      expiresIn:
        DotenvConfig.JWT_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });

    return token;
  }

  verify(token: string, secret: string) {
    return jwt.verify(token, secret);
  }

  emailVerifyToken(id: string) {
    return jwt.sign(
      {
        id,
      },
      DotenvConfig.VERIFY_EMAIL_TOKEN_SECRET as string,
      {
        // same expire time is used in both forgot password and reset-link whille register email
        expiresIn:
          DotenvConfig.VERIFY_EMAIL_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"],
      }
    );
  }
}

export default WebTokenService;
