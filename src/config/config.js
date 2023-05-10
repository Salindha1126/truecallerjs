import path from "path";

const truecallerjsAuthDir =
  process.env.TRUECALLERJS_DIRECTORY ||
  path.join(
    process.env.HOME || process.env.HOMEPATH,
    ".config",
    "truecallerjs"
  );
const requestFile = path.join(truecallerjsAuthDir, "request.json");
const authKeyFile = path.join(truecallerjsAuthDir, "authkey.json");

export { truecallerjsAuthDir, requestFile, authKeyFile };
