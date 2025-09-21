export interface PaginationInput {
  limit?: number;
  offset?: number;
  page?: number;
}

export interface PaginationInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  offset: number;
}

export interface PaginatedResult<T> {
  edges: Array<{ node: T; cursor: string }>;
  pageInfo: PaginationInfo;
  totalCount: number;
}

export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

export const normalizePagination = (input: PaginationInput) => {
  const limit = Math.min(input.limit || DEFAULT_LIMIT, MAX_LIMIT);
  const offset = input.offset || 0;
  const page = input.page || Math.floor(offset / limit) + 1;

  return {
    limit,
    offset,
    page,
  };
};

export const createPaginationInfo = (
  totalCount: number,
  limit: number,
  offset: number,
  page: number
): PaginationInfo => {
  const totalPages = Math.ceil(totalCount / limit);

  return {
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    totalCount,
    totalPages,
    currentPage: page,
    limit,
    offset,
  };
};

export const createPaginatedResult = <T>(
  items: T[],
  totalCount: number,
  limit: number,
  offset: number,
  page: number
): PaginatedResult<T> => {
  const edges = items.map((item, index) => ({
    node: item,
    cursor: Buffer.from(`${offset + index}`).toString("base64"),
  }));

  const pageInfo = createPaginationInfo(totalCount, limit, offset, page);

  return {
    edges,
    pageInfo,
    totalCount,
  };
};
