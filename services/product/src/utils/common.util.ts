export const objKeys = (val: any): string[] => Object.keys(val);
export const isObject = (val: any): boolean => typeof val === 'object' && !isNull(val);
export const isObjectFull = (val: any) => isObject(val) && hasLength(objKeys(val));
export const isArrayFull = (val: any): boolean => Array.isArray(val) && hasLength(val);
export const hasLength = (val: any): boolean => val.length > 0;
export const isUndefined = (val: any): boolean => typeof val === 'undefined';
export const isNull = (val: any): boolean => val === null;
export const isNil = (val: any): boolean => isUndefined(val) || isNull(val);