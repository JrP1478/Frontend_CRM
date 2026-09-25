import React from 'react';

import { SearchableSelectField } from '@shared/components/ui';

import type { FichaGestionResultadosLlamadaProps } from '../../types/fichaGestionViewModel.types';

type Props = Pick<
  FichaGestionResultadosLlamadaProps,
  | 'form'
  | 'setField'
  | 'estadoGestionClienteAOptions'
  | 'isLoadingEstadoGestionClienteA'
  | 'errorEstadoGestionClienteA'
  | 'motivoNoPagoOptions'
  | 'isLoadingMotivoNoPago'
  | 'errorMotivoNoPago'
>;

const FichaGestionCamposClienteA: React.FC<Props> = ({
  form,
  setField,
  estadoGestionClienteAOptions,
  isLoadingEstadoGestionClienteA,
  errorEstadoGestionClienteA,
  motivoNoPagoOptions,
  isLoadingMotivoNoPago,
  errorMotivoNoPago,
}) => {
  const estadoGestionClienteAPlaceholder =
    isLoadingEstadoGestionClienteA
      ? 'Cargando Estado Gestión ClienteA...'
      : 'Seleccionar Estado Gestión ClienteA...';

  const motivoNoPagoPlaceholder =
    isLoadingMotivoNoPago
      ? 'Cargando Motivo No Pago...'
      : 'Seleccionar Motivo No Pago...';

  const handleEstadoGestionClienteAChange = (
    value: string
  ) => {
    setField(
      'estadoGestionClienteA',
      value
    );
  };

  const handleMotivoNoPagoChange = (
    value: string
  ) => {
    setField(
      'motivoNoPago',
      value
    );
  };

  return (
    <div className="resultados-llamada__campos-cliente_a">
      <SearchableSelectField
        label="Estado Gestión ClienteA:"
        options={estadoGestionClienteAOptions}
        value={form.estadoGestionClienteA}
        onChange={handleEstadoGestionClienteAChange}
        placeholder={estadoGestionClienteAPlaceholder}
        searchPlaceholder="Buscar estado de gestión ClienteA..."
        emptyMessage="No se encontraron estados de gestión ClienteA."
        disabled={isLoadingEstadoGestionClienteA}
        error={errorEstadoGestionClienteA || ''}
      />

      <SearchableSelectField
        label="Motivo No Pago:"
        options={motivoNoPagoOptions}
        value={form.motivoNoPago}
        onChange={handleMotivoNoPagoChange}
        placeholder={motivoNoPagoPlaceholder}
        searchPlaceholder="Buscar motivo de no pago..."
        emptyMessage="No se encontraron motivos de no pago."
        disabled={isLoadingMotivoNoPago}
        error={errorMotivoNoPago || ''}
      />
    </div>
  );
};

export default FichaGestionCamposClienteA;