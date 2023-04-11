const bcrypt = require('bcrypt');

// Define a salt rounds constant
const saltRounds = 10;

// Define a function that takes a plain text password and returns a hashed password
export function hashPassword(password) {
  // Generate a salt using the salt rounds constant
  const salt = bcrypt.genSaltSync(saltRounds);
  // Hash the password using the salt
  const hash = bcrypt.hashSync(password, salt);
  // Return the hashed password
  return hash;
}

// Define a function that takes a plain text password and a hashed password and returns true if they match or false otherwise
export function verifyPassword(password, hash) {
  // Compare the password and the hash using bcrypt
  const match = bcrypt.compareSync(password, hash);
  // Return the result of the comparison
  return match;
}