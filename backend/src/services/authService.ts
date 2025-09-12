// // import { db } from "../../prisma/db";
// // import bcrypt from "bcrypt";
// // import { generateToken } from "../utils/jwt";
// // import { RegisterDto } from "../dtos/registerDto";
// // import { UserDto } from "../dtos/userDto";
// // import { RoleType } from "@prisma/client";
// // import HttpException from "../utils/HttpException.utils";

// // export const register = async (userData: RegisterDto) => {
// //   const hashedPassword = await bcrypt.hash(userData.password, 10);
// //   const user = await db.user.create({
// //     data: {
// //       email: userData.email,
// //       password: hashedPassword,
// //       username: userData.username,
// //       firstName: userData.firstName,
// //       lastName: userData.lastName,
// //       role: userData.role as RoleType,
// //       displayName:
// //         userData.firstName && userData.lastName
// //           ? `${userData.firstName} ${userData.lastName}`
// //           : null,
// //       tenantId: userData.tenantId,
// //     },
// //   });
// //   return generateToken(user.id, user.role, user.username, user.email);
// // };

// // export const login = async (userData: UserDto) => {
// //   try {
// //     const user = await db.user.findUnique({ where: { email: userData.email } });
// //     console.log("check user here", user);

// //     if (user) {
// //     }
// //     throw HttpException.unauthorized("Invalid Credentials");
// //   } catch (error: any) {
// //     throw HttpException.badRequest(error?.message);
// //   }
// // };

// //////////////////////////////
// // new way ///////////////////

// import { db } from "../../prisma/db";
// import bcrypt from "bcrypt";
// import { generateToken } from "../utils/jwt";
// import { RegisterDto } from "../dtos/registerDto";
// import { UserDto } from "../dtos/userDto";
// import { RoleType } from "@prisma/client";
// import HttpException from "../utils/HttpException.utils";
// import WebTokenServices from "./webtoken.service";
// import BcryptService from "./bcrypt.service";

// export const register = async (userData: RegisterDto) => {
//   const hashedPassword = await bcrypt.hash(userData.password, 10);
//   const user = await db.user.create({
//     data: {
//       email: userData.email,
//       password: hashedPassword,
//       username: userData.username,
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       role: userData.role as RoleType,
//       displayName:
//         userData.firstName && userData.lastName
//           ? `${userData.firstName} ${userData.lastName}`
//           : null,
//       tenantId: userData.tenantId,
//     },
//   });
//   return generateToken(user.id, user.role, user.username, user.email);
// };

// export const login = async (userData: UserDto) => {
//   try {
//     const user = await db.user.findUnique({ where: { email: userData.email } });
//     console.log("check user here", user);

//     if (user) {
//     }
//     throw HttpException.unauthorized("Invalid Credentials");
//   } catch (error: any) {
//     throw HttpException.badRequest(error?.message);
//   }
// };

// class AuthService {
//   constructor(
//     private readonly bcryptService = new BcryptService(),
//     private readonly webTokenGenerate = new WebTokenServices()
//   ) {}
// }

// export default new AuthService();

import { JwtPayload } from "jsonwebtoken";
import { db } from "../../prisma/db";
import { RegisterDto } from "../dtos/registerDto";
import { UserDto } from "../dtos/userDto";
import { RoleType } from "@prisma/client";
import HttpException from "../utils/HttpException.utils";
import WebTokenServices from "./webtoken.service";
import BcryptService from "./bcrypt.service";
import { ROLE } from "../constant/enum";
import crypto from "crypto";
import { DotenvConfig } from "../config/env.config";
import { loadTemplate } from "../utils/loadTemplate.utils";
import { SendGridEmailService } from "./utils/sendGridEmail.service";

export interface IMailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  from?: {
    name: string;
    address: string;
  };
}

export interface VerifiedToken extends JwtPayload {
  id: string;
}

const generateShortKey = (): string => {
  return crypto.randomBytes(8).toString("hex"); // Generates a 16-character hexadecimal key
};

const shortenToken = async (token: string) => {
  const shortKey = generateShortKey();

  const tokenCreated = await db.token.create({
    data: {
      token: token,
      shortToken: shortKey,
      timestamp: new Date(),
    },
  });

  return tokenCreated?.shortToken;
};

