import type React from 'react';

import {
  CrmIcon,
  type CrmIconName,
} from '@shared/icons/crm';
import type {
  PortfolioSummaryMetrics,
} from '../domain/panoramaCartera.types';
import {
  formatPortfolioInteger,
  formatPortfolioPercentage,
  formatPortfolioIntensity,
} from '../utils/centroControlCartera.formatters';

interface MetricasSecundariasCarteraProps {
  summary: PortfolioSummaryMetrics;
}

interface SecondaryMetricProps {
  label: string;
  value: string;
  icon: CrmIconName;
}

const SecondaryMetric: React.FC<
  SecondaryMetricProps
> = ({ label, value, icon }) => {
  return (
    <div className="portfolio-secondary-metric">
      <span
        className="portfolio-secondary-metric__icon"
        aria-hidden="true"
      >
        <CrmIcon name={icon} />
      </span>

      <span className="portfolio-secondary-metric__copy">
        <span className="portfolio-secondary-metric__label">
          {label}
        </span>
        <strong className="portfolio-secondary-metric__value">
          {value}
        </strong>
      </span>
    </div>
  );
};

export const MetricasSecundariasCartera: React.FC<
  MetricasSecundariasCarteraProps
> = ({ summary }) => {
  return (
    <div className="portfolio-secondary-metrics">
      <SecondaryMetric
        label="Gestiones"
        value={formatPortfolioInteger(
          summary.managementCount
        )}
        icon="bar-chart"
      />
      <SecondaryMetric
        label="Intensidad"
        value={formatPortfolioIntensity(
          summary.managementIntensity
        )}
        icon="analytics"
      />
      <SecondaryMetric
        label="Contactabilidad"
        value={formatPortfolioPercentage(
          summary.contactabilityRate
        )}
        icon="phone"
      />
      <SecondaryMetric
        label="RPC"
        value={formatPortfolioPercentage(
          summary.rpcRate
        )}
        icon="target"
      />
      <SecondaryMetric
        label="Tasa de cierre"
        value={formatPortfolioPercentage(
          summary.closeRate
        )}
        icon="success"
      />
    </div>
  );
};
