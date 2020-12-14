function getMaxSubSum(array) {
    let maxSum = 0;
    let tempSum = 0;
    for (let item of array) {
        tempSum+=item;
        maxSum = Math.max(tempSum, maxSum);
        if (tempSum < 0)  tempSum = 0;
    }
    return maxSum;
}

console.log(getMaxSubSum([-1, 2, 3, -9]));
console.log(getMaxSubSum([2, -1, 2, 3, -9]));
console.log(getMaxSubSum([-1, 2, 3, -9, 11]));
console.log(getMaxSubSum([-2, -1, 1, 2]));
console.log(getMaxSubSum([100, -9, 2, -3, 5]));
console.log(getMaxSubSum([1, 2, 3]));