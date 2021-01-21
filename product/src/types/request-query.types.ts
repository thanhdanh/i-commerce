type QuerySortOperator = 'ASC' | 'DESC';
type SPrimitivesVal = string | number | boolean;
type CondOperator =
    | 'eq'
    | 'ne'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte'
    | 'in'
    | 'notin'
    | 'isnull'
    | 'notnull'
    | 'between';

type SFields = {
    [key: string]: SPrimitivesVal | Array<SFields>
}
    
export type QueryFields = string[];

export type QueryFilter = {
    field: string;
    operator: CondOperator;
    value?: any;
};

export type QuerySort = {
    field: string;
    order: QuerySortOperator;
};


export type SearchCondition = SFields;
