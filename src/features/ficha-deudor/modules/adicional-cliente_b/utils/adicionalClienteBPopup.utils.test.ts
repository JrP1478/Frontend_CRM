import assert from 'node:assert/strict';

import {
  defineSuite,
  test,
} from '../../../../../test/testHarness';
import type { AdicionalClienteBGestion } from '../types/adicionalClienteB.types';
import {
  formatAdicionalClienteBDate,
  getAdicionalClienteBGestiones,
  getAdicionalClienteBOperationPrefix,
  isAdicionalClienteBGestionEmpty,
} from './adicionalClienteBPopup.utils';

const gestion: AdicionalClienteBGestion = {
  ventanaMeses: 12,
  canal: 1,
  canalNombre: 'CALL',
  idDocxCobrarOpe: 1814811285,
  idDocxCobrar: 236569565,
  fecha: '2026-09-03T12:42:24.257',
  estatus: 'TELF OCUPADO',
  peso: 80,
  telefono: '948225402',
  comentario: 'OCUPADO',
  intentos: 503,
  intentosRobot: 180,
  contactosDirectos: 0,
  origenDireccion: null,
  direccion: null,
};

export const suite = defineSuite('adicionalClienteBPopup.utils', [
  test('formatea la fecha calendario sin desplazarla por zona horaria', () => {
    assert.equal(
      formatAdicionalClienteBDate('2026-09-17T00:30:00.000Z'),
      '17/09/2026'
    );
    assert.equal(formatAdicionalClienteBDate(null), 'Sin información');
    assert.equal(formatAdicionalClienteBDate('valor-no-iso'), 'valor-no-iso');
    assert.equal(
      formatAdicionalClienteBDate('2026-02-31T10:00:00'),
      '2026-02-31T10:00:00'
    );
  }),
  test('encuentra gestiones por código de canal o por nombre normalizado', () => {
    const byCode = getAdicionalClienteBGestiones(
      [gestion],
      'CALL',
      12
    );

    const byName = getAdicionalClienteBGestiones(
      [
        {
          ...gestion,
          canal: 99,
          canalNombre: ' campo ',
          ventanaMeses: 6,
        },
      ],
      'CAMPO',
      6
    );

    assert.equal(byCode.length, 1);
    assert.equal(byName.length, 1);
  }),
  test('reconoce una gestión vacía sin depender del texto del estatus', () => {
    assert.equal(
      isAdicionalClienteBGestionEmpty({
        ...gestion,
        idDocxCobrarOpe: 0,
        idDocxCobrar: 0,
        fecha: null,
        estatus: 'Sin gestión en el periodo',
      }),
      true
    );

    assert.equal(isAdicionalClienteBGestionEmpty(gestion), false);
  }),
  test('forma el prefijo de operación con placa cuando está disponible', () => {
    assert.equal(
      getAdicionalClienteBOperationPrefix({
        operacion: '84011',
        placa: 'M5M372',
        diasAtraso: 62,
        idUbigeo: 1346,
        estadoOperacion: 'Normal',
        avanceCredito: 'Tramo Final',
        direccionLegal: 'Dirección',
        distritoLegal: 'MONSEFU',
        provinciaLegal: 'CHICLAYO',
        departamentoLegal: 'Lambayeque',
      }),
      'Op. 84011 | M5M372'
    );
  }),
]);
