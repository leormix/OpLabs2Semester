function memoizeLRU(fn, maxSize) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            const value = cache.get(key);
            cache.delete(key);
            cache.set(key, value);
            return value;
        }

        const result = fn.apply(this, args);
        cache.set(key, result);

        if (cache.size > maxSize) {
            const oldestKey = cache.keys().next().value;
            cache.delete(oldestKey);
        }

        return result;
    };
}



const slowAdd = (a, b) => {
    return a + b;
}

const memoizeddAdd = memoizeLRU(slowAdd, 2)

console.log(memoizeddAdd(1, 2))
console.log(memoizeddAdd(2, 3))
console.log(memoizeddAdd(1, 2))
console.log(memoizeddAdd(3, 4))
console.log(memoizeddAdd(2, 3))