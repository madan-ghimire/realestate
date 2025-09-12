import { promises as fs } from "fs";
import path from "path";
import { DotenvConfig } from "../config/env.config";
import { Environment } from "../constant/enum";
import { convert } from "html-to-text";

export async function loadTemplate(
  filePath: string,
  replacements: Record<string, string>
): Promise<string> {
  let templatePath;
  if (DotenvConfig.NODE_ENV === Environment.DEVELOPMENT) {
    templatePath = path.join(process.cwd(), "/src/mailTemplate", filePath);
  } else {
    templatePath = path.join(process.cwd(), "/src/mailTemplate", filePath);
  }

  let template = await fs.readFile(templatePath, "utf8");

  for (const [key, value] of Object.entries(replacements)) {
    const text = convert(value);
    template = template.replace(new RegExp(`{{${key}}}`, "g"), text);
  }

  return template;
}
