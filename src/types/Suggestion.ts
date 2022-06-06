import { DadataAddress } from './address.types';

export interface Suggestion {
  value: string;
  unrestricted_value: string;
  data: DadataAddress;
}
