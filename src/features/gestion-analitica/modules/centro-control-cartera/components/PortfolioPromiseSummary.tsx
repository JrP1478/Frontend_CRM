import type React from 'react';

import {
  CrmIcon,
  type CrmIconName,
} from '@shared/icons/crm';

export interface PortfolioPromiseSummaryItem {
  key: string;
  icon: CrmIconName;
  label: string;
  value: string;
  className?: string;
}

interface PortfolioPromiseSummaryProps {
  className: string;
  items: readonly PortfolioPromiseSummaryItem[];
}

export const PortfolioPromiseSummary: React.FC<
  PortfolioPromiseSummaryProps
> = ({ className, items }) => (
  <div className={className}>
    {items.map((item) => (
      <article key={item.key} className={item.className}>
        <span
          className={`${className}__icon`}
          aria-hidden="true"
        >
          <CrmIcon name={item.icon} />
        </span>
        <div>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      </article>
    ))}
  </div>
);

export default PortfolioPromiseSummary;
