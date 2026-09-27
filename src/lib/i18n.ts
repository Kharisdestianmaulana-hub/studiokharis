import { cookies } from "next/headers";
import { dictionaries, Locale, Dictionary } from "@/i18n/dictionaries";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value as Locale;
  return locale === "id" || locale === "en" ? locale : "en";
}

export async function getDictionary(): Promise<Dictionary> {
  const locale = await getLocale();
  return dictionaries[locale];
}
