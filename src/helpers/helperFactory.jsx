export const currencyFormat = (numStr) => {
    // Split the string into whole and decimal parts
    let [integer, decimal] = numStr.split('.');
    // Insert commas into the integer part
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimal ? `${integer}.${decimal}` : integer;
};

export const formatString = (str) => {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
