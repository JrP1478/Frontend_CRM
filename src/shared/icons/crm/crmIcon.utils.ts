import {
  CRM_ICON_BY_NAME,
  CRM_ICON_CATALOG,
} from './crmIcon.catalog';
import type {
  CrmIconDefinition,
  CrmIconName,
} from './crmIcon.types';

export const DEFAULT_CRM_ICON: CrmIconName = 'module-default';

export const LEGACY_CRM_ICON_ALIASES: Readonly<Record<string, CrmIconName>> = {
  '/candado.ico': 'shield',
  'candado.ico': 'shield',
  '/datos.ico': 'database',
  'datos.ico': 'database',
  ICONO: 'module-default',
};

const normalizeSearchText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLocaleLowerCase('es-PE');

export const isCrmIconName = (
  value: unknown
): value is CrmIconName =>
  typeof value === 'string' &&
  CRM_ICON_BY_NAME.has(value as CrmIconName);

export const isSupportedCrmIconValue = (
  value: string | null | undefined
): boolean => {
  const normalizedValue = value?.trim() ?? '';

  return (
    !normalizedValue ||
    isCrmIconName(normalizedValue) ||
    Object.hasOwn(
      LEGACY_CRM_ICON_ALIASES,
      normalizedValue
    )
  );
};

export const normalizeCrmIconName = (
  value: string | null | undefined
): CrmIconName => {
  const normalizedValue = value?.trim() ?? '';

  if (isCrmIconName(normalizedValue)) {
    return normalizedValue;
  }

  return (
    LEGACY_CRM_ICON_ALIASES[normalizedValue] ??
    DEFAULT_CRM_ICON
  );
};

export const getCrmIconDefinition = (
  value: string | null | undefined
): CrmIconDefinition => {
  const name = normalizeCrmIconName(value);
  const definition = CRM_ICON_BY_NAME.get(name);

  if (!definition) {
    throw new Error(`No existe la definición del icono CRM: ${name}`);
  }

  return definition;
};

export const searchCrmIcons = (
  query: string
): readonly CrmIconDefinition[] => {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return CRM_ICON_CATALOG;
  }

  const searchTerms = normalizedQuery
    .split(/\s+/)
    .filter(Boolean);

  return CRM_ICON_CATALOG.filter((icon) => {
    const searchableText = normalizeSearchText(
      [icon.name, icon.label, ...icon.keywords].join(' ')
    );

    return searchTerms.every((term) =>
      searchableText.includes(term)
    );
  });
};
