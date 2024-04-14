const convertToTriades = (num: number | string) => {
    return (num.toString().split("").reverse().join("").match(/.{1,3}/g) || []).join(" ").split('').reverse().join('');
}

export default convertToTriades
