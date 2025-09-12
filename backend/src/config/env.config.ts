import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export class DotenvConfig {
  static NODE_ENV = process.env.NODE_ENV;
  static PORT = process.env.PORT;
  static SECRET_KEY = process.env.SECRET_KEY;
  static JWT_TOKEN_EXPIRES_IN = process.env.JWT_TOKEN_EXPIRES_IN;
  //   static REDIS_URL = process.env.REDIS_URL || "";
  //   static REDIS_TTL = process.env.REDIS_TTL || 3600;
  // *Database Configurations
  static DATABASE_HOST = process.env.DATABASE_HOST;

  static VERIFY_EMAIL_TOKEN_SECRET = process.env.VERIFY_EMAIL_TOKEN_SECRET!;
  static VERIFY_EMAIL_TOKEN_EXPIRES_IN =
    process.env.VERIFY_EMAIL_TOKEN_EXPIRES_IN;

  // static SMTP_HOST = process.env.SMTP_HOST!;
  // static SMTP_PORT = process.env.SMTP_PORT!;
  // static SMTP_MAIL = process.env.SMTP_MAIL!;
  // static SMTP_APP_PASS = process.env.SMTP_APP_PASS!;

  static SMTP_HOST = process.env.SMTP_HOST!;
  static SMTP_PORT = process.env.SMTP_PORT!;
  static SMTP_MAIL = process.env.SMTP_MAIL!;
  static SMTP_APP_PASS = process.env.SMTP_APP_PASS!;

  static SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY || "";

  //   //BACKEND URL
  //   static BACKEND_URL = process.env.BACKEND_URL!;
  //   // FRONTEND URL
  static FRONTEND_URL = process.env.FRONTEND_URL || "";
}
