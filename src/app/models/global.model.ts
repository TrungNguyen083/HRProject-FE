export interface TableHeader {
  col: string;
  field: string;
}

export interface PaginatedData<T> {
  pagination: IApiPagination
  data: T[];
}

export interface IApiPagination {
  pageNo: number,
  pageSize: number,
  totalItems: number,
  totalPages: number
}

export interface IDropdownItem {
  label: string;
  value: number;
}

export interface IPositionDropdownItem extends IDropdownItem {
  hasLevel: boolean;
  hasDepartment: boolean
}

export interface PagingInfoParams {
  pageNo?: number;
  pageSize?: number;
  sortBy?: string;
}