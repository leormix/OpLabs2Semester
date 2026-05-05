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

async function processDataStream() {
  const totalRecords = 100000;
  const batchSize = 5000;
  
  const dataStream = generateLargeData(totalRecords, batchSize);
  let processedCount = 0;

  for await (const batch of dataStream) {
    const processedBatch = batch.map(record => {
      return {
        id: record.id,
        value: record.value.toUpperCase(),
        processed: true
      };
    });

    processedCount += processedBatch.length;
    console.log(`Processed ${processedCount} out of ${totalRecords} records`);
  }

  console.log('All data processed successfully.');
}

processDataStream().catch(console.error);
