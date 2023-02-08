// console.log('Hello World')

//Write a JavaScript program that includes methods to do the following:

//Compute the ith Fibonacci number (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …)
function fib_check(num) {
    var fib_num = 2
    if (num == 0) {
        return fib_num - 2
      } else if (num == 1){
        return fib_num - 1
      } else {
        var old_fib = 1
        for (let i = 2; i < num; i++) {
            var tmp_fib = fib_num
            fib_num = old_fib + fib_num
            old_fib = tmp_fib
          }
      }
      var out = "Fib number for index " + num + ": " + fib_num
    return out;
  }

// Compute n! (factorial) for integer n ≥ 0
function factorial_check(num) {
    let out = num
    for (let i = num; i > 1; i--) {
        out = out * (i-1)
    }
    var fact = num + "!: " + out
    return fact;
  }
// Compute the sum of all integers between two given integers (inclusive)
function sum_check(num1, num2) {

    var bigger = num2
    var smaller = num1

    if (num2 == num1) {
        console.log("numbers equal")
        return bigger + smaller
    } else if (num2 > num1) {
        bigger = num2
        smaller = num1
    } else {
        smaller = num2
        bigger = num1
    }
    total = 0
    for (let i = bigger; i > smaller-1; i--) {
        total = total + (i)
    }
    var sum = "sum of all numbers between and including " + num2 + "-" + num1 + ": " + total
    return sum;
  }
// Given a number of cents, print to the browser console the corresponding U.S. coins that total to the given number.  
// Print the solution that needs the fewest coins.  Only use pennies, nickels, dimes, and quarters.  Example: for 113, the answer is “4 quarters”, “1 dime”, “3 pennies”.  
// Do not print the case where the solution calls for 0 of the coin (e.g. don’t print “0 nickels”).  Use the singular word if the value is 1, or the plural if the coin count is greater than 1.
function get_cents(amount) {
    var quarter_val = 25
    var dime_val = 10
    var nickel_val = 5
    var penny_val = 1
    if (amount == 0) {
        return "No coins are returned for 0"
    }
    var out_string = "Coins for: " + amount + ": "
    
    var remainder = amount

    var quarters = Math.floor(remainder / quarter_val)
    var remainder = remainder % quarter_val
    
    var dimes = Math.floor(remainder / dime_val)
    var remainder = remainder % dime_val
    
    var nickels = Math.floor(remainder / nickel_val)
    var remainder = remainder % nickel_val
    
    var pennies = Math.floor(remainder / penny_val)
    var remainder = remainder % penny_val

    if (quarters > 0) {
        out_string = out_string + quarters + " "
        if (quarters == 1){
            out_string = out_string + "quarter "
        }
        else {
            out_string = out_string + "quarters "
        }
        
    }

    if (dimes > 0) {
        out_string = out_string + dimes + " "
        if (dimes == 1){
            out_string = out_string + "dime "
        }
        else {
            out_string = out_string + "dimes "
        }
        
    }

    if (nickels > 0) {
        out_string = out_string + nickels + " "
        if (nickels == 1){
            out_string = out_string + "nickel "
        }
        else {
            out_string = out_string + "nickels "
        }
        
    }

    if (pennies > 0) {
        out_string = out_string + pennies + " "
        if (pennies == 1){
            out_string = out_string + "penny "
        }
        else {
            out_string = out_string + "pennies "
        }
        
    }

    

    return out_string;
}


// Feeling adventurous?  Hook up your code to a web interface that lets the user specify the inputs and invoke the various methods at the click of a button.

// Turn in on Learning Suite by submitting a PDF document of your web page that includes the JavaScript code for these four tasks.



console.log(fib_check(5))
console.log(factorial_check(6))
console.log(sum_check(6, 1))
console.log(get_cents(67))