class AuthService {
  constructor(
    private readonly bcryptService = new BcryptService(),
    private readonly webTokenService = new WebTokenServices(),
    private readonly emailService = new SendGridEmailService()
  ) {}

  async register(userData: RegisterDto) {
    const hashedPassword = await this.bcryptService.hash(userData.password);

    const checkEmail = await db.user.findFirst({
      where: { email: userData.email },
    });

    if (checkEmail) {
      throw HttpException.badRequest("Email already in use.");
    }

    const user = await db.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role as RoleType,
        displayName:
          userData.firstName && userData.lastName
            ? `${userData.firstName} ${userData.lastName}`
            : null,
        tenantId: userData.tenantId,
      },
    });

    const token = this.webTokenService.sign(
      user?.id as string,
      user?.role as string
    );

    return {
      token,
    };
  }

  async login(userData: UserDto, request: any) {
    try {
      const user = await db.user.findUnique({
        where: { email: userData.email },
      });

      console.log("check request here", request.body);

      if (!user) {
        throw HttpException.unauthorized("Invalid Credentials");
      }

      const isPasswordValid = await this.bcryptService.compare(
        userData.password,
        user.password
      );

      if (!isPasswordValid) {
        throw HttpException.unauthorized("Invalid Credentials");
      }

      if (user) {
        console.log("check user here while login", user);
        if (
          await this.bcryptService.compare(userData.password, user.password)
        ) {
          const token = this.webTokenService.sign(
            user?.id as string,
            user?.role as string,
            user?.username as string
          );

          const { role, id, ...response } = user;

          if (user.role === ROLE.ADMINISTRATOR) {
            // todo do work specific to like super admin
            // like update login history like so
          } else {
            // for other users other than ADMINISTRATOR role
          }

          // do something like if login change some files like
          // status lets say

          /**
           * user.status = 'active
           * await user.save() do this if user match only this section
           * is hit only if credentials math
           */

          console.log("if login success token here i am", token);

          return {
            message: "Login Successful",
            data: {
              user: response,
              token: { accessToken: token },
            },
          };
        }
      }
      throw HttpException.unauthorized("Invalid credentials");
    } catch (error: any) {
      throw HttpException.badRequest(error?.message);
    }
  }

  async forgotPassword(email: string) {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) throw HttpException.badRequest("Given Email does not exist");

    const token = this.webTokenService.emailVerifyToken(user.id as string);

    const shortenedToken = await shortenToken(token);
    const resetLink = `${DotenvConfig.FRONTEND_URL}/auth/reset-password/${shortenedToken}`;

    const replacement = {
      RECIPIENT_FNAME: user.username,
      LINK: resetLink,
    };

    const mailOptions: IMailOptions = {
      to: user?.email,
      subject: "Regarding password reset",
      text: "Realestate Puja",
      html: await loadTemplate("resetPassword.html", replacement),
    };
    this.emailService.sendMail(mailOptions);
    user.resetPassword = true;
    await db.user.update({ where: { email: user.email }, data: user });
    return;
  }

  async resetPassword(password: string, token: string) {
    try {
      console.log("check password token here", password, token);

      // 1️⃣ Get token record
      const tokenRecord = await db.token.findFirst({
        where: { shortToken: token },
      });
      if (!tokenRecord)
        throw HttpException.conflict("Invalid or expired token");

      // 2️⃣ Verify JWT
      const verified = this.webTokenService.verify(
        tokenRecord.token,
        DotenvConfig.VERIFY_EMAIL_TOKEN_SECRET
      ) as JwtPayload;

      if (!verified || typeof verified !== "object" || !("id" in verified)) {
        throw HttpException.conflict("Invalid token");
      }

      const userId = verified.id;

      // 3️⃣ Find user
      const user = await db.user.findUnique({ where: { id: userId } });
      if (!user) throw HttpException.conflict("User not found");

      // if (!user.resetPassword) {
      //   throw HttpException.conflict("Password already reset");
      // }

      // 4️⃣ Hash new password
      const hashedPassword = await this.bcryptService.hash(password);

      // 5️⃣ Update user
      await db.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
          resetPassword: false,
          status: "ACTIVE",
          lock: false,
          loginAttempts: 0,
        },
      });

      // 6️⃣ Invalidate token
      await db.token.deleteMany({ where: { shortToken: token } });

      return { success: true, message: "Password reset successful" };
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
