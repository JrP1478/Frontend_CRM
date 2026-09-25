import type { SelectOption } from '@shared/types';

import type { FichaGestionDatosPrincipalesCatalogos } from './fichaGestionCatalogos.types';
import type {
  FichaGestionValidationErrors,
  GestionFeedback,
  GestionFormClienteA,
  SetGestionField,
  SetGestionFields,
} from './fichaGestionForm.types';

export interface FichaGestionTelefonoSearchProps {
  isOpen: boolean;
  telefonoIngresado: string;
  validationErrors: FichaGestionValidationErrors;
  isSearchDisabled: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleTelefonoChange: (value: string) => void;
  handleValidate: () => void;
  handleClear: () => void;
}

export interface FichaGestionDatosPrincipalesProps {
  idCliente: string;
  form: GestionFormClienteA;
  setField: SetGestionField;
  handleNP0Change: (value: string) => void;
  handleNP1Change: (value: string) => void;
  telefonoSearch: FichaGestionTelefonoSearchProps;
  catalogos: FichaGestionDatosPrincipalesCatalogos;
}

export interface FichaGestionAccionesTomarProps {
  form: GestionFormClienteA;
  setField: SetGestionField;
  setFields: SetGestionFields;
  usuarioActual: string;
  handleAgendar: () => void;
  agendaValidationErrors?: FichaGestionValidationErrors;
  agendaFeedback?: GestionFeedback | null;
  onCloseAgendaFeedback?: () => void;
  isScheduling?: boolean;
}

export interface FichaGestionResultadosLlamadaProps {
  form: GestionFormClienteA;
  setField: SetGestionField;
  validationErrors?: FichaGestionValidationErrors;
  feedback?: GestionFeedback | null;
  onCloseFeedback?: () => void;
  mostrarCamposClienteA: boolean;
  estadoGestionClienteAOptions: SelectOption[];
  isLoadingEstadoGestionClienteA: boolean;
  errorEstadoGestionClienteA?: string | null;
  motivoNoPagoOptions: SelectOption[];
  isLoadingMotivoNoPago: boolean;
  errorMotivoNoPago?: string | null;
  handleGuardar: () => void;
  isSaving?: boolean;
}

export interface FichaGestionViewModel {
  datosPrincipalesProps: FichaGestionDatosPrincipalesProps;
  accionesTomarProps: FichaGestionAccionesTomarProps;
  resultadosLlamadaProps: FichaGestionResultadosLlamadaProps;
}
