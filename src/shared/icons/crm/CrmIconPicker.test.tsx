import assert from 'node:assert/strict';

import {
  renderToStaticMarkup,
} from 'react-dom/server';

import {
  defineSuite,
  test,
} from '../../../test/testHarness';

import CrmIconPicker from './CrmIconPicker';

export const suite = defineSuite(
  'CrmIconPicker',
  [
    test(
      'muestra la etiqueta visual del icono seleccionado',
      () => {
        const html = renderToStaticMarkup(
          <CrmIconPicker
            label="Icono"
            value="database-upload"
            onChange={() => undefined}
          />
        );

        assert.match(
          html,
          /Carga de base/
        );
        assert.match(
          html,
          /aria-haspopup="listbox"/
        );
        assert.match(
          html,
          /<svg/
        );
      }
    ),
    test(
      'representa aliases antiguos con su icono compatible',
      () => {
        const html = renderToStaticMarkup(
          <CrmIconPicker
            label="Icono"
            value="/candado.ico"
            onChange={() => undefined}
          />
        );

        assert.match(html, /Escudo/);
        assert.match(
          html,
          /Icono anterior compatible/
        );
      }
    ),
    test(
      'informa cuántos iconos hay cuando no existe selección',
      () => {
        const html = renderToStaticMarkup(
          <CrmIconPicker
            label="Icono"
            value=""
            onChange={() => undefined}
          />
        );

        assert.match(
          html,
          /iconos disponibles/
        );
        assert.match(
          html,
          /Seleccionar icono/
        );
      }
    ),
  ]
);
