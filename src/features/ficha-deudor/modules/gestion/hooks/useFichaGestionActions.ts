import type {
  GestionFormClienteA,
  SetGestionField,
} from '../types/fichaGestionForm.types';
import type {
  DocumentoApi,
  FichaDeudorGestionFormParams,
} from '../../../shared/types';
import type { PaletaRespuestaOption } from '../../../shared/utils/selectOptions.utils';
import { useFichaGestionAgendar } from './useFichaGestionAgendar';
import { useFichaGestionGuardar } from './useFichaGestionGuardar';

interface UseFichaGestionActionsParams {
  form: GestionFormClienteA;
  setField: SetGestionField;
  params: FichaDeudorGestionFormParams;
  deudorNombre: string;
  carteraNombre: string;
  np1Options: PaletaRespuestaOption[];
  np2Options: PaletaRespuestaOption[];
  documentosFiltrados: DocumentoApi[];
  np1TipoContacto: number;
  requiereCamposClienteA: boolean;
  onGestionGuardada?: (
    gestionTerminada: boolean
  ) => void;
  onSubmit?: (
    data: GestionFormClienteA,
    fechaFinGestion: string
  ) => void;
  onSaveError?: (message: string) => void;
}

export const useFichaGestionActions = ({
  form,
  setField,
  params,
  deudorNombre,
  carteraNombre,
  np1Options,
  np2Options,
  documentosFiltrados,
  np1TipoContacto,
  requiereCamposClienteA,
  onGestionGuardada,
  onSaveError,
  onSubmit,
}: UseFichaGestionActionsParams) => {
  const {
    agendaValidationErrors,
    agendaFeedback,
    isScheduling,
    handleCloseAgendaFeedback,
    clearAgendaState,
    handleAgendar,
  } = useFichaGestionAgendar({
    form,
    setField,
    params,
    deudorNombre,
    carteraNombre,
    np1Options,
    np2Options,
  });

  const {
    validationErrors,
    isSaving,
    handleGuardar,
  } = useFichaGestionGuardar({
    form,
    params,
    documentosFiltrados,
    np1TipoContacto,
    requiereCamposClienteA,
    onGestionGuardada,
    onError: onSaveError,
    onSubmit,
  });

  return {
    agendaValidationErrors,
    agendaFeedback,
    isScheduling,
    handleCloseAgendaFeedback,
    clearAgendaState,
    validationErrors,
    isSaving,
    handleAgendar,
    handleGuardar,
  };
};