// utils/prismaErrorHandler.ts
const prismaErrorMessages: Record<string, string> = {
  P2002:
    "A unique constraint violation occurred. The value already exists in the database.",
  P2001: "The record was not found.",
  P2011: "Null constraint violation. A required field is missing.",
};

function getErrorMessage(code: string): string {
  return prismaErrorMessages[code] || "An unexpected database error occurred.";
}

export function prismaErrorHandler(error: any) {
  if (typeof error?.code === "string") {
    return {
      code: error.code,
      message: getErrorMessage(error.code),
    };
  }

  return {
    code: "unknown",
    message: error?.message || "An unknown error occurred.",
  };
}
