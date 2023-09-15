const { validate: expressValidate } = require("express-validation");
const bcrypt = require("bcrypt");
function validate(schema) {
    return expressValidate(schema, { keyByField: true }, { abortEarly: false, errors: { wrap: { label: false } } });
}

async function generatePassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function comparePassword(password, passwordHash) {
    const validPassword = await bcrypt.compare(password, passwordHash);
    if (validPassword) {
        return true;
    } else {
        return false;
    }
}

const validateName =(value, helpers) => {
    let invalid_char_index = [...value]
        .findIndex((c) => !/\s+/.test(c) && c.toLowerCase() === c.toUpperCase());
    return invalid_char_index < 0 ? value : helpers
        .string();
}

module.exports = {
    validate,
    generatePassword,
    comparePassword,
    validateName
};
