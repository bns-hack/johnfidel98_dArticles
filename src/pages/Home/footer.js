import React, { useContext } from "react";

import { ArticleContext } from "../../context/ArticlesContext";
import { shortenAddress } from "../../utils/constants";

// @mui material components
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

const Footer = () => {
  const { currentAccount } = useContext(ArticleContext);

  // get current year
  const date = new Date().getFullYear();

  return (
    <Grid item xs={12} pr={3} sx={{ textAlign: "center", mb: 3 }}>
      <Divider />
      <MKBox py={2} px={2} isplay="flex" pt={2} justifyContent="space-between" alignItems="center">
        <MKTypography variant="body2" mt={1} xs={12} opacity={0.8}>
          Copyright &copy; {date} Material Design by John Nanda
        </MKTypography>
        <MKTypography variant="button" mt={1} xs={12} opacity={0.8}>
          Connected Wallet: {shortenAddress(currentAccount)}
        </MKTypography>
      </MKBox>
    </Grid>
  );
};

export default Footer;
