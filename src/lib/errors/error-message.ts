import { UpdateProfileError } from "./profile-error";

export function getProfileErrorMessage(error: UpdateProfileError) {
  switch (error) {
    case "UNAUTHORIZED":
      return "You must be logged in to update your profile.";
    case "INVALID_INPUT":
      return "Invalid form data, Please check inputs.";
    case "INVALID_USERNAME":
      return "Username can only contain letters, numbers, and underscores.";
    case "USERNAME_TAKEN":
      return "Username is already taken.";
    case "USERNAME_COOLDOWN":
      return "You can change your username once every 24 hours.";
    case "USERNAME_BANNED":
      return "This username has been banned.";

    default:
      return "Something went wrong. Please try again.";
  }
}
