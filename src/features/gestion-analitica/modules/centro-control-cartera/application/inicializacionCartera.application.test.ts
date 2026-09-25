import assert from 'node:assert/strict';

import {
  defineSuite,
  test,
} from '../../../../../test/testHarness';
import type {
  CentroControlCarteraFilters,
} from '../domain/filtrosCartera.types';
import {
  createInicializacionCarteraSession,
  getCentroControlCarteraResourceKey,
  requestInicializacionCartera,
  resolveCentroControlCarteraLoadMode,
} from './inicializacionCartera.application';

const FILTERS: CentroControlCarteraFilters = {
  businessUnit: 'CLIENTE_A ADMINISTRATIVO',
  dateFrom: '2026-08-01',
  dateTo: '2026-08-13',
  subPortfolioId: '10',
  campaignId: '2026-08',
  supervisorId: '1',
};

export const suite = defineSuite(
  'inicializacionCartera.application',
  [
    test('usa Bootstrap en la carga inicial y tras un refresh explícito', () => {
      const session = createInicializacionCarteraSession();

      assert.equal(
        resolveCentroControlCarteraLoadMode(session, FILTERS),
        'bootstrap'
      );

      session.filterOptionsLoaded = true;
      session.selectedBusinessUnit = 'CLIENTE_A ADMINISTRATIVO';
      requestInicializacionCartera(session);

      assert.equal(
        resolveCentroControlCarteraLoadMode(session, FILTERS),
        'bootstrap'
      );
    }),
    test('mantiene Overview al cambiar filtros dentro de la misma cartera', () => {
      const session = createInicializacionCarteraSession();
      session.filterOptionsLoaded = true;
      session.selectedBusinessUnit = 'CLIENTE_A GOBIERNO';

      assert.equal(
        resolveCentroControlCarteraLoadMode(session, {
          ...FILTERS,
          businessUnit: ' cliente_a gobierno ',
        }),
        'overview'
      );
    }),
    test('fuerza Bootstrap cuando cambia la cartera solicitada', () => {
      const session = createInicializacionCarteraSession();
      session.filterOptionsLoaded = true;
      session.selectedBusinessUnit = 'CLIENTE_A ADMINISTRATIVO';

      assert.equal(
        resolveCentroControlCarteraLoadMode(session, {
          ...FILTERS,
          businessUnit: 'CLIENTE_A GOBIERNO',
        }),
        'bootstrap'
      );
    }),
    test('reintenta Bootstrap sin campaña actual y usa Overview al elegir un histórico', () => {
      const session = createInicializacionCarteraSession();
      session.filterOptionsLoaded = true;
      session.selectedBusinessUnit = 'CLIENTE_A GOBIERNO';
      session.currentCampaignUnavailable = true;

      assert.equal(
        resolveCentroControlCarteraLoadMode(session, {
          ...FILTERS,
          businessUnit: 'CLIENTE_A GOBIERNO',
          campaignId: null,
        }),
        'bootstrap'
      );
      assert.equal(
        resolveCentroControlCarteraLoadMode(session, {
          ...FILTERS,
          businessUnit: 'CLIENTE_A GOBIERNO',
          campaignId: '2026-08',
        }),
        'overview'
      );
    }),
    test('la clave del recurso separa carteras con el resto de filtros idénticos', () => {
      const adminKey = getCentroControlCarteraResourceKey(95, FILTERS);
      const governmentKey = getCentroControlCarteraResourceKey(95, {
        ...FILTERS,
        businessUnit: 'CLIENTE_A GOBIERNO',
      });

      assert.notDeepEqual(adminKey, governmentKey);
      assert.equal(adminKey[1], 'CLIENTE_A ADMINISTRATIVO');
      assert.equal(governmentKey[1], 'CLIENTE_A GOBIERNO');
    }),
  ]
);
