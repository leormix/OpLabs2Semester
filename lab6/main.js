async function* generateLargeData(totalRecords, batchSize) {
  let index = 0;
  while (index < totalRecords) {
    const batch = [];
    const limit = Math.min(index + batchSize, totalRecords);
    for (let i = index; i < limit; i++) {
      batch.push({
        id: i,
        value: Math.random().toString(36).substring(7),
        processed: false
      });
    }
    index = limit;
    yield batch;
    await new Promise(resolve => setImmediate(resolve));
  }
}

module.exports = { generateLargeData };
