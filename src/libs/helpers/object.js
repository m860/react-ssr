import {get as getPath} from "object-path"

/**
 * 根据属性的path从obj获取对应的值,如果值不存在,或者是null,NaN就返回defaultValue
 * @param obj
 * @param path
 * @param defaultValue
 * @return {*}
 */
export function getValuePath(obj, path, defaultValue = null) {
    const value = getPath(obj, path);
    if (value === null || value === undefined || isNaN(value)) {
        return defaultValue;
    }
    return value;
}