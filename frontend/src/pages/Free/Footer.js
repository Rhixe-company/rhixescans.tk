import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
function Copyright(props) {
  return (
    <Typography variant="body2" color="default" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
  return <Copyright />;
};

export default Footer;
