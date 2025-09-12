import { RoleType } from "@prisma/client";
import { db } from "../../prisma/db";
import { RegisterDto } from "../dtos/registerDto";
import HttpException from "../utils/HttpException.utils";
import BcryptService from "./bcrypt.service";
import { getUserRole } from "../utils/helperFunctions.utils";
import WebTokenService from "./webtoken.service";
import { SendGridEmailService } from "./utils/sendGridEmail.service";
import crypto from "crypto";
import { JwtPayload } from "jsonwebtoken";
import { DotenvConfig } from "../config/env.config";
import { loadTemplate } from "../utils/loadTemplate.utils";
interface PaginationParams {
  page: number;
  pageSize: number;
  search?: string;
}

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

const bcryptService = new BcryptService();
const webTokenService = new WebTokenService();
const emailService = new SendGridEmailService();

export const getAllUsers = async ({
  page,
  pageSize,
  search,
}: PaginationParams) => {
  const skip = (page - 1) * pageSize;

  // Prepare role filters: include roles that contain the search string
  const roleFilters = search
    ? Object.values(RoleType)
        .filter((role) => role.toLowerCase().includes(search.toLowerCase()))
        .map((role) => ({ role })) // Prisma OR format
    : [];

  const where = search
    ? {
        OR: [
          { email: { contains: search, mode: "insensitive" as const } },
          { username: { contains: search, mode: "insensitive" as const } },
          ...roleFilters,
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" }, // sort by createdAt
    }),
    db.user.count({ where }),
  ]);

  return {
    users,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
};

export const createUser = async (data: RegisterDto) => {
  try {
    const hashedPassword = await bcryptService.hash(data.password);

    const checkEmail = await db.user.findFirst({
      where: { email: data.email },
    });

    if (checkEmail) {
      throw HttpException.badRequest("Email already in use.");
    }

    const user = await db.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role as RoleType,
        displayName:
          data.firstName && data.lastName
            ? `${data.firstName} ${data.lastName}`
            : null,
        tenantId: data.tenantId, // Include tenantId if it's part of your Prisma schema
        resetPassword: true, // Explicitly set fields that are part of your Prisma model
        status: "INVITED", // Explicitly set fields that are part of your Prisma model
      },
    });

    const { password, username, email, ...rest } = user;

    const token = webTokenService.emailVerifyToken(user.id as string);

    const shortenedToken = await shortenToken(token);
    const resetLink = `${DotenvConfig.FRONTEND_URL}/auth/reset-password/${shortenedToken}`;

    const replacement = {
      RECIPIENT_FNAME: username,
      EMAIL: email,
      INVITE_LINK: resetLink,
    };

    const mailOptions: IMailOptions = {
      to: data.email,
      subject: `You've been invited to join madan+puja Realestate`,
      text: "Login Credentials",
      html: await loadTemplate("welcome.html", replacement as any),
    };
    emailService.sendMail(mailOptions);
    return user;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (id: string, user: RegisterDto) => {
  const data: any = { ...user };

  // Hash password only if provided
  if (user.password) {
    data.password = await bcryptService.hash(user.password);
  } else {
    delete data.password; // skip updating password
  }

  // Check email uniqueness (ignore same user)
  if (user.email) {
    const checkEmail = await db.user.findFirst({
      where: { email: user.email, NOT: { id } },
    });

    if (checkEmail) {
      throw HttpException.badRequest("Email already in use.");
    }
  }

  return db.user.update({
    where: { id },
    data,
    select: {
      id: true,
      username: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      tenantId: true,
      role: true,
    },
  });
};

export const deleteUser = async (id: string) => {
  return db.user.delete({
    where: { id },
  });
};
