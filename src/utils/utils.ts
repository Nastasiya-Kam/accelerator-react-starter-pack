const numberWithSpaces = (integerNumber: number): string => integerNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export { numberWithSpaces };
