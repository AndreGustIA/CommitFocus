export interface Daily {
  id: string;
  dataReferencia: string;
  oQueFiz: string;
  oQueFarei: string;
  impedimentos: string;
}

export type DailyPayload = Omit<Daily, 'id'>;
