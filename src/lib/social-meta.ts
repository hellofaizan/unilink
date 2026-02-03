import { SOCIAL_PLATFORMS, SocialPlatform } from "@/app/dashboard/socials/components/social-data"
import { platform } from "os"

function getSocialMetadata(type: string): SocialPlatform | undefined {
    return SOCIAL_PLATFORMS.find((platform) => platform.id === type)
}