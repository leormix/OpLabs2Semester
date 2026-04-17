const unsortedArr = [31, 27, 28, 42, 13, 8, 11, 30, 17, 41, 15, 43, 1, 36, 9, 16, 20, 35, 48, 37, 7, 26, 34, 21, 22, 6, 29, 32, 49, 10,
    12, 19, 24, 38, 5, 14, 44, 40, 3, 50, 46, 25, 18, 33, 47, 4, 45, 39, 23, 2];

// const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
//     33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

function linearSearch(arr, target) {

    let steps = 0
    arr = arr.sort((a, b) => a - b)

    for (let i = 0; i < arr.length; i++) {
        steps++

        if (arr[i] === target) {
            return `Found ${target}, at ${steps} steps`;
        }
    }

    return `${target} not found`
}

function binarySearch(arr, target) {
    let start = 0
    let end = arr.length - 1
    let steps = 0
    let center = Math.floor((start + end) / 2)

    for (let i = 0; i < end; i++) {
        if (arr[center] !== target) {
            arr[center] > target ? end = center : start = center;
            center = Math.floor((start + end) / 2)
            steps++
        }

        if (arr[center] === target) return `${target} found in ${steps} steps`
    }
    return `Not found ${target}`
}

console.log(linearSearch(unsortedArr, 28))
console.log(binarySearch(unsortedArr, 28))