export enum RoleType {
  ADMINISTRATOR = "ADMINISTRATOR",
  AGENT = "AGENT",
  CLIENT = "CLIENT",
  PROPERTY_OWNER = "PROPERTY_OWNER",
  INSIGHT_USER = "INSIGHT_USER",
}

export const ROLE_OPTIONS = [
  {
    value: RoleType.CLIENT,
    label: "Client",
  },
  {
    value: RoleType.ADMINISTRATOR,
    label: "Administrator",
  },
  {
    value: RoleType.AGENT,
    label: "Agent",
  },
  {
    value: RoleType.PROPERTY_OWNER,
    label: "Property Owner",
  },
  {
    value: RoleType.INSIGHT_USER,
    label: "Insight User",
  },
] as const;

export const getRoleLabel = (value: RoleType): string => {
  return ROLE_OPTIONS.find((option) => option.value === value)?.label || value;
};
