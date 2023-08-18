import { JSEncrypt } from "jsencrypt";

/**
 * encrypt
 * @param value string
 * @returns encrypted value or false
 */
function encrypt(value: string): string | false {
  const jsEncrypt = new JSEncrypt();

  // 設置公鑰（通常從後端取得）
  const keyPair = jsEncrypt.getKey();
  const publicKey = keyPair.getPublicKey();
  //   const privateKey = keyPair.getPrivateKey();

  jsEncrypt.setPublicKey(publicKey);

  return jsEncrypt.encrypt(value);
}

export default {
  encrypt,
};
