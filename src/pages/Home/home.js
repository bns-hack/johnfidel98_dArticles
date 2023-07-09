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

import React, { useRef, useEffect, useContext } from "react";

// typed-js
import Typed from "typed.js";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import Features from "./features";
import Layout from "./layout";
import ArticlesList from "pages/Articles/list";

import { ArticleContext } from "../../context/ArticlesContext";

function Home() {
  const { getMainAction } = useContext(ArticleContext);
  const typedJSRef = useRef(null);

  // Setting up typedJS
  useEffect(() => {
    const typedJS = new Typed(typedJSRef.current, {
      strings: ["moments", "ownership", "exchange"],
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });

    return () => typedJS.destroy();
  }, []);

  return (
    <Layout
      head={
        <Grid
          container
          item
          xs={12}
          md={7}
          justifyContent={{ xs: "center", md: "start" }}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <MKTypography
            variant="h1"
            color="white"
            sx={({ breakpoints, typography: { size } }) => ({
              [breakpoints.down("md")]: {
                fontSize: size["3xl"],
              },
            })}
          >
            Articles for digital <span ref={typedJSRef} />
          </MKTypography>
          <MKTypography variant="subtitle1" color="white" mt={3} xs={12} opacity={0.8}>
            Discover the priceless value of words in poems, speeches, articles, notes, and more.
          </MKTypography>
          <MKBox mt={5}>{getMainAction("top", "Discover Articles")}</MKBox>
        </Grid>
      }
      body={
        <>
          <Features />
          <Divider sx={{ margin: 0 }} light={false} />
          <Grid
            container
            item
            xs={12}
            lg={6}
            flexDirection="column"
            justifyContent="center"
            mx="auto"
            mt={6}
          >
            <MKBox py={2} px={6} textAlign="center">
              <MKBox
                width="4rem"
                height="4rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
                variant="gradient"
                bgColor="info"
                color="white"
                shadow="md"
                borderRadius="lg"
                mx="auto"
              >
                <Icon fontSize="medium">person</Icon>
              </MKBox>
              <MKTypography variant="h2" mt={2} mb={1}>
                Latest from our blog?
              </MKTypography>
              <MKTypography variant="subtitle1" color="text">
                Whether you are looking for tips, advice, inspiration, or entertainment, you will
                find something to suit your interests in these insightful and engaging articles that
                are written by experts and enthusiasts.
              </MKTypography>
            </MKBox>
          </Grid>
          <ArticlesList mode="landing" />
          <MKBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="xl"
            my={10}
            p={6}
            sx={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8} lg={5}>
                <MKTypography variant="h3" color="white" fontWeight="bold">
                  Write anything, earn crypto at DArticle.
                </MKTypography>
              </Grid>
              <Grid item xs={12} lg={6} sx={{ ml: "auto" }}>
                <MKBox width="12rem" ml="auto">
                  {getMainAction()}
                </MKBox>
              </Grid>
            </Grid>
          </MKBox>
        </>
      }
    />
  );
}

export default Home;
