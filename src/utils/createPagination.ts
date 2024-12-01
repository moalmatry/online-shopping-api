// createPagination;
export const createPaginationPrisma = async <T>(
  currentPage: string | undefined,
  currentLimit: string | undefined,
  document: T,
) => {
  const page = parseInt(String(currentPage)) ?? 1;
  const limit = parseInt(String(currentLimit)) ?? 10;
  const startIndex = (page - 1) * limit;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   @ts-expect-error
  const total = await document.count();

  return { startIndex, limit, total };
};
