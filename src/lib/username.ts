const USERNAME_MAX_LENGTH = 20;
const RANDOM_SUFFIX_LENGTH = 3;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function randomLetters(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

export function normalizeName(name?: string | null): string {
  const fallback = "user";
  if (!name || !name.trim()) return fallback;

  const cleaned = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/_/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return cleaned || fallback;
}

function buildCandidate(base: string): string {
  const maxBaseLength = USERNAME_MAX_LENGTH - (RANDOM_SUFFIX_LENGTH + 1);
  const trimmedBase = base.slice(0, Math.max(1, maxBaseLength));
  return `${trimmedBase}-${randomLetters(RANDOM_SUFFIX_LENGTH)}`;
}

export async function generateUniqueUsername(
    displayName: string | null | undefined,
    isTaken: (username: string) => Promise<boolean>,
  ): Promise<string> {
    const base = normalizeName(displayName);
    for (let i = 0; i < 50; i += 1) {
      const candidate = buildCandidate(base);
      const taken = await isTaken(candidate);
      if (!taken) return candidate;
    }
    throw new Error("Could not generate a unique username. Please retry.");
  }