import { cookies } from "next/headers";
import { dictionaries, Locale, Dictionary } from "@/i18n/dictionaries";

export function getLocale(): Locale {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value as Locale;
  return locale === "id" || locale === "en" ? locale : "en";
}

export function getDictionary(): Dictionary {
  const locale = getLocale();
  return dictionaries[locale];
}
