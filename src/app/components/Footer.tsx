"use client";

import Link from "next/link";
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/terms" className="text-gray-500 hover:text-gray-600">
            {t("footer.terms")}
          </Link>
          <Link href="/privacy" className="text-gray-500 hover:text-gray-600">
            {t("footer.privacy")}
          </Link>
          <Link href="/faq" className="text-gray-500 hover:text-gray-600">
            {t("footer.faq")}
          </Link>
          <Link href="/contact" className="text-gray-500 hover:text-gray-600">
            {t("footer.contact")}
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
} 