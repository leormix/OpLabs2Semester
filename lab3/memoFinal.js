function memoize(fn, options = {}) {
    const policy = options.policy || 'unlimited';
    const maxSize = options.maxSize || Infinity;
    const ttl = options.ttl || 0;
    const customEvictor = options.customEvictor || null;

    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);
        const now = Date.now();

        if (cache.has(key)) {
            if (policy === 'time') {
                const item = cache.get(key);
                if (now < item.expiry) {
                    return item.value;
                }
                cache.delete(key);
            } else if (policy === 'lru') {
                const value = cache.get(key);
                cache.delete(key);
                cache.set(key, value);
                return value;
            } else if (policy === 'lfu') {
                const item = cache.get(key);
                item.count += 1;
                cache.delete(key);
                cache.set(key, item);
                return item.value;
            } else {
                return cache.get(key);
            }
        }

        const result = fn.apply(this, args);

        if (policy === 'time') {
            cache.set(key, { value: result, expiry: now + ttl });
        } else if (policy === 'lfu') {
            cache.set(key, { value: result, count: 1 });
        } else {
            cache.set(key, result);
        }

        if (cache.size > maxSize) {
            let keyToRemove = null;

            if (policy === 'lru' || policy === 'unlimited') {
                keyToRemove = cache.keys().next().value;
            } else if (policy === 'lfu') {
                let minCount = Infinity;
                for (const [k, v] of cache.entries()) {
                    if (v.count < minCount) {
                        minCount = v.count;
                        keyToRemove = k;
                    }
                }
            } else if (policy === 'custom' && typeof customEvictor === 'function') {
                keyToRemove = customEvictor(cache);
            }

            if (keyToRemove !== null) {
                cache.delete(keyToRemove);
            }
        }

        return result;
    };
}

const slowAdd = (a, b) => {
    return a + b;
};


const memoizedLRU = memoize(slowAdd, { policy: 'lru', maxSize: 2 });
console.log(memoizedLRU(1, 2));
console.log(memoizedLRU(2, 3));
console.log(memoizedLRU(1, 2));
console.log(memoizedLRU(3, 4));
console.log(memoizedLRU(2, 3));

const memoizedLFU = memoize(slowAdd, { policy: 'lfu', maxSize: 2 });
console.log(memoizedLFU(1, 2));
console.log(memoizedLFU(2, 3));
console.log(memoizedLFU(1, 2));
console.log(memoizedLFU(3, 4));
console.log(memoizedLFU(2, 3));

const randomEvictor = (cacheMap) => {
    const keys = Array.from(cacheMap.keys());
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
};
const memoizedCustom = memoize(slowAdd, { policy: 'custom', maxSize: 2, customEvictor: randomEvictor });
console.log(memoizedCustom(1, 2));
console.log(memoizedCustom(2, 3));
console.log(memoizedCustom(3, 4));
console.log(memoizedCustom(1, 2));

const memoizedTime = memoize(slowAdd, { policy: 'time', ttl: 1000 });
console.log(memoizedTime(1, 2));
console.log(memoizedTime(1, 2));
setTimeout(() => {
    console.log(memoizedTime(1, 2));
}, 1500);
