import assert from 'node:assert/strict';

import {
  defineSuite,
  test,
} from '../../../../../test/testHarness';

import {
  findAuthorizedReportClient,
  parseReportClientSelection,
} from './reporteriaClientScope.utils';

const clients = [
  {
    clientId: 73,
    name: 'CLIENTE_O',
  },
  {
    clientId: 73,
    name: 'CLIENTE_O ADELANTADA',
  },
  {
    clientId: 52,
    name: 'CLIENTE_L',
  },
];

export const suite = defineSuite(
  'reporteriaClientScope.utils',
  [
    test(
      'lee clientId y reportClient desde la URL',
      () => {
        const selection =
          parseReportClientSelection(
            new URLSearchParams(
              'clientId=73&reportClient=CLIENTE_O+ADELANTADA'
            )
          );

        assert.deepEqual(selection, {
          clientId: 73,
          name: 'CLIENTE_O ADELANTADA',
        });
      }
    ),
    test(
      'rechaza una selección incompleta o con clientId inválido',
      () => {
        assert.equal(
          parseReportClientSelection(
            new URLSearchParams(
              'clientId=0&reportClient=CLIENTE_L'
            )
          ),
          null
        );
        assert.equal(
          parseReportClientSelection(
            new URLSearchParams(
              'clientId=52'
            )
          ),
          null
        );
      }
    ),
    test(
      'autoriza por clientId y valor canónico del reporte, distinguiendo clientes repetidos',
      () => {
        assert.deepEqual(
          findAuthorizedReportClient(
            clients,
            {
              clientId: 73,
              name: 'oriflame adelantada',
            }
          ),
          {
            clientId: 73,
            name: 'CLIENTE_O ADELANTADA',
          }
        );

        assert.equal(
          findAuthorizedReportClient(
            clients,
            {
              clientId: 73,
              name: 'CLIENTE_L',
            }
          ),
          null
        );
      }
    ),
  ]
);
