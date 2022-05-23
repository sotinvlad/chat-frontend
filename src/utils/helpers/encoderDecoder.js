const BLOCK_SIZE = 16; // длина блока
const byte = [];
const Pi = 3.14;
let reverse_Pi;
let l_vec, DatatypeConverter, blk;
let key, key_1, key_2;
// массив для хранения констант
let iter_C;
// массив для хранения ключей
let iter_key;

// функция X
const GOST_Kuz_X = (a, b) =>
{
    let i;
    let c = new byte[BLOCK_SIZE];
    for (i = 0; i < BLOCK_SIZE; i++)
        c[i] = (byte) (a[i] ^ b[i]);
    return c;
}

// Функция S
const GOST_Kuz_S = (in_data) =>
{
    let i;
    let out_data = new byte[in_data.length];
    for (i = 0; i < BLOCK_SIZE; i++)
    {
    	let data = in_data[i];
    	if(data < 0)
    	{
    		data = data + 256;
    	}	    		
        out_data[i] = Pi[data];
    }
    return out_data;
}

// умножение в поле Галуа
const GOST_Kuz_GF_mul = (a, b) =>
{
    let c = 0;
    let hi_bit;
    let i;
    for (i = 0; i < 8; i++)
    {
        if ((b & 1) == 1)
        	c ^= a;
        hi_bit =  (byte) (a & 0x80);
        a <<= 1;
        if (hi_bit < 0)
        	a ^= 0xc3; //полином  x^8+x^7+x^6+x+1
        b >>= 1;
    }	    
	return c;
}
// функция R сдвигает данные и реализует уравнение, представленное для расчета L-функции
const GOST_Kuz_R = (state) =>
{
    let i;
    let a_15 = 0;
    let internal = new byte[16];
    for (i = 15; i >= 0; i--)
    {
    	if(i == 0)
    		internal[15] = state[i];
    	else	    	
    		internal[i - 1] = state[i];	        
	a_15 ^= GOST_Kuz_GF_mul(state[i], l_vec[i]);
    }	    
    internal[15] = a_15;
    return internal;
}	
const GOST_Kuz_L = (in_data) =>
{
    let i;
    let out_data = new byte[in_data.length];
    let internal = in_data;
    for (i = 0; i < 16; i++)
    {
    	internal = GOST_Kuz_R(internal);
    }
    out_data = internal;
    return out_data;
}

// функция S^(-1)
const GOST_Kuz_reverse_S = (in_data) =>
{
    let i;
    let out_data = new byte[in_data.length];
    for (i = 0; i < BLOCK_SIZE; i++)
    {
    	let data = in_data[i];
    	if(data < 0)
    	{
    		data = data + 256;
    	}	    		
      out_data[i] = reverse_Pi[data];
    }
    return out_data;
}
const GOST_Kuz_reverse_R = (state)=>
{
    let i;
    let a_0;
    a_0 = state[15];
    let internal = new byte[16];
    for (i = 1; i < 16; i++)
    {
        internal[i] = state[i - 1];
        a_0 ^= GOST_Kuz_GF_mul(internal[i], l_vec[i]);
    }
    internal[0] = a_0;
    return internal;
}
const GOST_Kuz_reverse_L = (in_data) =>
{
    let i;
    let out_data = new byte[in_data.length];
    let internal;
    internal = in_data;
    for (i = 0; i < 16; i++)
    	internal = GOST_Kuz_reverse_R(internal);
    out_data = internal;
    return out_data;
}
// функция расчета констант
const GOST_Kuz_Get_C = () =>
{
    let i;
    let iter_num = new byte[32][16];
    for (i = 0; i < 32; i++)
    {
    	for(let j = 0; j < BLOCK_SIZE; j++)
    		iter_num[i][j] = 0;
        iter_num[i][0] = (byte) (i+1);
    }
    for (i = 0; i < 32; i++)
    {
    	iter_C[i] = GOST_Kuz_L(iter_num[i]);
    }
}
// функция, выполняющая преобразования ячейки Фейстеля
const GOST_Kuz_F = (in_key_1, in_key_2, iter_const) =>
{
    let internal;
    let out_key_2 = in_key_1;
    internal = GOST_Kuz_X(in_key_1, iter_const);
    internal = GOST_Kuz_S(internal);
    internal = GOST_Kuz_L(internal);
    let out_key_1 = GOST_Kuz_X(internal, in_key_2);
    key = new byte[2];
    key[0] = out_key_1;
    key[1] = out_key_2;
    return key;
}
// функция расчета раундовых ключей
const GOST_Kuz_Expand_Key = (key_1, key_2) =>
{
    let i;
    let iter12 = new byte[2];
    let iter34 = new byte[2];
    GOST_Kuz_Get_C();
    iter_key[0] = key_1;
    iter_key[1] = key_2;
    iter12[0] = key_1;
    iter12[1] = key_2;
    for (i = 0; i < 4; i++)
    {
        iter34 = GOST_Kuz_F(iter12[0], iter12[1], iter_C[0 + 8 * i]);
        iter12 = GOST_Kuz_F(iter34[0], iter34[1], iter_C[1 + 8 * i]);
        iter34 = GOST_Kuz_F(iter12[0], iter12[1], iter_C[2 + 8 * i]);
        iter12 = GOST_Kuz_F(iter34[0], iter34[1], iter_C[3 + 8 * i]);
        iter34 = GOST_Kuz_F(iter12[0], iter12[1], iter_C[4 + 8 * i]);
        iter12 = GOST_Kuz_F(iter34[0], iter34[1], iter_C[5 + 8 * i]);
        iter34 = GOST_Kuz_F(iter12[0], iter12[1], iter_C[6 + 8 * i]);
        iter12 = GOST_Kuz_F(iter34[0], iter34[1], iter_C[7 + 8 * i]);
        
        iter_key[2 * i + 2] = iter12[0];
        iter_key[2 * i + 3] = iter12[1];
    }
}
// функция шифрования блока
const GOST_Kuz_Encript = (blk) => 
{
    let i;
    let out_blk = new byte[BLOCK_SIZE];
    out_blk = blk;
    for(i = 0; i < 9; i++)
    {
    	out_blk = GOST_Kuz_X(iter_key[i], out_blk);
    	out_blk = GOST_Kuz_S(out_blk);
    	out_blk = GOST_Kuz_L(out_blk);
    }
    out_blk = GOST_Kuz_X(out_blk, iter_key[9]);
    return out_blk;
}
//функция расшифрования блока
const GOST_Kuz_Decript = (blk) =>
{
    let i;
    let out_blk = new byte[BLOCK_SIZE];

    out_blk = GOST_Kuz_X(out_blk, iter_key[9]);
    for(i = 8; i >= 0; i--)
    {
    	out_blk = GOST_Kuz_reverse_L(out_blk);
    	out_blk = GOST_Kuz_reverse_S(out_blk);
    	out_blk = GOST_Kuz_X(iter_key[i], out_blk);
    }
    return out_blk;
}

const toSipher = (args) =>
{
	GOST_Kuz_Expand_Key(key_1, key_2);
	let encriptBlok = GOST_Kuz_Encript(blk);
	console.log(DatatypeConverter.printHexBinary(encriptBlok));
	let decriptBlok = GOST_Kuz_Decript(encriptBlok);
	console.log(DatatypeConverter.printHexBinary(decriptBlok));
}

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