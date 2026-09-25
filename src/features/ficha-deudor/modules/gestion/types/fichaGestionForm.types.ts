import type { OperationFeedback } from '@shared/feedback/operationFeedback';

interface GestionForm {
  nombreContacto: string;
  cargo: string;
  np0: string;
  np1: string;
  np2: string;
  estadoGestion: string;
  telefono: string;
  tipoGestion: string;
  gestorId: string;
  gestorNombre: string;
  fechaCompromisoPago: string;
  compromisoSoles: string;
  compromisoUSD: string;
  fechaNuevaGestion: string;
  horaNuevaGestion: string;
  fechaGestion: string;
  horaGestion: string;
  gestionTerminada: boolean;
  observaciones: string;
}

export type GestionFormClienteA = GestionForm & {
  estadoGestionClienteA: string;
  motivoNoPago: string;
};

export type SetGestionField = <K extends keyof GestionFormClienteA>(
  field: K,
  value: GestionFormClienteA[K]
) => void;

export type SetGestionFields = (fields: Partial<GestionFormClienteA>) => void;

export type GestionFeedback = OperationFeedback;

export type FichaGestionValidationErrors = Partial<
  Record<keyof GestionFormClienteA | 'montoCompromiso' | 'documentos', string>
>;
