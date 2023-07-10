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

import React, { useContext } from "react";
import { useParams } from "react-router-dom";

// markdown editor
import ReactMarkdown from "react-markdown";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// Images
import bgImage from "assets/images/pexels-gdtography-911758.jpg";

import Layout from "pages/Home/layout";
import Container from "@mui/material/Container";

import { ArticleContext } from "../../context/ArticlesContext";

const Article = () => {
  const { articleId } = useParams();
  const { articlesData, toggleExchangability, buyArticle, currentAccount } =
    useContext(ArticleContext);

  const article = articlesData[articleId];
  return (
    <Layout
      body={
        <Container>
          <Grid container mt={8}>
            <MKTypography variant="h2" fontWeight="bold">
              {article.title}
            </MKTypography>
          </Grid>
          <Grid container mt={3}>
            <MKTypography variant="h4" fontWeight="bold">
              By {article.author}
            </MKTypography>
          </Grid>
          <MKBox my={5}>
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </MKBox>
          <Grid container mt={3}>
            <MKTypography variant="subtitle2">Minted {article.created}</MKTypography>
          </Grid>
          <MKBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="xl"
            my={10}
            p={6}
            sx={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8} lg={5}>
                <MKTypography variant="h5" color="white" fontWeight="bold">
                  Enjoyed my article? Buy and own it. Trade later for profit.
                </MKTypography>
              </Grid>
              <Grid item xs={12} lg={6} sx={{ ml: "auto" }}>
                <MKBox width="12rem" ml="auto">
                  {article?.owner.toLowerCase() == currentAccount.toLowerCase() ? (
                    <MKButton
                      variant="gradient"
                      size="large"
                      color="info"
                      onClick={() => toggleExchangability(articleId, article.exchangeable)}
                      sx={{ boxShadow: "none" }}
                    >
                      {article.exchangeable ? "Disable Sale" : "Enable Sale"}
                    </MKButton>
                  ) : (
                    <MKButton
                      variant="gradient"
                      size="large"
                      color="warning"
                      onClick={() => buyArticle(articleId, 0.012)}
                      fullWidth
                      sx={{ boxShadow: "none" }}
                    >
                      buy article ({article.amount} ETH)
                    </MKButton>
                  )}
                </MKBox>
              </Grid>
            </Grid>
          </MKBox>
        </Container>
      }
    />
  );
};

export default Article;
