import type {
  CrmIconName,
} from '@shared/icons/crm';

export type ReporteriaAccessStatus =
  | 'idle'
  | 'loading'
  | 'ready'
  | 'error';

export interface PowerBiReport {
  id: number;
  code: string;
  name: string;
  description: string;
  serviceUrl: string | null;
  image: string | null;
  email: string | null;
  icon: CrmIconName;
}

export interface ReporteriaSection {
  id: number;
  name: string;
  description: string;
  parentId: number;
}

export interface ReporteriaCatalog {
  section: ReporteriaSection | null;
  parentName: string | null;
  reports: readonly PowerBiReport[];
}
