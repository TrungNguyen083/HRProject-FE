import { IApiPagination } from '../models/global.model';

export function configPagination(pagination: IApiPagination) {
  const { pageNo, pageSize, totalItems, totalPages } = pagination;

  return {
    page: pageNo,
    first: totalItems ? pageSize * (pageNo - 1) + 1 : 0,
    rows: pageSize,
    pageCount: totalPages,
    totalRecord: totalItems,
  };
}
