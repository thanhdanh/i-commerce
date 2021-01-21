import { QueryFields, QueryFilter, QuerySort, SearchCondition } from "src/types";

export interface RequestQueryParams {
    // Search conditions
    search: SearchCondition;
    
    // Get selected fields 
    fields: QueryFields[];

    // filter result by conditions
    filter: QueryFilter[];
    
    // sort result by some field in ASC | DESC order
    sort: QuerySort[];

    // Paginatiing
    limit: number;
    search_after: number;
}