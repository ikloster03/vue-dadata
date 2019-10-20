import DadataAddress from '@/types/DadataAddress';

export interface DadataSuggestion {
  value: string;
  unrestricted_value: string;
  data: DadataAddress;
}

export default DadataSuggestion;
