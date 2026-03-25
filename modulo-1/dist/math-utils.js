// Media Aritmetica
export default function mediaAritmetica(array) {
    if (array.length === 0 || array === null) {
        return null;
    }
    let i = 0;
    array.forEach(num => i += num);
    return i / array.length;
}
//console.log(mediaAritmetica([1, 2, 3, 4, 5]));
//# sourceMappingURL=math-utils.js.map