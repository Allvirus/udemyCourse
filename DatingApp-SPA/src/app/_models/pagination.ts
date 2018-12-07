// 分页接口
export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// 分页结果集
export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}
