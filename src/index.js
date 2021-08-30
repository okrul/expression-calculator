function eval() {
    // Do not use eval!!!
    return;
}

const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y
}

const prior = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '(': 3,
    ')': 3
} 


function expressionCalculator(expr) {
    let arr = expr.split('');
    let outputArr = [];
    let stack  = [];

    let currStr = '';
    
    arr.forEach(key => {
        if (key in prior) {
            if (currStr != '') {
                outputArr.push(parseFloat(currStr));
                currStr = '';
            }

            if (key == '(') {
                stack.push(key);     
            }
            else if (key == ')') {
                
                while (stack.length > 0 & stack[stack.length-1] != '(') {
                    outputArr.push(stack.pop()); 
                } 
                if (stack.length == 0) {
                    throw new SyntaxError('ExpressionError: Brackets must be paired'); 
                }
                stack.pop(); 
            }

            else if (stack.length > 0 & prior[key] <= prior[stack[stack.length-1]]) {
                outputArr.push(stack.pop());
                stack.push(key);
            }
            
            else {
                stack.push(key);
            }

        }

        else if (key != ' ') {
            currStr = currStr + key;
        }
    });

    if (stack.indexOf('(') > -1 || outputArr.indexOf('(') > -1) {
        throw new SyntaxError('ExpressionError: Brackets must be paired'); 
    } 

    console.log(outputArr[outputArr.length -1]);
    console.log(currStr);

    if (currStr != '') {
        outputArr.push(parseFloat(currStr));
    }

    console.log(outputArr[outputArr.length -1]);

    while (stack.length > 0) {
        key = stack.pop(); 
        if (key in operators) {
            outputArr.push(key);
        }
    }

    console.log('----------------------------------');
    outputArr.forEach(key => {
       
        console.log(key);
        if (key in operators) {
            let [y, x] = [stack.pop(), stack.pop()];
            if (key == '/' & y == 0) {
                throw new SyntaxError('TypeError: Division by zero.');
            }
            stack.push(operators[key](x, y));
        }
        else {
            stack.push(key);        
        }
    });

    return stack[0];

}


module.exports = {
    expressionCalculator
}