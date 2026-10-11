import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <NextIntlClientProvider>
      <a className="skip-link" href="#main-content">
        İçeriğe geç
      </a>
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
