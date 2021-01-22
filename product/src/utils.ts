import { Model } from 'mongoose';
import { RequestQueryParams } from './interfaces/request_query.interface';
import { CondOperator } from './types/request-query.types';


export const isObject = (val: any): boolean => typeof val === 'object' && !isNull(val);
export const isNull = (val: any): boolean => val === null;
export const isArrayFull = (val: any): boolean => Array.isArray(val) && hasItem(val);
export const hasItem = (val: any): boolean => val.length > 0;

export function createQueryBuilder(model: Model<any>, params: RequestQueryParams) {
    const query = model.find();

    if (params.fields.length) {
        query.select(params.fields);
    }

    if (params.filter.length) {
        params.filter.forEach((cond) => {
            const { field, value } = cond;
            switch (cond.operator) {
                case CondOperator.EQUALS:
                    query.where(cond.field).equals(cond.value)
                    break;
                case CondOperator.NOT_EQUALS:
                    query.where(cond.field).ne(cond.value)
                    break;
                case CondOperator.LIKE:
                    query.where(cond.field, new RegExp('^' + cond.value + '$', "i"))
                    break;
                case CondOperator.BETWEEN:
                    checkFilterIsArray(field, value, 2)
                    query.where(cond.field).gte(Math.min(cond.value)).lte(Math.max(cond.value))
                    break;
                case CondOperator.GREATER_THAN:
                    query.where(cond.field).gt(cond.value)
                    break;
                case CondOperator.LOWER_THAN:
                    query.where(cond.field).lt(cond.value)
                    break;
                case CondOperator.GREATER_THAN_EQUALS:
                    query.where(cond.field).gte(cond.value)
                    break;
                case CondOperator.LOWER_THAN_EQUALS:
                    query.where(cond.field).lte(cond.value)
                    break;
                case CondOperator.IN:
                    checkFilterIsArray(field, value)
                    query.where(cond.field).in([...cond.value])
                    break;
            }
        })
    }

    if (params.sort.length) {
        const sortObj = {}; 
        params.sort.forEach(sortCond => {
            sortObj[sortCond.field] = sortCond.order;
        })
        query.sort(sortObj);
    }

    if (params.limit > 0) {
        query.limit(params.limit);
    }

    if (params.skip) {
        query.limit(params.skip);
    }

    return query;
}


function checkFilterIsArray(field: string, value: any, withLength?: number) {
    /* istanbul ignore if */
    if (!isArrayFull(value) || !(withLength && value.len === withLength)) {
        this.throwBadRequestException(`Invalid column '${field}' value`);
    }
}

