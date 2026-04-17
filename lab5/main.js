function asyncMapCallback(array, asyncFn, done) {
    let results = [];
    let count = 0;

    if (array.length === 0) return done(null, results);

    for (let i = 0; i < array.length; i++) {
        asyncFn(array[i], (err, val) => {
            if (err) return done(err);

            results[i] = val;
            count++;

            if (count === array.length) done(null, results);
        });
    }
}

const data = [1, 2, 3];

function taskCb(item, cb) {
    setTimeout(() => cb(null, item * 10), 50);
}

asyncMapCallback(data, taskCb, (err, res) => {
    if (!err) console.log("Callback result:", res);
});