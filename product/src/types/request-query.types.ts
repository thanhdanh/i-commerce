type QuerySortOperator = 'ASC' | 'DESC';
type SPrimitivesVal = string | number | boolean;
    
export enum CondOperator {
    EQUALS = 'equals',
    NOT_EQUALS = 'ne',
    GREATER_THAN = 'gt',
    LOWER_THAN = 'lt',
    GREATER_THAN_EQUALS = 'gte',
    LOWER_THAN_EQUALS = 'lte',
    CONTAINS = 'cont',
    IN = 'in',
    NOT_IN = 'notin',
    IS_NULL = 'isnull',
    NOT_NULL = 'notnull',
    BETWEEN = 'between',
    LIKE = 'like',
}
      
export type QueryFields = string[];

export type QueryFilter = {
    field: string;
    operator: keyof CondOperator;
    value?: any;
};

export type QuerySort = {
    field: string;
    order: QuerySortOperator;
};


export type SearchCondition = {
    [key: string]: {
        operator: keyof CondOperator,
        value: SPrimitivesVal
    }
};
