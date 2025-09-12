import encryptDecrypt from "./encryptDecrypt";

const loginSuccess = (accessToken: string) => {
  // localStorage.setItem(
  //   "accessToken",
  //   encryptDecrypt.encrypt(accessToken) as string
  // );
  // for now to secure more use sessionStorage

  sessionStorage.setItem(
    "accessToken",
    encryptDecrypt.encrypt(accessToken) as string
  );
};

export { loginSuccess };
