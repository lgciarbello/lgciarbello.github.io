let operation = [];
let clickedDot;

function onNumberClick(value) {
    operation += value;
    document.getElementById('visor').value = operation;
}

function computeOperation(){
    operation = eval(operation);
    document.getElementById('visor').value = operation;
}

function validateOperation(op) {
    operationList = ['+', '-', '*', '/'];
    if(operation.length > 0  && !operationList.includes(operation.charAt(operation.length - 1))){
        onNumberClick(op);
    }
}

function clearOperation(value) {
    if(value == 'CE'){
        operation = [];
        document.getElementById('visor').value = 0;
    }else{
        operation = operation.toString().slice(0, -1);
        document.getElementById('visor').value = operation;
    }
}