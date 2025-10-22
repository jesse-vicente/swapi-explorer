import { isUnknown } from "./helpers";
import { TRANSLATIONS } from "./translations";

export const formatNumber = (value: string) => {
  if (isUnknown(value)) return TRANSLATIONS.unknown;
  const num = Number(value);
  return isNaN(num) ? value : num.toLocaleString("pt-BR");
};
