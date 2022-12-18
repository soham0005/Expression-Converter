
let postfixBtn = document.getElementById("postfix");
let prefixBtn = document.getElementById("prefix");





prefixBtn.addEventListener('click', function () {
  let infix = document.getElementById("myInput").value;

  if (!infix) {
    alert("Input Cannot be empty");
  }
  else {  
    infixToPrefix(infix);
  }
})




postfixBtn.addEventListener('click', function () {

  let infix = document.getElementById("myInput").value;

  if (!infix) {
    alert("Input Cannot be empty");
  }
  else {
    infixToPostfixRe(infix);
  }
});





function infixToPrefix(infix) {

  function getPriority(C) {
    if (C == '-' || C == '+')
      return 1;
    else if (C == '*' || C == '/')
      return 2;
    else if (C == '^')
      return 3;
    return 0;
  }



  function isOperator(c) {
    return (!(c >= 'a' && c <= 'z') &&
      !(c >= '0' && c <= '9') &&
      !(c >= 'A' && c <= 'Z'));
  }
  // stack for operators.
  let operators = [];

  let operands = [];

  for (let i = 0; i < infix.length; i++) {


    if (infix[i] == '(') {
      operators.push(infix[i]);
    }

    else if (infix[i] == ')') {
      while (operators.length != 0 &&
        operators[operators.length - 1] != '(') {


        let op1 = operands.pop();


        let op2 = operands.pop();



        let op = operators.pop();


        let tmp = op + op2 + op1;
        operands.push(tmp);
      }


      operators.pop();
    }


    else if (!isOperator(infix[i])) {
      operands.push(infix[i] + "");
    }


    else {
      while (operators.length &&
        getPriority(infix[i]) <=
        getPriority(operators[operators.length - 1])) {

        let op1 = operands.pop();


        let op2 = operands.pop();


        let op = operators.pop();


        let tmp = op + op2 + op1;
        operands.push(tmp);
      }

      operators.push(infix[i]);
    }
  }


  while (operators.length != 0) {
    let op1 = operands.pop();


    let op2 = operands.pop();


    let op = operators.pop();


    let tmp = op + op2 + op1;
    operands.push(tmp);
  }
  let result=operands[operands.length-1];
  let prefixLabel = document.getElementById("prefixLabel");
  prefixLabel.removeAttribute("hidden");
  prefixLabel.innerHTML = result;
  // console.log(operands[operands.length - 1]);
  // return operands[operands.length - 1];
}












Array.prototype.peek = function () {
  return this[this.length - 1];
};
function infixToPostfixRe(reStr, dontPrint) {

  var output = [];
  var stack = [];

  for (var k = 0, length = reStr.length; k < length; k++) {
    var c = reStr[k];
    if (c == '(')
      stack.push(c);

    else if (c == ')') {
      while (stack.peek() != '(') {
        output.push(stack.pop())
      }
      stack.pop();
    }


    else {
      while (stack.length) {
        var peekedChar = stack.peek();

        var peekedCharPrecedence = precedenceOf(peekedChar);
        var currentCharPrecedence = precedenceOf(c);

        if (peekedCharPrecedence >= currentCharPrecedence) {
          output.push(stack.pop());
        } else {
          break;
        }
      }
      stack.push(c);
    }

  } // end for loop

  while (stack.length)
    output.push(stack.pop());

  var result = output.join("");
  //print result on html page
  let postfixLabel = document.getElementById("postfixLabel");
  postfixLabel.removeAttribute("hidden");
  postfixLabel.innerHTML = result;

  !dontPrint && console.log(reStr, "=>", result);

  return result;

}

var precedenceMap = {
  '(': 1,
  '|': 2, // alternate
  '.': 3, // concatenate

  '?': 4, // zero or one
  '*': 4, // zero or more
  '+': 4, // one or more

  '^': 5 // complement

};

function precedenceOf(c) {
  return precedenceMap[c] || 6;
}

  // "(A + B) * (C + D)"