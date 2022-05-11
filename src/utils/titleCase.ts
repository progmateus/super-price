export const titleCase = text => {
    return text.toLowerCase()
        .split(' ')
        .map((word) => {
            return word[0].toUpperCase() + word.slice(1);
        }).join(' ')
}