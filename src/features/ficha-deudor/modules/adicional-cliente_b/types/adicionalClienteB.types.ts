export interface AdicionalClienteBGestionApi {
  ventanaMeses: number;
  canal: number;
  canalNombre: string;
  nId_DocxCobrarOpe: number;
  nId_DocxCobrar: number;
  fecha: string | null;
  estatus: string;
  peso: number;
  telefono: string | null;
  comentario: string | null;
  intentos: number;
  intentosRobot: number;
  contactosDirectos: number;
  origenDireccion: string | null;
  direccion: string | null;
}

export interface AdicionalClienteBOperacionApi {
  operacion: string;
  placa: string | null;
  diasAtraso: number;
  nId_Ubigeo: number;
  estadoOperacion: string | null;
  avanceCredito: string | null;
  direccionLegal: string | null;
  distritoLegal: string | null;
  provinciaLegal: string | null;
  departamentoLegal: string | null;
}

export interface AdicionalClienteBApi {
  numeroDiasNoContacto: number;
  fechaUltimoContacto: string | null;
  cantidadTotalVino: number;
  cantidadTotalPago: number;
  cantidadTotalVino6Meses: number;
  cantidadTotalPago6Meses: number;
  cobertura: string | null;
  mejoresGestiones: AdicionalClienteBGestionApi[];
  operaciones: AdicionalClienteBOperacionApi[];
}

export interface AdicionalClienteBGestion {
  ventanaMeses: number;
  canal: number;
  canalNombre: string;
  idDocxCobrarOpe: number;
  idDocxCobrar: number;
  fecha: string | null;
  estatus: string;
  peso: number;
  telefono: string | null;
  comentario: string | null;
  intentos: number;
  intentosRobot: number;
  contactosDirectos: number;
  origenDireccion: string | null;
  direccion: string | null;
}

export interface AdicionalClienteBOperacion {
  operacion: string;
  placa: string | null;
  diasAtraso: number;
  idUbigeo: number;
  estadoOperacion: string | null;
  avanceCredito: string | null;
  direccionLegal: string | null;
  distritoLegal: string | null;
  provinciaLegal: string | null;
  departamentoLegal: string | null;
}

export interface AdicionalClienteB {
  numeroDiasNoContacto: number;
  fechaUltimoContacto: string | null;
  cantidadTotalVino: number;
  cantidadTotalPago: number;
  cantidadTotalVino6Meses: number;
  cantidadTotalPago6Meses: number;
  cobertura: string | null;
  mejoresGestiones: AdicionalClienteBGestion[];
  operaciones: AdicionalClienteBOperacion[];
}

export type AdicionalClienteBCanal = 'CALL' | 'CAMPO';
