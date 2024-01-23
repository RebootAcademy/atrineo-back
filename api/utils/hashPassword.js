const { genSaltSync, hashSync } = require("bcrypt")

const hashPassword = (password) => {
  const salt = genSaltSync(parseInt(process.env.BCRYPT_SALTROUNDS))
  return hashSync(password, salt)
}

module.exports = {
  hashPassword
}