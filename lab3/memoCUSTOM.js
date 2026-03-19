function memoizeCustom(fn, maxSize, evictor) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);

    if (cache.size > maxSize) {
      const keyToRemove = evictor(cache);
      
      if (keyToRemove !== null && keyToRemove !== undefined) {
        cache.delete(keyToRemove);
      }
    }

    return result;
  };
}

const randomEvictor = (cacheMap) => {
  const keys = Array.from(cacheMap.keys());
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
};

const slowAdd = (a, b) => {
  return a + b;
};

const memoizedAdd = memoizeCustom(slowAdd, 2, randomEvictor);

console.log(memoizedAdd(1, 2));
console.log(memoizedAdd(2, 3));
console.log(memoizedAdd(3, 4));
console.log(memoizedAdd(1, 2));

