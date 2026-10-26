const blocked = [
  "fuck",
  "shit",
  "bitch",
  "cunt",
  "asshole",
  "bastard",
  "dick",
  "pussy",
  "whore",
  "slut",
  "porn",
  "nigger",
  "nigga",
  "faggot",
  "retard",
  "heilhitler",
  "killall",
  "dildo",
  "blowjob",
  "handjob",
  "cumshot",
  "masturbat",
  "sexy",
  "penis",
  "vagina",
  "nazi",
];
const substitutions: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "8": "b",
  "9": "g",
};
/** Shared client/server checks. Server validation remains authoritative. */
export function usernameError(value: unknown): string | null {
  if (typeof value !== "string" || !/^[a-zA-Z0-9_]{3,20}$/.test(value))
    return "Use 3–20 letters, numbers, or underscores.";
  const normalized = value
    .toLowerCase()
    .replace(/_/g, "")
    .replace(/[01345789]/g, (c) => substitutions[c]);
  if (
    blocked.some((word) =>
      new RegExp([...word].map((c) => c + "+").join("")).test(normalized),
    )
  )
    return "Choose a different username without inappropriate language.";
  return null;
}
