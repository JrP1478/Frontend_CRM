import assert from 'node:assert/strict';
import { defineSuite, test } from '../../../test/testHarness';
import {
  CRM_ICON_CATALOG,
  CRM_ICON_NAMES,
  getCrmIconDefinition,
  normalizeCrmIconName,
  isSupportedCrmIconValue,
  searchCrmIcons,
} from './index';

export const suite = defineSuite('crmIcon.utils', [
  test('conserva todas las claves existentes de menu-modulos', () => {
    const existingNames = [
      'database',
      'dollar-sign',
      'users',
      'bar-chart',
      'file-text',
      'smartphone',
      'monitor',
      'briefcase',
      'target',
      'mail',
      'phone',
      'user',
      'key',
      'shield',
    ];

    for (const name of existingNames) {
      assert.equal(CRM_ICON_NAMES.includes(name as never), true);
      assert.equal(getCrmIconDefinition(name).legacy, true);
    }
  }),
  test('normaliza aliases antiguos sin perder compatibilidad', () => {
    assert.equal(normalizeCrmIconName('/candado.ico'), 'shield');
    assert.equal(normalizeCrmIconName('/datos.ico'), 'database');
    assert.equal(normalizeCrmIconName('ICONO'), 'module-default');
    assert.equal(normalizeCrmIconName('no-existe'), 'module-default');
  }),
  test('acepta claves del catálogo y aliases de migración', () => {
    assert.equal(isSupportedCrmIconValue('database-upload'), true);
    assert.equal(isSupportedCrmIconValue('/candado.ico'), true);
    assert.equal(isSupportedCrmIconValue(''), true);
    assert.equal(isSupportedCrmIconValue('icono-inventado'), false);
  }),
  test('no contiene claves duplicadas', () => {
    assert.equal(
      new Set(CRM_ICON_CATALOG.map((icon) => icon.name)).size,
      CRM_ICON_CATALOG.length
    );
  }),
  test('incluye un icono específico para accesos por usuario', () => {
    const userAccessIcon = getCrmIconDefinition(
      'user-group-access'
    );

    assert.equal(
      userAccessIcon.label,
      'Mantener accesos por usuario'
    );
    assert.equal(
      userAccessIcon.category,
      'seguridad'
    );
    assert.equal(
      searchCrmIcons('accesos usuario').some(
        (icon) =>
          icon.name ===
          'user-group-access'
      ),
      true
    );
  }),
  test('incluye un icono específico para grupos', () => {
    const groupsIcon = getCrmIconDefinition('groups');

    assert.equal(groupsIcon.name, 'groups');
    assert.equal(groupsIcon.label, 'Grupos');
    assert.equal(groupsIcon.category, 'seguridad');
    assert.equal(
      searchCrmIcons('grupo').some((icon) => icon.name === 'groups'),
      true
    );
  }),
  test('encuentra iconos por etiqueta y palabras clave', () => {
    assert.equal(
      searchCrmIcons('reniec').some((icon) => icon.name === 'identity-search'),
      true
    );
    assert.equal(
      searchCrmIcons('cobranza').some(
        (icon) => icon.name === 'collection-management'
      ),
      true
    );
  }),
]);
