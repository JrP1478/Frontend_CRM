import {
  createObjectGuard,
  isInteger,
  isNumber,
  isObjectRecord,
  isString,
} from '../../../shared/utils/runtimeTypeGuards.utils';
import type {
  AdicionalClienteBApi,
  AdicionalClienteBGestionApi,
  AdicionalClienteBOperacionApi,
} from '../types/adicionalClienteB.types';

const isNullableString = (
  value: unknown
): value is string | null => {
  return value === null || isString(value);
};

const isNonNegativeInteger = (
  value: unknown
): value is number => {
  return isInteger(value) && value >= 0;
};

const isNonNegativeNumber = (
  value: unknown
): value is number => {
  return isNumber(value) && value >= 0;
};

export const isAdicionalClienteBGestionApi =
  createObjectGuard<AdicionalClienteBGestionApi>({
    ventanaMeses: isNonNegativeInteger,
    canal: isNonNegativeInteger,
    canalNombre: isString,
    nId_DocxCobrarOpe: isNonNegativeInteger,
    nId_DocxCobrar: isNonNegativeInteger,
    fecha: isNullableString,
    estatus: isString,
    peso: isNonNegativeNumber,
    telefono: isNullableString,
    comentario: isNullableString,
    intentos: isNonNegativeInteger,
    intentosRobot: isNonNegativeInteger,
    contactosDirectos: isNonNegativeInteger,
    origenDireccion: isNullableString,
    direccion: isNullableString,
  });

export const isAdicionalClienteBOperacionApi =
  createObjectGuard<AdicionalClienteBOperacionApi>({
    operacion: isString,
    placa: isNullableString,
    diasAtraso: isNonNegativeInteger,
    nId_Ubigeo: isNonNegativeInteger,
    estadoOperacion: isNullableString,
    avanceCredito: isNullableString,
    direccionLegal: isNullableString,
    distritoLegal: isNullableString,
    provinciaLegal: isNullableString,
    departamentoLegal: isNullableString,
  });

export const isAdicionalClienteBApi = (
  value: unknown
): value is AdicionalClienteBApi => {
  if (!isObjectRecord(value)) {
    return false;
  }

  return (
    isNonNegativeInteger(value.numeroDiasNoContacto) &&
    isNullableString(value.fechaUltimoContacto) &&
    isNonNegativeInteger(value.cantidadTotalVino) &&
    isNonNegativeInteger(value.cantidadTotalPago) &&
    isNonNegativeInteger(value.cantidadTotalVino6Meses) &&
    isNonNegativeInteger(value.cantidadTotalPago6Meses) &&
    isNullableString(value.cobertura) &&
    Array.isArray(value.mejoresGestiones) &&
    value.mejoresGestiones.every(isAdicionalClienteBGestionApi) &&
    Array.isArray(value.operaciones) &&
    value.operaciones.every(isAdicionalClienteBOperacionApi)
  );
};
