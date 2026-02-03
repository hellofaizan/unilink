import { mapLinksToCards } from "@/app/dashboard/socials/types/mapper";
import { SocialLinkProps } from "@/app/dashboard/socials/types/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  user: any;
};

function mapSocialsToLinks(
  socials: {
    id: string;
    type: string;
    handle: string | null;
    url: string | null;
  }[],
): SocialLinkProps[] {
  return socials.map((s) => ({
    id: s.id,
    type: s.type,
    handle: s.handle,
    url: s.url,
  }));
}

export default function UsernamePage({ user }: Props) {
  console.log(user);

  const socialLinks = mapSocialsToLinks(user.socials);
  const cards = mapLinksToCards(socialLinks);

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-2">
        <p className="font-sans text-2xl font-medium">User not found</p>
        <Link href={"/"}>
          <Button variant={"outline"}>Claim this username ✨</Button>
        </Link>
      </div>
    );
  }

  const displayName = user.name || user.username;
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <section className="max-w-xl w-full flex flex-col items-center text-center gap-2 mb-2">
        <div className="h-40 w-40 rounded-full overflow-hidden border bg-muted flex items-center justify-center">
          {user.image ? (
            <img
              src={user.image}
              alt={displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-4xl font-semibold">
              {displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">{displayName}</h1>
          <img src={"/checkmark.svg"} className="w-4 md:w-5 h-4 md:h-5" />
        </div>

        {user.bio && (
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {user.bio}
          </p>
        )}
      </section>

      <section className="max-w-xl w-full flex flex-col gap-4">
        {cards && cards.length !== 0 && (
          <ul className="flex flex-col gap-3">
            {cards.map((card) => (
              <li key={card.id}>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-xl border bg-muted/30 hover:bg-muted transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center overflow-hidden bg-background">
                      {card.icon === "globe" ? (
                        <span className="text-lg">🌐</span>
                      ) : (
                        <img
                          src={card.icon}
                          alt={card.platformName}
                          className="h-full w-full object-contain"
                        />
                      )}
                    </div>

                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">
                        {card.platformName}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-[220px]">
                        {card.displayUrl}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-muted-foreground">View</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
