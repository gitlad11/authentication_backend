import { AES } from 'crypto-ts';
var CryptoTS = require("crypto-ts");

export const onDecrypt = async (link: string, salt: string) => {
        var bytes  = CryptoTS.AES.decrypt(link.toString(), salt);
        var plaintext = bytes.toString(CryptoTS.enc.Utf8);
        return plaintext;
}