import {
  useState,
  type ReactNode,
} from 'react';

import type {
  PowerBiReport,
} from '../domain/reporteria.types';

import {
  CrmIcon,
} from '@shared/icons/crm';

import {
  isValidEmailValue,
} from '@shared/utils/validators';

import {
  resolveReportImageSource,
} from '../utils/reporteria.utils';

interface PowerBiReportCardProps {
  report: PowerBiReport;
  onOpen: (
    report: PowerBiReport
  ) => void;
}

export const PowerBiReportCard = ({
  report,
  onOpen,
}: PowerBiReportCardProps): ReactNode => {
  const [failedImage, setFailedImage] =
    useState<string | null>(null);

  const imageSource =
    resolveReportImageSource(
      report.image
    );

  const showImage =
    Boolean(imageSource) &&
    failedImage !== imageSource;

  const contactEmail =
    report.email?.trim() ?? '';

  const hasContactEmail =
    isValidEmailValue(
      contactEmail
    );

  return (
    <article className="reporteria-card">
      <button
        type="button"
        className="reporteria-card__main"
        onClick={() => {
          onOpen(report);
        }}
        aria-label={`Abrir reporte ${report.name}`}
      >
        <div className="reporteria-card__visual">
          {showImage ? (
            <img
              className="reporteria-card__image"
              src={imageSource ?? ''}
              alt={`Logo de ${report.name}`}
              onError={() => {
                setFailedImage(
                  imageSource
                );
              }}
            />
          ) : (
            <span
              className="reporteria-card__fallback-icon"
              aria-hidden="true"
            >
              <CrmIcon
                name={report.icon}
              />
            </span>
          )}

          <span className="reporteria-card__badge">
            Power BI
          </span>
        </div>

        <div className="reporteria-card__content">
          <h2>{report.name}</h2>

          {report.description && (
            <p>
              {report.description}
            </p>
          )}
        </div>
      </button>

      <footer className="reporteria-card__footer">
        <button
          type="button"
          className="reporteria-card__footer-action reporteria-card__footer-action--enter"
          onClick={() => {
            onOpen(report);
          }}
          aria-label={`Ingresar al reporte ${report.name}`}
        >
          <CrmIcon
            name="analytics"
            aria-hidden="true"
          />
          <span>Ingresar</span>
        </button>

        {hasContactEmail ? (
          <a
            className="reporteria-card__footer-action reporteria-card__footer-action--email"
            href={`mailto:${contactEmail}?subject=${encodeURIComponent(
              `Consulta sobre el reporte ${report.name}`
            )}`}
            aria-label={`Enviar correo sobre ${report.name}`}
          >
            <CrmIcon
              name="mail"
              aria-hidden="true"
            />
            <span>Email</span>
          </a>
        ) : (
          <span
            className="reporteria-card__footer-action reporteria-card__footer-action--disabled"
            title="Correo pendiente de configurar"
            aria-label={`Correo pendiente de configurar para ${report.name}`}
          >
            <CrmIcon
              name="mail"
              aria-hidden="true"
            />
            <span>Email</span>
          </span>
        )}

        <span
          className="reporteria-card__status"
          title="Reporte disponible"
        >
          <span
            className="reporteria-card__status-icon"
            aria-hidden="true"
          >
            i
          </span>
          <span>Disponible</span>
        </span>
      </footer>
    </article>
  );
};

export default PowerBiReportCard;
