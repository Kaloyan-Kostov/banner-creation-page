export interface PageResponse<T> {
    pageNumber: number
    pageSize: number
    maxPageNumber: number
    content: T[]
}
