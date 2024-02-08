// without length = 3to6
function generateRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
  if (length < 2 || length === undefined || length === null) {
    length = Math.floor(Math.random() * 4) + 3; // 3 to 6
  }
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

module.exports = generateRandomString;
