const bcrypt = require('bcryptjs');

const passwordHashFunction = async (password) => {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

const passwordCompare = async (password, hashPassword) => {
    isMatch = await bcrypt.compare(password, hashPassword);

    return isMatch;
}

module.exports = { passwordHashFunction, passwordCompare };