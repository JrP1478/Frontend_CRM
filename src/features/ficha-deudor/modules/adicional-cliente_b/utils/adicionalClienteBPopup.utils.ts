import { ADICIONAL_CLIENTE_B_POPUP_TEXTS } from '../constants/adicionalClienteBPopup.constants';
import type {
  AdicionalClienteBCanal,
  AdicionalClienteBGestion,
  AdicionalClienteBOperacion,
} from '../types/adicionalClienteB.types';

const LOCAL_ISO_DATE_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})(?:T|$)/;

const CHANNEL_CODES: Readonly<
  Record<AdicionalClienteBCanal, number>
> = {
  CALL: 1,
  CAMPO: 2,
};

const normalizeChannelName = (value: string): string => {
  return value.trim().toUpperCase();
};

export const formatAdicionalClienteBDate = (
  value: string | null
): string => {
  const normalizedValue = value?.trim() ?? '';

  if (!normalizedValue) {
    return ADICIONAL_CLIENTE_B_POPUP_TEXTS.emptyValue;
  }

  const match = normalizedValue.match(
    LOCAL_ISO_DATE_PATTERN
  );

  if (!match) {
    return normalizedValue;
  }

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const validationDate = new Date(
    Date.UTC(year, month - 1, day)
  );

  const isValidDate =
    validationDate.getUTCFullYear() === year &&
    validationDate.getUTCMonth() === month - 1 &&
    validationDate.getUTCDate() === day;

  if (!isValidDate) {
    return normalizedValue;
  }

  return `${dayText}/${monthText}/${yearText}`;
};

export const getAdicionalClienteBGestiones = (
  gestiones: readonly AdicionalClienteBGestion[],
  canal: AdicionalClienteBCanal,
  ventanaMeses: number
): AdicionalClienteBGestion[] => {
  const channelCode = CHANNEL_CODES[canal];

  return gestiones.filter((gestion) => {
    if (gestion.ventanaMeses !== ventanaMeses) {
      return false;
    }

    return (
      gestion.canal === channelCode ||
      normalizeChannelName(gestion.canalNombre) === canal
    );
  });
};

export const isAdicionalClienteBGestionEmpty = (
  gestion: AdicionalClienteBGestion
): boolean => {
  return (
    gestion.idDocxCobrarOpe === 0 &&
    gestion.idDocxCobrar === 0 &&
    gestion.fecha === null
  );
};

export const getAdicionalClienteBOperationPrefix = (
  operacion: AdicionalClienteBOperacion
): string => {
  const operationCode =
    operacion.operacion || '—';
  const plate = operacion.placa
    ? ` | ${operacion.placa}`
    : '';

  return `Op. ${operationCode}${plate}`;
};

export const getAdicionalClienteBDisplayValue = (
  value: string | null
): string => {
  return value || ADICIONAL_CLIENTE_B_POPUP_TEXTS.emptyValue;
};
