import { useTranslation } from 'react-i18next';

/**
 * Maps i18next language codes to our data locale keys.
 * i18next uses: de, it, sr-cyrillic, sr-latin
 * Our data uses: de, it, sr, sr-latin
 */
function resolveLocaleKey(i18nLang) {
  if (i18nLang === 'sr-cyrillic' || i18nLang === 'sr') return 'sr';
  if (i18nLang === 'sr-latin') return 'sr-latin';
  if (i18nLang === 'it') return 'it';
  return 'de'; // default
}

/**
 * Resolves a localized field from a data object.
 * If the field is a plain string (legacy), returns it as-is.
 * If it's an object keyed by locale, returns the best match.
 */
export function getLocalizedField(field, lang) {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  if (typeof field !== 'object') return String(field);
  const key = resolveLocaleKey(lang);
  const result = field[key] || field['sr'] || field['de'] || Object.values(field)[0] || '';
  return typeof result === 'string' ? result : String(result);
}

/**
 * React hook that returns a resolver function bound to the current language.
 */
export function useLocalized() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return (field) => getLocalizedField(field, lang);
}
