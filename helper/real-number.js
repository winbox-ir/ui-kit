export const realNumber = (input) => {
    if (typeof input === "string") {
        return Number(input.replace(/,/g, ""));
    }
    return input;
};
