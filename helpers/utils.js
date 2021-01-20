const removeSpaces = (text) => {
    text = String(text);
    return text.trim();
}

const allPropsFilled = (item, model) => {
    const {id, ...props} = model;
    const itemKeys = Object.keys(item);
    const modelKeys = Object.keys(props);
    const isSameKeys = JSON.stringify(itemKeys) === JSON.stringify(modelKeys);
    
    return isSameKeys;
}

exports.removeSpaces = removeSpaces;
exports.allPropsFilled = allPropsFilled;