import type React from 'react';

import { CrmIcon } from '@shared/icons/crm';

import { AnalyticsKpiCard } from '../../../shared/components';
import type {
  PortfolioSummaryMetrics,
} from '../domain/panoramaCartera.types';
import {
  calculatePortfolioRate,
  formatPortfolioCurrency,
  formatPortfolioInteger,
  formatPortfolioPercentage,
} from '../utils/centroControlCartera.formatters';

interface KpiCarteraGridProps {
  summary: PortfolioSummaryMetrics;
}

export const KpiCarteraGrid: React.FC<
  KpiCarteraGridProps
> = ({ summary }) => {
  const managedRate = calculatePortfolioRate(
    summary.managedPortfolio,
    summary.assignedPortfolio
  );

  const pendingRate = calculatePortfolioRate(
    summary.pendingPortfolio,
    summary.assignedPortfolio
  );

  return (
    <div className="portfolio-kpi-grid">
      <AnalyticsKpiCard
        layout="stacked"
        label="Cartera asignada"
        value={formatPortfolioInteger(
          summary.assignedPortfolio
        )}
        hint="Universo asignado al corte"
        icon={<CrmIcon name="briefcase" />}
        progress={100}
      />

      <AnalyticsKpiCard
        layout="stacked"
        label="Cartera gestionada"
        value={formatPortfolioInteger(
          summary.managedPortfolio
        )}
        hint={`${formatPortfolioPercentage(
          managedRate
        )} de la cartera`}
        icon={<CrmIcon name="success" />}
        tone="success"
        progress={managedRate}
      />

      <AnalyticsKpiCard
        layout="stacked"
        label="Cartera pendiente"
        value={formatPortfolioInteger(
          summary.pendingPortfolio
        )}
        hint={`${formatPortfolioPercentage(
          pendingRate
        )} por gestionar`}
        icon={<CrmIcon name="history" />}
        tone="warning"
        progress={pendingRate}
      />

      <AnalyticsKpiCard
        layout="stacked"
        label="Monto recuperado"
        value={formatPortfolioCurrency(
          summary.recoveredAmount
        )}
        hint="Pagos válidos acumulados"
        icon={<CrmIcon name="money" />}
        tone="danger"
        emphasis
      />
    </div>
  );
};
