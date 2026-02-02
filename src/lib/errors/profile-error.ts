export type UpdateProfileError =
  | "UNAUTHORIZED"
  | "INVALID_INPUT"
  | "INVALID_USERNAME"
  | "USERNAME_TAKEN"
  | "USERNAME_COOLDOWN"
  | "UNKNOWN_ERROR"
  | "USERNAME_BANNED";

export type UpdateProfileResult =
  | { success: true }
  | { success: false; error: UpdateProfileError };
