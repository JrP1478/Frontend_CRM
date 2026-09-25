import React from 'react';

import {
  PopupContextBoundary,
  type FichaDeudorPopupContext,
} from '@app/popups';

import {
  PopupErrorState,
  PopupLoadingState,
  PopupPageLayout,
} from '../../../shared/components/popups/common';
import { closePopupWindow } from '../../../shared/utils/popupWindow.utils';
import { ADICIONAL_CLIENTE_B_POPUP_TEXTS } from '../constants/adicionalClienteBPopup.constants';
import { useAdicionalClienteB } from '../hooks/useAdicionalClienteB';
import { AdicionalClienteBSummary } from './AdicionalClienteBSummary';

interface AdicionalClienteBPopupContentProps {
  context: FichaDeudorPopupContext<'adicional-cliente_b'>;
}

const AdicionalClienteBPopupContent: React.FC<
  AdicionalClienteBPopupContentProps
> = ({ context }) => {
  const {
    idCliente,
    idCartera,
    idDeudor,
    nombre,
    documento,
  } = context;

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useAdicionalClienteB({
    idCliente,
    idCartera,
    idDeudor,
  });

  if (isLoading) {
    return (
      <PopupLoadingState
        message={ADICIONAL_CLIENTE_B_POPUP_TEXTS.loading}
      />
    );
  }

  if (error || !data) {
    return (
      <PopupErrorState
        title={ADICIONAL_CLIENTE_B_POPUP_TEXTS.errorTitle}
        message={
          error ??
          'El servicio no devolvió información adicional CLIENTE_B.'
        }
        retryLabel={ADICIONAL_CLIENTE_B_POPUP_TEXTS.retryButton}
        closeLabel={ADICIONAL_CLIENTE_B_POPUP_TEXTS.closeButton}
        onRetry={refetch}
        onClose={closePopupWindow}
      />
    );
  }

  return (
    <PopupPageLayout
      logoText={ADICIONAL_CLIENTE_B_POPUP_TEXTS.logoText}
      logoSub={ADICIONAL_CLIENTE_B_POPUP_TEXTS.logoSub}
      navSection={ADICIONAL_CLIENTE_B_POPUP_TEXTS.navSection}
      navActive={ADICIONAL_CLIENTE_B_POPUP_TEXTS.navActive}
      nombre={nombre}
      documento={documento}
    >
      <AdicionalClienteBSummary data={data} />
    </PopupPageLayout>
  );
};

const AdicionalClienteBPopup: React.FC = () => {
  return (
    <PopupContextBoundary popupType="adicional-cliente_b">
      {(context) => (
        <AdicionalClienteBPopupContent context={context} />
      )}
    </PopupContextBoundary>
  );
};

export default AdicionalClienteBPopup;
