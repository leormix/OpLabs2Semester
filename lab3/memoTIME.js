function memoizeTime(fn, ttl) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);
        const now = Date.now();

        if (cache.has(key)) {
            const item = cache.get(key);

            if (now < item.expiry) {
                return item.value;
            }

            cache.delete(key);
        }

        const result = fn.apply(this, args);

        cache.set(key, {
            value: result,
            expiry: now + ttl
        });

        return result;
    };
}