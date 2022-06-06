import { LocationOptions } from './location-options.types';
import { BoundsType, DadataAddress } from './address.types';

export interface SuggestionDto {
  token: string;
  query: string;
  url?: string;
  count?: number;
  toBound?: BoundsType;
  fromBound?: BoundsType;
  locationOptions?: LocationOptions;
}

export interface SuggestionPayload {
  query: string;
  count?: number;
  to_bound?: { value: BoundsType};
  from_bound?: { value: BoundsType};
  language?: string;
  locations?: object[];
  locations_boost?: object;
}

export interface Suggestion {
  value: string;
  unrestricted_value: string;
  data: DadataAddress;
}
