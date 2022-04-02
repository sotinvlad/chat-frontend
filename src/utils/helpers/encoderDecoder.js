const stepToAnotherRail = (direction, indexOfCurrentRail, numberOfRails) => {
    if (indexOfCurrentRail === numberOfRails - 1) {
        direction = 'UP';
        indexOfCurrentRail -= 1;
        return [direction, indexOfCurrentRail];
    }
    if (indexOfCurrentRail === 0) {
        direction = 'DOWN';
        indexOfCurrentRail += 1;
        return [direction, indexOfCurrentRail];
    }
    if (direction === 'DOWN') {
        indexOfCurrentRail += 1;
    } else {
        indexOfCurrentRail -= 1;
    }
    return [direction, indexOfCurrentRail];
}

const makeStringFromArrayOfRails = (arrayOfRails) => {
    let string = '';
    arrayOfRails.forEach(a => string += a.join(''));
    return string;
}

export const encodeRailFenceCipher = (string, numberOfRails) => {
    let arrayOfRails = Array(numberOfRails).fill().map(a => []);
    let direction = 'DOWN';
    let indexOfCurrentRail = 0;
    let symbolsOfString = string.split('');
    for (let i = 0; i < symbolsOfString.length; i++) {
        arrayOfRails[indexOfCurrentRail].push(symbolsOfString[i]);
        [direction, indexOfCurrentRail] = stepToAnotherRail(direction, indexOfCurrentRail, numberOfRails);
    }
    return makeStringFromArrayOfRails(arrayOfRails);
}

const getSizesOfArraysOfRails = (lengthOfString, numberOfRails) => {
    let result = Array(numberOfRails);
    let symbolsInOneCycle = 2 + (numberOfRails - 2) * 2;
    let wholePart = Math.floor(lengthOfString / symbolsInOneCycle);
    for (let i = 0; i < numberOfRails; i++) {
        if (i === 0 || i === numberOfRails - 1) {
            result[i] = wholePart;
        } else {
            result[i] = wholePart * 2;
        }
    }
    let remainderFromDivision = lengthOfString % symbolsInOneCycle;
    for (let i = 0; i < remainderFromDivision; i++) {
        if (i <= numberOfRails - 1) {
            result[i]++;
        } else {
            result[2 * numberOfRails - i - 2]++;
        }
    }
    return result;
}

export const decodeRailFenceCipher = (string, numberOfRails) => {
    let decipheredString = '';
    let symbolsOfCypher = string.split('');
    let sizesOfArraysOfRails = getSizesOfArraysOfRails(string.length, numberOfRails);
    let arrayOfRails = Array(numberOfRails).fill().map(a => []);
    let symbolsCounted = 0;
    for (let i = 0; i < sizesOfArraysOfRails.length; i++) {
        arrayOfRails[i] = symbolsOfCypher.slice(symbolsCounted, sizesOfArraysOfRails[i] + symbolsCounted);
        symbolsCounted += sizesOfArraysOfRails[i];
    }
    for (let i = 0; i < numberOfRails; i++) {
        arrayOfRails[i].reverse();
    }
    let direction = 'DOWN';
    let indexOfCurrentRail = 0;
    for (let i = 0; i < string.length; i++) {
        decipheredString += arrayOfRails[indexOfCurrentRail].pop();
        [direction, indexOfCurrentRail] = stepToAnotherRail(direction, indexOfCurrentRail, numberOfRails);
    }
    return decipheredString;
}

