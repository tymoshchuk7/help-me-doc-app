import aes from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';

const encryptionClient = {
  encryptMessage: (text: string) => {
    const key = import.meta.env.VITE_ENCRYPTION_KEY;
    const encrypt = aes.encrypt(text, key);
    return encrypt.toString();
  },
  decryptMessage: (cipher: string) => {
    const key = import.meta.env.VITE_ENCRYPTION_KEY;
    return aes.decrypt(cipher, key).toString(encUTF8);
  },
};

export default encryptionClient;
