"use strict";
window.toolbox = window.toolbox || {};

// Exercise 2. Function Functions
// Before you attempt these read Eloquent JavaScript's chapter "Higher Order Functions:"
// http://eloquentjavascript.net/05_higher_order.html

// JavaScript is a functional language. This means we can do with functions
// many of the things we can do with numbers, strings or arrays. We can assign
// functions to variables, pass functions as arguments to other functions and
// return functions from functions.
//
// Using functions inside other functions is confusing at first and gets easier
// with practice.

// Example 2.1 run(fun)
// This is a function that takes a function ‘fun’, calls the function and
// returns its return value.
//
// "calling" a function is the same as "running" or "executing" a function.
// Sometimes if we want to be really high-brow, we may even call function calls
// function "invokation." It all means the same thing.
//
// In JavaScript, we call functions by adding parentheses after them ().
// What happens why we try to call something that's not a function?
// Uncomment the next line and find out:
// run(1)
// ex.
// function oneReturner() {
//   return 1;
// }
// run(oneReturner) -> 1
// ex. another way of saying the same thing as above
// run(function() { return 1; }) -> 1
toolbox.run = function(fun) {
  return fun();
}

// Exercise 2.2 runOneAfterAnother(fun1, fun2)
// Write a function that takes two functions fun1, fun2 and calls fun1 then fun2.
// ex.
// function logA() {
//  console.log('A')
// }
// function logB() {
//  console.log('B')
// }
// runOneAfterAnother(logA, logB) -> outputs to console 'A' followed by 'B'
toolbox.runOneAfterAnother = function(fun1, fun2) {
  // YOUR CODE HERE
  fun1()
  fun2()
}

// Example 2.3 getDoubler()
// This is a function that returns a function that takes a number n
// and returns n * 2.
// Note how we have two return statements in the code! Why is that?
// Try adding console.log() statements to find out.
// ex.
//  var doubler = getDoubler();
//  doubler(2) -> 4
// ex.
//  getDoubler()(2) -> 4
// ex.
//  getDoubler()(7) -> 14
toolbox.getDoubler = function() {
  return function(m) { // first return
    return m * 2; // second return
  }
}

// Exercise 2.4 getMultiplier(n)
// Write a function that takes a number n and returns a function that takes a
// number m and returns n * m.
// Your solution will probably look similar to getDoubler().
// ex.
//  var multiplyBy2 = getMultiplier(2);
//  multiplyBy2(3) -> 6
// ex.
//  getMultiplier(3)(4) -> 12
toolbox.getMultiplier = function(n) {
  // YOUR CODE HERE
  var multiply = function (m) {
    return m*n
  }
  return multiply
}

// Example 2.5 once(f)
// This is a function that takes a function f and returns a function g.
// When you call g() it calls f() once and only once. No matter how many times you call
// g(), f() should only be called once.
// ex.
//  function log() {
//    console.log('called log');
//  }
//  var onceLog = once(log);
//  onceLog(); -> outputs 'called log' to console
//  onceLog(); -> does nothing
//  onceLog(); -> does nothing
toolbox.once = function(f) {
  var called = false; // Let's create a local variable to track if f has been called
  return function() {
    if (! called) { // if f hasn't been called yet
      f(); // call f
      called = true; // mark f as called
    }
  }
}

// Exercise 2.6 only(n, f)
// Write a function that takes a number n and a function f, and returns a function g.
// When you call g() it calls f() at most n times.
// So if n is 1, then this behaves exactly the same as once().
// Your solution will probably look similar to once().
// ex.
//  function log() {
//    console.log('called log');
//  }
//  var onlyLog = only(3, log);
//  onlyLog(); -> outputs 'called log' to console
//  onlyLog(); -> outputs 'called log' to console
//  onlyLog(); -> outputs 'called log' to console
//  onlyLog(); -> does nothing
//  onlyLog(); -> does nothing
toolbox.only = function(n, f) {
  // YOUR CODE HERE
  var called = 0
  return function() {
      if (called < n) {
        f()
        called++
      }
  }
}
