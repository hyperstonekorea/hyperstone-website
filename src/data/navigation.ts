import { NavigationItem } from '@/types';

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: {
      ko: '홈',
      en: 'Home'
    },
    href: '#hero',
    section: 'hero'
  },
  {
    id: 'about',
    label: {
      ko: '회사소개',
      en: 'About'
    },
    href: '#about',
    section: 'about'
  },
  {
    id: 'products',
    label: {
      ko: '제품',
      en: 'Products'
    },
    href: '#products',
    section: 'products'
  },
  {
    id: 'contact',
    label: {
      ko: '연락처',
      en: 'Contact'
    },
    href: '#contact',
    section: 'contact'
  }
];