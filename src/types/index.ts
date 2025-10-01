// Common types for HYPERSTONE website

export type Locale = 'ko' | 'en';

export interface LocalizedText {
  ko: string;
  en: string;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  fullDescription: LocalizedText;
  specifications: {
    ko: ProductSpec[];
    en: ProductSpec[];
  };
  applications: {
    ko: string[];
    en: string[];
  };
  images: {
    thumbnail: string;
    gallery: string[];
  };
  features: {
    ko: string[];
    en: string[];
  };
}

export interface ProductSpec {
  label: string;
  value: string;
  unit?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface CompanyInfo {
  name: LocalizedText;
  description: LocalizedText;
  contact: {
    phone: string;
    email: string;
    address: LocalizedText;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  businessInfo: {
    registrationNumber: string;
    ceo: LocalizedText;
  };
}

export interface NavigationItem {
  id: string;
  label: LocalizedText;
  href: string;
  section?: string;
}

export interface SectionConfig {
  sectionId: string;
  backgroundType: 'video' | 'image' | 'color';
  backgroundValue: string;
  opacity: number;
  tone: 'light' | 'dark' | 'auto';
}

export interface AdminSettings {
  emailRecipient: string;
  sectionConfigs: SectionConfig[];
}