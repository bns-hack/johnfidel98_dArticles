import React, { useContext, useState } from "react";

import { ArticleContext } from "../../context/ArticlesContext";

// markdown editor
import MDEditor from "@uiw/react-md-editor";

// @mui material components
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

import Layout from "../Home/layout";

const MintArticle = () => {
  const { mintArticle, handleChange } = useContext(ArticleContext);
  const [article, setArticle] = useState("Write something ...");

  return (
    <Layout
      body={
        <MKBox pb={2} px={2} mt={5} textAlign="right" alignItems="center" color="white">
          <Grid container pb={1} rowSpacing={3}>
            <Grid item pr={1} xs={12} md={8}>
              <MKInput label="Title" fullWidth onChange={(v) => handleChange(v, "title")} />
            </Grid>
            <Grid item pl={1} xs={12} md={4}>
              <MKInput label="Keywords" fullWidth onChange={(v) => handleChange(v, "tags")} />
            </Grid>
          </Grid>
          <Divider light sx={{ my: 0 }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div data-color-mode="light">
                <MDEditor
                  height={800}
                  value={article}
                  preview="edit"
                  onChange={(e) => {
                    setArticle(e);
                    handleChange(e, "content");
                  }}
                />
              </div>
            </Grid>
          </Grid>
          <Divider light sx={{ my: 0 }} />
          <MKBox display="flex" pt={2} justifyContent="space-between" alignItems="center">
            <Grid container>
              <Grid item xs={12} pr={1} md={6}>
                <MKInput label="Author" onChange={(v) => handleChange(v, "author")} fullWidth />
              </Grid>
              <Grid item xs={12} px={1} md={3}>
                <MKInput
                  type="number"
                  min={0.0001}
                  label="Amount"
                  onChange={(v) => handleChange(v, "amount")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} pl={1} md={3}>
                <MKButton color="primary" size="medium" fullWidth onClick={mintArticle}>
                  Mint Article!
                </MKButton>
              </Grid>
            </Grid>
          </MKBox>
        </MKBox>
      }
    />
  );
};

export default MintArticle;
