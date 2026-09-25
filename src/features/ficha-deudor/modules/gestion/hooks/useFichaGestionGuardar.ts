import {
  useCallback,
  useState,
} from 'react';

import type { DocumentoApi } from '../../../shared/types';
import type { FichaDeudorGestionFormParams } from '../../../shared/types/fichaDeudor.types';
import { createGestionOpeGesContratos } from '../api/fichaGestionApi';
import { FICHA_GESTION_MESSAGES } from '../constants/fichaGestionMessages.constants';
import { buildGestionSaveRequest } from '../services/fichaGestionGuardar.service';
import type {
  FichaGestionValidationErrors,
  GestionFormClienteA,
} from '../types/fichaGestionForm.types';
import { useAutoClearValidationErrors } from './useAutoClearValidationErrors';
import { getCurrentPeruDateTime } from '../../../shared/utils/date.utils';
import { getErrorMessage } from '../../../shared/utils/getErrorMessage';
import { useAsyncMutation } from '../../../../../shared/hooks/useAsyncMutation';

interface UseFichaGestionGuardarParams {
  form: GestionFormClienteA;
  params: FichaDeudorGestionFormParams;
  documentosFiltrados: DocumentoApi[];
  np1TipoContacto: number;
  requiereCamposClienteA: boolean;
  onGestionGuardada?: (gestionTerminada: boolean) => void;
  onError?: (message: string) => void;
  onSubmit?: (
    data: GestionFormClienteA,
    fechaFinGestion: string
  ) => void;
}

export const useFichaGestionGuardar = ({
  form,
  params,
  documentosFiltrados,
  np1TipoContacto,
  requiereCamposClienteA,
  onGestionGuardada,
  onError,
  onSubmit,
}: UseFichaGestionGuardarParams) => {
  const [
    validationErrors,
    setValidationErrors,
  ] = useState<FichaGestionValidationErrors>({});

  const {
    isPending: isSaving,
    execute: executeSave,
  } = useAsyncMutation();

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  useAutoClearValidationErrors({
    errors: validationErrors,
    onClear: clearValidationErrors,
  });

  const handleGuardar =
    useCallback(async () => {
      const fechaFinGestion =
        getCurrentPeruDateTime();

      let saveRequest;

      try {
        saveRequest =
          buildGestionSaveRequest({
            form,
            params,
            documentosFiltrados,
            np1TipoContacto,
            requiereCamposClienteA,
            fechaFinGestion,
          });
      } catch (error) {
        clearValidationErrors();

        onError?.(
          getErrorMessage(
            error,
            FICHA_GESTION_MESSAGES.SAVE_ERROR
          )
        );

        return;
      }

      setValidationErrors(
        saveRequest.validationErrors
      );

      if (!saveRequest.isValid) {
        return;
      }

      const result = await executeSave(
        () =>
          createGestionOpeGesContratos({
            payload: saveRequest.payload,
          })
      );

      if (result.status === 'skipped') {
        return;
      }

      if (result.status === 'error') {
        onError?.(
          getErrorMessage(
            result.error,
            FICHA_GESTION_MESSAGES.SAVE_ERROR
          )
        );

        return;
      }

      onSubmit?.(
        form,
        fechaFinGestion
      );

      onGestionGuardada?.(
        form.gestionTerminada
      );
    }, [
      clearValidationErrors,
      documentosFiltrados,
      executeSave,
      form,
      np1TipoContacto,
      onError,
      onGestionGuardada,
      onSubmit,
      params,
      requiereCamposClienteA,
    ]);

  return {
    validationErrors,
    isSaving,
    handleGuardar,
  };
};