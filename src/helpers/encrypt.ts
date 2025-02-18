import { AES } from 'crypto-ts';
var CryptoTS = require("crypto-ts");

export const onEncrypt = (link: string, salt: string) => {
    return CryptoTS.AES.encrypt(link, salt);
}