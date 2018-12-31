"use strict";

// setup
var today = new Date(Date.now())
today = today.toLocaleDateString()
today = today.split('/')
if (today[0] < 10) {
  today[0] = '0' + today[0]
}
if (today[1] < 10) {
  today[1] = '0' + today[1]
}
today = today.join('')
today = today.split('')

today.forEach(function(num) {
  $('#numbers').append('<div class="number">' + num + '</div>')
})

var operand1;
var operand2;
var operation;

function evaluate() {
  debugger
  if (operand1.text()[1] === '/') {
    operand1.text(parseFloat(operand1.text()[0]) / parseFloat(operand1.text()[2]))
  }
  if (operand2[1] === '/') {
    operand1.text(parseFloat(operand2.text()[0]) / parseFloat(operand2.text()[2]))
  }
  var answer;
  switch (operation) {
    case '+':
    answer = parseFloat(operand1.text()) + parseFloat(operand2.text());
    break;
    case '-':
    answer = parseFloat(operand1.text()) - parseFloat(operand2.text());
    break;
    case 'x':
    answer = parseFloat(operand1.text()) * parseFloat(operand2.text());
    break;
    case '÷':
    answer = parseFloat(operand1.text()) / parseFloat(operand2.text());
    if (answer === (2/3)) {
      answer = '2/3'
    } else if (answer === (1/3)) {
      answer = '1/3'
    } else if (answer === 0.25 || answer === 0.75) {
      answer = answer/0.25 + '/4'
    } else if (answer === 0.5) {
      answer = '1/2'
    }
    break;
    default:
    $('body').append("<p class='error'>Something seems to have went wrong. Please refresh the page</p>")
  }
  debugger
  var newNumHtml = "<div class='number'>" + answer + "</div>"
  $(operand1).before(newNumHtml)
  $(operand1).remove();
  $(operand2).remove();
  operand1 = null;
  operand2 = null;
  operation = null;
}

$('#numbers').on('click', '.number', function() {
  if (!(operand1 || operation || operand2)) {
    $('.error').hide()
    operand1 = $(this);
    $(this).addClass('number-selected')
  } else if (operand1 && operation && !operand2) {
    if ($(this).index() === operand1.index()+1) {
      $('.error').hide()
      operand2 = $(this)
      $(this).addClass('number-selected')
      evaluate()
    }
  } else {
    debugger
    $('body').append("<p class='error'>Please select an operation after selecting your first number</p>")
  }
})

$('#operations *').on('click', function() {
  if (operand1 && !operation && !operand2) {
    $('.error').hide()
    debugger
    operation = $(this).text()
    $(this).addClass('operation-selected')
  } else {
    debugger
    $('body').append("<p class='error'>Please select a number</p>")
  }
})
