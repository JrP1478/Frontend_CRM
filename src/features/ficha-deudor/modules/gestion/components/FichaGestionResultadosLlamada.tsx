import React from 'react';

import type { FichaGestionResultadosLlamadaProps } from '../types/fichaGestionViewModel.types';
import FichaGestionCamposClienteA from './shared/FichaGestionCamposClienteA';
import FichaGestionResultadoFields from './shared/FichaGestionResultadoFields';
import FichaGestionSubmitSection from './shared/FichaGestionSubmitSection';
import FichaGestionValidationSummary from './shared/FichaGestionValidationSummary';

const FichaGestionResultadosLlamada: React.FC<
  FichaGestionResultadosLlamadaProps
> = ({
  form,
  setField,
  validationErrors = {},
  feedback,
  onCloseFeedback,
  mostrarCamposClienteA,
  estadoGestionClienteAOptions,
  isLoadingEstadoGestionClienteA,
  errorEstadoGestionClienteA,
  motivoNoPagoOptions,
  isLoadingMotivoNoPago,
  errorMotivoNoPago,
  handleGuardar,
  isSaving = false,
}) => {
  const layoutClassName = mostrarCamposClienteA
    ? 'resultados-llamada-layout'
    : 'resultados-llamada-layout resultados-llamada-layout--single';

  return (
    <div className="ficha-block ficha-block--with-side-title ficha-block--compact-gestion">
      <div className="block-side-title-wrapper">
        <div className="block-side-title">
          RESULTADOS DE LA LLAMADA
        </div>
      </div>

      <div className="block-content block-content--compact-gestion">
        <div className={layoutClassName}>
          <FichaGestionResultadoFields
            form={form}
            setField={setField}
          />

          {mostrarCamposClienteA && (
            <FichaGestionCamposClienteA
              form={form}
              setField={setField}
              estadoGestionClienteAOptions={
                estadoGestionClienteAOptions
              }
              isLoadingEstadoGestionClienteA={
                isLoadingEstadoGestionClienteA
              }
              errorEstadoGestionClienteA={
                errorEstadoGestionClienteA
              }
              motivoNoPagoOptions={
                motivoNoPagoOptions
              }
              isLoadingMotivoNoPago={
                isLoadingMotivoNoPago
              }
              errorMotivoNoPago={
                errorMotivoNoPago
              }
            />
          )}
        </div>

        <FichaGestionValidationSummary
          validationErrors={validationErrors}
        />

        <FichaGestionSubmitSection
          feedback={feedback}
          onCloseFeedback={onCloseFeedback}
          handleGuardar={handleGuardar}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
};

export default FichaGestionResultadosLlamada;