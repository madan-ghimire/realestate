import sgMail from "@sendgrid/mail";
import { DotenvConfig } from "../../config/env.config";
import HttpException from "../../utils/HttpException.utils";

export interface IMailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: {
    content: string;
    filename: string;
    type?: string;
    disposition?: string;
  }[];
}

interface FormInterface {
  name: string;
  address: string;
}

export class SendGridEmailService {
  private readonly from: FormInterface;

  constructor() {
    // sgMail.setApiKey(DotenvConfig.SEND_GRID_API_KEY);
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY || "");

    this.from = {
      name: "Realestate",
      address: DotenvConfig.SMTP_MAIL,
    };
  }

  async sendMail({ to, html, subject, text, attachments }: IMailOptions) {
    try {
      const msg = {
        from: { email: this.from.address, name: this.from.name },
        to,
        subject,
        text,
        html,
        reply_to: DotenvConfig.SMTP_MAIL,
        tracking_settings: {
          click_tracking: { enable: false, enable_text: false },
          open_tracking: { enable: false },
          link_tracking: {
            enable: false,
          },
        },
        attachments,
      };

      const res = await sgMail.send(msg);
      return res;
    } catch (error: any) {
      console.log(error?.response?.body?.errors);

      throw HttpException.internalServerError("Error from email service");
    }
  }
}
