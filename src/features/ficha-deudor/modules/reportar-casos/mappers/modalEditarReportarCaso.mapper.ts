import { REPORTAR_CASO_CLIENTE_B_VALUE } from '../constants/modalCrearReportarCaso.constants';
import type {
  ReportarCasoByIdApi,
  ReportarCasoFormData,
} from '../types/reportarCaso.types';

export const mapReportarCasoByIdApiToFormData = (
  api: ReportarCasoByIdApi
): ReportarCasoFormData => ({
  caso: REPORTAR_CASO_CLIENTE_B_VALUE,
  descripcion: api.cDocOpeCobOut_Descr ?? '',
  tipoSiniestro: api.cDocParam04?.trim() ?? '',
});
