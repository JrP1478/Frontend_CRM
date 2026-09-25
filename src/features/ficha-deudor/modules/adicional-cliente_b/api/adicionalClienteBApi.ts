import { apiClient } from '@shared/api/apiClient';

import {
  unwrapApiObjectResponse,
} from '../../../shared/utils/apiResponse.utils';
import { ADICIONAL_CLIENTE_B_API_MESSAGES } from '../constants/adicionalClienteBPopup.constants';
import { mapAdicionalClienteB } from '../mappers/adicionalClienteB.mapper';
import type { AdicionalClienteB } from '../types/adicionalClienteB.types';
import { isAdicionalClienteBApi } from './adicionalClienteBApi.validators';

const ADICIONAL_CLIENTE_B_ENDPOINT = '/v1/Boton/GetOperativasClienteB';

export interface FetchAdicionalClienteBParams {
  idDeudor: string;
  idCartera: string;
  idCliente: string;
}

export async function fetchAdicionalClienteB(
  {
    idDeudor,
    idCartera,
    idCliente,
  }: FetchAdicionalClienteBParams,
  signal?: AbortSignal
): Promise<AdicionalClienteB> {
  const params = new URLSearchParams({
    nId_PersDeudor: idDeudor,
    nId_Cartera: idCartera,
    nId_Cliente: idCliente,
  });

  const result = await apiClient<unknown>(
    `${ADICIONAL_CLIENTE_B_ENDPOINT}?${params.toString()}`,
    { signal }
  );

  const api = unwrapApiObjectResponse(
    result,
    ADICIONAL_CLIENTE_B_API_MESSAGES.loadError,
    isAdicionalClienteBApi
  );

  return mapAdicionalClienteB(api);
}
