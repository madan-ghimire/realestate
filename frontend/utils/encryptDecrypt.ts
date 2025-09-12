import CryptoJS from "crypto-js";

const unique_encryption_value = process.env.NEXT_PUBLIC_SECRET_ENCRYPTION_KEY;

const ENCRYPTION_KEY = CryptoJS.enc.Utf8.parse(
  unique_encryption_value as string
);

const IV_LENGTH = 16; // For AES, this is always 16

const encrypt = (plainText: string): string | null => {
  try {
    const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
    const encrypted = CryptoJS.AES.encrypt(plainText, ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    // Combine IV and encrypted text for storage/transmission
    return iv.toString(CryptoJS.enc.Hex) + ":" + encrypted.toString();
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

const decrypt = (encrypted: string): string | null => {
  try {
    if (!encrypted) {
      throw new Error("Invalid encrypted text");
    }

    const textParts = encrypted.split(":");
    if (textParts.length !== 2) {
      throw new Error("Invalid encrypted text format");
    }

    const iv = CryptoJS.enc.Hex.parse(textParts[0]);
    const encryptedText = textParts[1];

    const decrypted = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Assign to a named variable before export
const encryptDecrypt = { encrypt, decrypt };

export default encryptDecrypt;

// const token =
//   "4572f1e28afc6208517535c108341ddb:59XyD5J8lZ4j7/na2462fyYuvi2jdHiBzAflvh2mpi7nuV8geDiM3a8w0TDmy6G1pS7ZUlnvGDxIU/FGGspRegpLZu+tIZptAQvR4UkB04u79u/BVzVnmN2RgU0w7qRJwWa3tTISLMkITdcHFDWkdeZjt2pdgkSvnfo1TyG4VzEwALLZvF1UIoi6VDr5Fn5AcexmRCg0mbFcRKNf/8W4F9lMjnDtbyMoQjp5NzI4nJrFNLe0k9mz9WtjZgg/Z0MWEuhz2jhsZDrb3QXRtqWmRRiFTzwc4FK+G4z2Dt4WD+8/KIe+GFWjvDnMq7QXXvftUG4CEenfFzcjU6cAZRLmBKzzJJ2PRhFYI+o/VKrOrHaSKajO8oO9KluYonCZ4i8I";
// console.log("check token length", token.length);

// getToken();
