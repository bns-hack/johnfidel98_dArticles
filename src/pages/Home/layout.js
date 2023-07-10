/*
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import React, { useContext } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import Notification from "pages/Home/notification";

import Footer from "./footer";

import bgImage from "assets/images/pexels-gdtography-911758.jpg";
import Navbar from "./navbar";
import { ArticleContext } from "../../context/ArticlesContext";

function Layout({ head, body }) {
  const { isLoading } = useContext(ArticleContext);
  const currentLoc = useLocation();

  return (
    <MKBox position="relative">
      <Notification />
      {isLoading ? (
        <MKBox
          position="fixed"
          height="-webkit-fill-available"
          width="-webkit-fill-available"
          zIndex={10000}
          display="flex"
          alignItems="center"
          textAlign="center"
          bgColor={"rgba(255,255,255, 0.8)"}
        >
          <MKBox mx={"auto"}>
            <MKTypography variant="h1" component="h1" color="text">
              Loading
            </MKTypography>
            <MKTypography variant="subtitle1" component="h2" color="text">
              Kindly wait while we process transactions ...
            </MKTypography>
          </MKBox>
        </MKBox>
      ) : null}
      <Navbar
        action={{
          type: "internal",
          route: "/articles/create",
          label: "write article",
          color: "default",
        }}
      />
      <MKBox
        minHeight={currentLoc.pathname.indexOf("/articles") > -1 ? "20vh" : "50vh"}
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.5),
              rgba(gradients.dark.state, 0.5)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>{head}</Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Container>{body}</Container>
      </Card>
      <Footer />
    </MKBox>
  );
}

Layout.propTypes = {
  head: PropTypes.any,
  body: PropTypes.node.isRequired,
};

export default Layout;
