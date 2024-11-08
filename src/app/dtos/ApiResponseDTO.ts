export interface ApiResponseDTO<T = any> {
  status: 'success' | 'failed';
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  meta?: {
    pagination: PaginationMetaDTO;
  };
}

interface PaginationMetaDTO {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}
