/**
 * Check if provided parameter is plain object
 * @param item
 * @returns boolean
 */
function isObject(item) {
    return item !== null && typeof item === 'object' && item.constructor === Object;
}
function cloneDeep(source) {
    if (!isObject(source)) {
        return source;
    }
    const output = Object.assign({}, source);
    Object.keys(source).forEach((key) => {
        output[key] = cloneDeep(source[key]);
    });
    return output;
}
/**
 * Merge and deep copy the values of all of the enumerable own properties of target object from source object to a new object
 * @param target The target object to get properties from.
 * @param source The source object from which to copy properties.
 * @return A new merged and deep copied object.
 */
export function mergeDeep(target, source) {
    if (isObject(source) && Object.keys(source).length === 0) {
        return cloneDeep(Object.assign(Object.assign({}, target), source));
    }
    let output = Object.assign(Object.assign({}, target), source);
    if (isObject(source) && isObject(target)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key]) && key in target && isObject(target[key])) {
                output[key] = mergeDeep(target[key], source[key]);
            }
            else {
                output[key] = isObject(source[key]) ? cloneDeep(source[key]) : source[key];
            }
        });
    }
    return output;
}
