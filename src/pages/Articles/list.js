// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import React, { useContext, Fragment } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
// import MKPagination from "components/MKPagination";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

import { ArticleContext } from "../../context/ArticlesContext";

function ArticleCard({ title, description, categories, action }) {
  return (
    <Card>
      <MKBox p={3} mt={-2}>
        {categories.length > 0 && (
          <MKTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="regular"
            mb={0.75}
          >
            {categories.map((category) => (
              <Fragment key={category}>{category}&nbsp;&bull;&nbsp;</Fragment>
            ))}
          </MKTypography>
        )}
        <MKTypography display="inline" variant="h5" fontWeight="bold">
          {title}
        </MKTypography>
        <MKBox mt={1} mb={3}>
          <MKTypography variant="body2" component="p" color="text">
            {description}
          </MKTypography>
        </MKBox>
        {action.type === "external" ? (
          <MKButton
            component={MuiLink}
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            size="small"
            color={action.color ? action.color : "dark"}
          >
            {action.label}
          </MKButton>
        ) : (
          <MKButton
            component={Link}
            to={action.route}
            variant="outlined"
            size="small"
            color={action.color ? action.color : "dark"}
          >
            {action.label}
          </MKButton>
        )}
      </MKBox>
    </Card>
  );
}

// Setting default props for the ArticleCard
ArticleCard.defaultProps = {
  categories: [],
};

// Typechecking props for the ArticleCard
ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
};

function ArticlesList({ mode = "page" }) {
  const { articles } = useContext(ArticleContext);

  let displayArticles = articles,
    smSizing = 6,
    wordLimit = 50;
  if (displayArticles) {
    if (displayArticles.length > 1) {
      displayArticles = displayArticles.reverse();

      if (mode == "landing") {
        displayArticles = displayArticles.slice(0, 5);
        smSizing = 12;
        wordLimit = 200;
      }
    }
  }

  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container rowSpacing={4} columnSpacing={mode == "page" ? 4 : 0} sx={{ mt: 3 }}>
          {displayArticles.map((art) => (
            <Grid key={art.id} item xs={12} sm={smSizing}>
              <MKBox mt={3}>
                <ArticleCard
                  title={
                    art.title.length > wordLimit ? art.title.slice(0, wordLimit) + "..." : art.title
                  }
                  description={art.content.slice(0, 200) + "..."}
                  categories={art.tags}
                  action={{
                    type: "internal",
                    route: "/articles/" + art.id + "/view",
                    color: "info",
                    label: "Read Article",
                  }}
                />
              </MKBox>
            </Grid>
          ))}
        </Grid>
        {/* {mode == "page" ? (
          <MKBox mt={5}>
            <MKPagination>
              <MKPagination item>
                <Icon>keyboard_arrow_left</Icon>
              </MKPagination>
              <MKPagination item active>
                1
              </MKPagination>
              <MKPagination item>2</MKPagination>
              <MKPagination item>3</MKPagination>
              <MKPagination item>4</MKPagination>
              <MKPagination item>5</MKPagination>
              <MKPagination item>
                <Icon>keyboard_arrow_right</Icon>
              </MKPagination>
            </MKPagination>
          </MKBox>
        ) : null} */}
      </Container>
    </MKBox>
  );
}

// Typechecking props for the ArticleCard
ArticlesList.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default ArticlesList;
