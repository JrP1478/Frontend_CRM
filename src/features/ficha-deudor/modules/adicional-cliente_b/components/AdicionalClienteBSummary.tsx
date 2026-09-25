import React, { type ReactNode } from 'react';

import {
  ADICIONAL_CLIENTE_B_POPUP_TEXTS,
  ADICIONAL_CLIENTE_B_ROW_LABELS,
} from '../constants/adicionalClienteBPopup.constants';
import type {
  AdicionalClienteB,
  AdicionalClienteBCanal,
  AdicionalClienteBGestion,
  AdicionalClienteBOperacion,
} from '../types/adicionalClienteB.types';
import {
  formatAdicionalClienteBDate,
  getAdicionalClienteBDisplayValue,
  getAdicionalClienteBGestiones,
  getAdicionalClienteBOperationPrefix,
  isAdicionalClienteBGestionEmpty,
} from '../utils/adicionalClienteBPopup.utils';

interface AdicionalClienteBSummaryProps {
  data: AdicionalClienteB;
}

interface SummaryRowProps {
  label: string;
  children: ReactNode;
}

const SummaryRow: React.FC<SummaryRowProps> = ({
  label,
  children,
}) => {
  return (
    <div className="adicional-cliente_b-row">
      <dt className="adicional-cliente_b-label">{label}</dt>
      <dd className="adicional-cliente_b-value">{children}</dd>
    </div>
  );
};

interface GestionDetailProps {
  gestion: AdicionalClienteBGestion;
  canal: AdicionalClienteBCanal;
}

const GestionDetail: React.FC<GestionDetailProps> = ({
  gestion,
  canal,
}) => {
  if (isAdicionalClienteBGestionEmpty(gestion)) {
    return (
      <em className="adicional-cliente_b-empty">
        {gestion.estatus || ADICIONAL_CLIENTE_B_POPUP_TEXTS.noManagement}
      </em>
    );
  }

  const metaItems: ReactNode[] = [];

  if (gestion.fecha) {
    metaItems.push(
      <span key="fecha">
        <strong>Fecha:</strong>{' '}
        {formatAdicionalClienteBDate(gestion.fecha)}
      </span>
    );
  }

  if (canal === 'CALL' && gestion.telefono) {
    metaItems.push(
      <span key="telefono">
        <strong>Tel:</strong> {gestion.telefono}
      </span>
    );
  }

  if (canal === 'CAMPO' && gestion.origenDireccion) {
    metaItems.push(
      <span key="origen">
        <strong>Origen:</strong> {gestion.origenDireccion}
      </span>
    );
  }

  return (
    <article className="adicional-cliente_b-management">
      <strong className="adicional-cliente_b-management-status">
        {gestion.estatus || ADICIONAL_CLIENTE_B_POPUP_TEXTS.emptyValue}
      </strong>

      {metaItems.length > 0 && (
        <div className="adicional-cliente_b-management-meta">
          {metaItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span
                  className="adicional-cliente_b-separator"
                  aria-hidden="true"
                >
                  |
                </span>
              )}
              {item}
            </React.Fragment>
          ))}
        </div>
      )}

      {canal === 'CAMPO' && gestion.direccion && (
        <div className="adicional-cliente_b-management-comment">
          {gestion.direccion}
        </div>
      )}

      {gestion.comentario && (
        <div className="adicional-cliente_b-management-comment">
          {gestion.comentario}
        </div>
      )}

      <div className="adicional-cliente_b-management-footer">
        <span>
          <strong>Intentos:</strong> {gestion.intentos}
          {gestion.intentosRobot > 0 && (
            <> (DISCADOR {gestion.intentosRobot})</>
          )}
        </span>

        <span className="adicional-cliente_b-separator" aria-hidden="true">
          |
        </span>

        <span>
          <strong>Contacto directo:</strong>{' '}
          {gestion.contactosDirectos}
        </span>
      </div>
    </article>
  );
};

interface ManagementRowValueProps {
  gestiones: readonly AdicionalClienteBGestion[];
  canal: AdicionalClienteBCanal;
  ventanaMeses: number;
}

const ManagementRowValue: React.FC<ManagementRowValueProps> = ({
  gestiones,
  canal,
  ventanaMeses,
}) => {
  const matchingGestiones = getAdicionalClienteBGestiones(
    gestiones,
    canal,
    ventanaMeses
  );

  if (matchingGestiones.length === 0) {
    return (
      <em className="adicional-cliente_b-empty">
        {ADICIONAL_CLIENTE_B_POPUP_TEXTS.noManagement}
      </em>
    );
  }

  return (
    <div className="adicional-cliente_b-management-list">
      {matchingGestiones.map((gestion, index) => (
        <GestionDetail
          key={`${gestion.idDocxCobrarOpe}-${gestion.idDocxCobrar}-${index}`}
          gestion={gestion}
          canal={canal}
        />
      ))}
    </div>
  );
};

