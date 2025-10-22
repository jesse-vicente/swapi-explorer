import { TRANSLATIONS } from "./translations";

export const isEmpty = (v?: string | null) =>
  !v || v.trim() === "" || v === "none";

export const isUnknown = (v?: string | null) => v === "unknown" || v === "n/a";

export const translate = (value?: string): string =>
  value
    ? value
        .toLowerCase()
        .split(/[,/]/)
        .map((v) => v.trim())
        .map((v) => TRANSLATIONS[v as keyof typeof TRANSLATIONS] || v)
        .join(", ")
    : "—";
