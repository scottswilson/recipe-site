
export const getLoginInfo = async (formData) => {
  let info = {
    user: formData.username,
    pass: "",
  }

  const saltedPass = info.user + "<>" + +formData.password;

  const textEncoder = new TextEncoder();
  const data = textEncoder.encode(saltedPass);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  info.pass = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return info;
};