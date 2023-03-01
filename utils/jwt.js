const jwt = require('jsonwebtoken');

export function signJwt(payload, secret, expiresIn) {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyJwt(token, secret) {
  return jwt.decode(token, secret);
}

export function refreshJwt(token, secret, expiresIn) {
  const payload = jwt.decode(token);
  return signJwt(payload, secret, expiresIn);
}
