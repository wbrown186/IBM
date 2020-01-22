
function getInput() {
    const inputNumbers = document.getElementsByName('inputNumbers')[0].value;
    const separatedNumbers = inputNumbers.split(' ');
    if(separatedNumbers.length === 3) {
        makeList(separatedNumbers);
    } else {
        const message = separatedNumbers.length < 3 ? 'Not enough numbers were entered.' : 'Too many numbers were entered.';
        printResult('warning', message);
    }
}

function makeList(separatedNumbers) {
    const errors = [];
    const endInteger = validateInput(separatedNumbers[0], false, 1, errors);
    const watInteger = validateInput(separatedNumbers[1], true, 2, errors);
    const sonInteger = validateInput(separatedNumbers[2], true, 3, errors);

    if(watInteger > 0 && watInteger === sonInteger) {
        errors.push('The numbers at positions 2 and 3 cannot be the same.');
    }

    if(errors.length === 0) {
        let count = 1;
        let list = '';
        while(count <= endInteger) {
            let watson = '';
            const countString = count.toString();
            if(count%watInteger === 0 && countString.search(watInteger) === -1) {
                watson = 'WAT';
            }
            if(count%sonInteger === 0 && countString.search(sonInteger) === -1) {
                watson += 'SON';
            }
            list = watson !== '' ? `${list} ${watson}` : `${list} ${count}`;
            count++;
        }
        printResult('success', list);
    } else {
        let message = '';
        errors.forEach(error => {
            message = `${message} <p>${error}</p>`;
        });
        printResult('warning', message);
    }
}

function validateInput(fieldValue, hasMax, position, errors) {
    const value = parseInt(fieldValue, 10);
    if(isNaN(value)) {
        errors.push(`The value at position ${position} is not a number.`);
        return -1;
    }

    if(value < 2) {
        errors.push(`The value at position ${position} is too low.`);
        return -1;
    }

    if(hasMax && value > 9) {
        errors.push(`The value at position ${position} is too high.`);
        return -1;
    }
    return value;
}

function printResult(status, message) {
    const result = document.getElementsByName('result')[0];
    result.className = `alert alert-${status}`;
    result.innerHTML = message;
}


