import { map } from 'lodash-es';
import tinycolor from 'tinycolor2';

const getCorrectIndex = number => number > 255 ? 255 : number < 0 ? 0 : number;

export default hash => {
    const [r, g, b] = hash
        .substr(0,3)
        .split('')
        .map(char => getCorrectIndex(char.charCodeAt(0)));
    return [
            tinycolor({r, g, b}).lighten(10).saturate(30).toHexString(),
            tinycolor({r, g, b}).lighten(50).saturate().toHexString()
    ];
}