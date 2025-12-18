const { add, subtract, multiply, divide } = require('./calculator');

console.log('Testing calculator...');
console.log('add(2, 3) =', add(2, 3)); // Should be 5
console.log('subtract(5, 2) =', subtract(5, 2)); // Should be 3
console.log('multiply(3, 4) =', multiply(3, 4)); // Should be 12
console.log('divide(10, 2) =', divide(10, 2)); // Should be 5
console.log('divide(10, 0) =', divide(10, 0)); // BUG: Returns Infinity, should throw error
