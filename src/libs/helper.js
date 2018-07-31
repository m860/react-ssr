export async function forEachAsync(arr, callback) {
    let i = 0;
    let len = arr.length;
    for (; i < len; i++) {
        await callback(arr[i], i, arr);
    }
}