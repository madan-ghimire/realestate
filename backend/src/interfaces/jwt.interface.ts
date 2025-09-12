import { ROLE } from "../constant/enum";

export interface IJwtPayload {
  id: string;
  role: ROLE;
}
