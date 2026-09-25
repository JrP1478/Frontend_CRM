import { useCallback } from 'react';

import { useApiResource } from '@shared/hooks/useApiResource';

import { fetchAdicionalClienteB } from '../api/adicionalClienteBApi';
import { ADICIONAL_CLIENTE_B_API_MESSAGES } from '../constants/adicionalClienteBPopup.constants';
import type { AdicionalClienteB } from '../types/adicionalClienteB.types';

interface UseAdicionalClienteBParams {
  idDeudor: string;
  idCartera: string;
  idCliente: string;
}

interface UseAdicionalClienteBReturn {
  data: AdicionalClienteB | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAdicionalClienteB = ({
  idDeudor,
  idCartera,
  idCliente,
}: UseAdicionalClienteBParams): UseAdicionalClienteBReturn => {
  const canLoad = Boolean(
    idDeudor && idCartera && idCliente
  );

  const fetcher = useCallback(
    (signal: AbortSignal) =>
      fetchAdicionalClienteB(
        {
          idDeudor,
          idCartera,
          idCliente,
        },
        signal
      ),
    [idCartera, idCliente, idDeudor]
  );

  const resource = useApiResource<AdicionalClienteB>(
    fetcher,
    [idDeudor, idCartera, idCliente],
    {
      enabled: canLoad,
      initialLoading: canLoad,
      errorMessage: ADICIONAL_CLIENTE_B_API_MESSAGES.loadError,
    }
  );

  return resource;
};