type OperacionField =
  | 'estadoOperacion'
  | 'avanceCredito'
  | 'departamentoLegal'
  | 'provinciaLegal'
  | 'distritoLegal'
  | 'direccionLegal';

interface OperationRowValueProps {
  operaciones: readonly AdicionalClienteBOperacion[];
  field: OperacionField;
}

const OperationRowValue: React.FC<OperationRowValueProps> = ({
  operaciones,
  field,
}) => {
  if (operaciones.length === 0) {
    return (
      <em className="adicional-cliente_b-empty">
        {ADICIONAL_CLIENTE_B_POPUP_TEXTS.noOperations}
      </em>
    );
  }

  return (
    <div className="adicional-cliente_b-operation-list">
      {operaciones.map((operacion, index) => (
        <div
          className="adicional-cliente_b-operation"
          key={`${operacion.operacion}-${operacion.placa ?? ''}-${index}`}
        >
          <span className="adicional-cliente_b-operation-prefix">
            {getAdicionalClienteBOperationPrefix(operacion)}:
          </span>{' '}
          <strong>
            {getAdicionalClienteBDisplayValue(operacion[field])}
          </strong>
        </div>
      ))}
    </div>
  );
};

export const AdicionalClienteBSummary: React.FC<
  AdicionalClienteBSummaryProps
> = ({ data }) => {
  return (
    <section
      className="adicional-cliente_b-card"
      aria-label="Información adicional CLIENTE_B"
    >
      <dl className="adicional-cliente_b-list">
        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.numeroDiasNoContacto}>
          <strong>{data.numeroDiasNoContacto}</strong>
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.fechaUltimoContacto}>
          <strong>{formatAdicionalClienteBDate(data.fechaUltimoContacto)}</strong>
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.cantidadTotalVino}>
          <strong>{data.cantidadTotalVino}</strong>
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.cantidadTotalPago}>
          <strong>{data.cantidadTotalPago}</strong>
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.cantidadTotalVino6Meses}>
          <strong>{data.cantidadTotalVino6Meses}</strong>
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.cantidadTotalPago6Meses}>
          <strong>{data.cantidadTotalPago6Meses}</strong>
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.mejorGestionCall12}>
          <ManagementRowValue
            gestiones={data.mejoresGestiones}
            canal="CALL"
            ventanaMeses={12}
          />
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.mejorGestionCall6}>
          <ManagementRowValue
            gestiones={data.mejoresGestiones}
            canal="CALL"
            ventanaMeses={6}
          />
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.mejorGestionCall1}>
          <ManagementRowValue
            gestiones={data.mejoresGestiones}
            canal="CALL"
            ventanaMeses={1}
          />
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.mejorGestionCampo12}>
          <ManagementRowValue
            gestiones={data.mejoresGestiones}
            canal="CAMPO"
            ventanaMeses={12}
          />
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.mejorGestionCampo6}>
          <ManagementRowValue
            gestiones={data.mejoresGestiones}
            canal="CAMPO"
            ventanaMeses={6}
          />
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.mejorGestionCampo1}>
          <ManagementRowValue
            gestiones={data.mejoresGestiones}
            canal="CAMPO"
            ventanaMeses={1}
          />
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.estadoOperacion}>
          <OperationRowValue
            operaciones={data.operaciones}
            field="estadoOperacion"
          />
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.avanceCredito}>
          <OperationRowValue
            operaciones={data.operaciones}
            field="avanceCredito"
          />
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.cobertura}>
          <strong>
            {getAdicionalClienteBDisplayValue(data.cobertura)}
          </strong>
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.departamentoLegal}>
          <OperationRowValue
            operaciones={data.operaciones}
            field="departamentoLegal"
          />
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.provinciaLegal}>
          <OperationRowValue
            operaciones={data.operaciones}
            field="provinciaLegal"
          />
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.distritoLegal}>
          <OperationRowValue
            operaciones={data.operaciones}
            field="distritoLegal"
          />
        </SummaryRow>

        <SummaryRow label={ADICIONAL_CLIENTE_B_ROW_LABELS.direccionLegal}>
          <OperationRowValue
            operaciones={data.operaciones}
            field="direccionLegal"
          />
        </SummaryRow>
      </dl>
    </section>
  );
};
