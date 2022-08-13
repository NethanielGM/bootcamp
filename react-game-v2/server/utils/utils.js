export const customJoin = (arr, s1, s2) =>
    arr
        .slice(0, -1)
        .join(s1)
        .concat(arr.length > 1 ? s2 : '', arr.slice(-1))

export const error = (status, msg) => ({ error: { status, msg } })

export const exposeAttributes = (obj, attributes) =>
    Object.keys(obj)
        .filter((key) => attributes.includes(key))
        .reduce((cur, key) => {
            return Object.assign(cur, { [key]: obj[key] })
        }, {})