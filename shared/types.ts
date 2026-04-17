export type CallOutcome = 'Interested' | 'Not Interested';

export interface ClientCall {
  companyName: string;
  contactName: string;
  callOutcome: CallOutcome;
  shortSummary: string;
}
