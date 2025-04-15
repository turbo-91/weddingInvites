export function extractErrorMessage(
  error: unknown,
  match?: string,
  fallbackMessage = "An unexpected error occurred",
  matchedMessage = "A known error occurred"
): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  ) {
    const err = error as { message: string };
    if (match && err.message.includes(match)) {
      return matchedMessage;
    }
    return err.message;
  }

  return fallbackMessage;
}
