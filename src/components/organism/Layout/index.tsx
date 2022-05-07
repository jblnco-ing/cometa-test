// material ui
import { Avatar } from "@mui/material";

// types
import { FC } from "react";

export const Header: FC<{ schoolName: string }> = ({ schoolName }) => {
  return (
    <div>
      <Avatar>{schoolName.charAt(0)}</Avatar>
      {schoolName}
    </div>
  );
};
