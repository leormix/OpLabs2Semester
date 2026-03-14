function memoizeLFU(fn, maxSize = Infinity) {
    const cache = new Map()
    return function (...args) {
        const key = JSON.stringify(args)



        if (cache.has(key)) {
            const item = cache.get(key)
            item.count += 1
            cache.delete(key)
            cache.set(key, item)
            return item.value;
        }

        const result = fn.apply(this, args)

        if (cache.size >= maxSize) {
            let minCount = Infinity;
            let keyToRemove = null;

            for (const [k, v] of cache.entries()) {
                if (v.count < minCount) {
                    minCount = v.count;
                    keyToRemove = k;
                }
            }

            if (keyToRemove !== null) {
                cache.delete(keyToRemove);
            }
        }

        cache.set(key, { value: result, count: 1 })
        return result;
    }
}

const slowAdd = (a, b) => {
    return a + b;
}

const memoizeddAdd = memoizeLFU(slowAdd, 2)

console.log(memoizeddAdd(1, 2))
console.log(memoizeddAdd(2, 3))
console.log(memoizeddAdd(1, 2))
console.log(memoizeddAdd(3, 4))
console.log(memoizeddAdd(2, 3))