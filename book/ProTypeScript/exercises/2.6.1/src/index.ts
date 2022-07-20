const start = 1;
const end = 100;

let result = "";

for (let index = start; index <= end; index++) {
    const isMultipleOf3 = ((index % 3) === 0)
    const isMultipleOf5 = ((index % 5) === 0)

    if (isMultipleOf3 && isMultipleOf5) {
        // 3 の倍数であり、5 の倍数でもある
        // console.log("FizzBuzz");
        result += "FizzBuzz"
    } else if (isMultipleOf3) {
        // 3 の倍数であり、5 の倍数でない
        // console.log("Fizz");
        result += "Fizz"
    } else if (isMultipleOf5) {
        // 5 の倍数であり、3 の倍数でない
        // console.log("Buzz");
        result += "Buzz"
    } else {
        // 3 の倍数でなく、5 の倍数でもない
        // console.log(index);
        result += String(index)
    }
    result += " "
}

console.log(result);
