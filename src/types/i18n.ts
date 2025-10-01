export type Locale = 'ko' | 'en';

export interface LocaleConfig {
  code: Locale;
  name: string;
  flag: string;
}

export interface NavigationItem {
  id: string;
  label: {
    ko: string;
    en: string;
  };
  href: string;
  section?: string;
}