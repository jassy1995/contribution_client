import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const kabebCaseToWords = (source) => {
  return source
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
};

export const setCrossSubdomainCookie = (name, value, days) => {
  const expires = days ? `; expires=${ new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000).toUTCString() }` : '';
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  const sameSite = '; SameSite=Strict';
  document.cookie = `${ name }=${ value }${ expires }; path=/${ sameSite }${ secure }`;
};

export const getCrossSubdomainCookie = (name) => {
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const foundCookie = cookies.find((cookie) => cookie.startsWith(nameEQ));
  return foundCookie ? foundCookie.substring(nameEQ.length, foundCookie.length) : null;
};

export const clearCookie = (name) => {
  document.cookie = `${ name }=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  if (window.location.hostname.includes('statisense.co')) {
    document.cookie = `${ name }=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.statisense.co`;
  }
};

export const generateUEID = () => {
  let first = (Math.random() * 46656) | 0;
  let second = (Math.random() * 46656) | 0;
  first = ('000' + first.toString(36)).slice(-3);
  second = ('000' + second.toString(36)).slice(-3);
  return first + second;
};

export const objectToFormData = (obj, formData = new FormData(), namespace = '') => {
  Object.keys(obj).forEach((key) => {
    const formKey = namespace ? `${ namespace }[${ key }]` : key;
    const value = obj[key];

    if (value instanceof File) {
      formData.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        objectToFormData({ [`${ formKey }[]`]: item }, formData);
      });
    } else if (typeof value === 'object' && value !== null) {
      formData.append(formKey, JSON.stringify(value));
    } else {
      formData.append(formKey, value);
    }
  });
  return formData;
};

export const formatMarketType = (str) => {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
export const firstUpperCase = (s) => {
  const v = (s ?? '').toString();
  return v ? v.charAt(0).toUpperCase() + v.slice(1) : '';
};

