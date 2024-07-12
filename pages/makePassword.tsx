import bcrypt from "bcryptjs";
import { useEffect, useState } from "react";

const MakePassword = (): JSX.Element => {
  const salt = bcrypt.genSaltSync(10);
  const [hashedPassword, setHashedPassword] = useState<string>("");

  /* Initial load */
  useEffect(() => {
    setHashedPassword(bcrypt.hashSync("admin", salt));
    console.log(hashedPassword);
  }, []);

  return <div>{hashedPassword}</div>;
};

export default MakePassword;
