// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function FeaturesInfoCard({ icon, title, description, direction }) {
  let alignment = "flex-start";
  if (direction === "center") {
    alignment = "center";
  } else if (direction === "right") {
    alignment = "flex-end";
  }

  return (
    <MKBox
      display="flex"
      flexDirection="column"
      alignItems={alignment}
      textAlign={direction}
      p={direction === "center" ? 2 : 0}
      lineHeight={1}
    >
      <MKBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="5rem"
        height="5rem"
        borderRadius="xl"
        variant="gradient"
      >
        {typeof icon === "string" ? <Icon fontSize="large">{icon}</Icon> : icon}
      </MKBox>
      <MKTypography display="block" variant="5" fontWeight="bold" mt={2.5} mb={1.5}>
        {title}
      </MKTypography>
      <MKTypography display="block" variant="subtitle2" color="text">
        {description}
      </MKTypography>
    </MKBox>
  );
}

// Setting default props for the FeaturesInfoCard
FeaturesInfoCard.defaultProps = {
  direction: "left",
};

// Typechecking props for the FeaturesInfoCard
FeaturesInfoCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["left", "right", "center"]),
};

function Features() {
  return (
    <MKBox component="section" py={12}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          justifyContent="center"
          mx="auto"
          textAlign="center"
          pb={6}
        >
          <MKTypography variant="h2" mb={1}>
            Let your writing shine with worth.
          </MKTypography>
          <MKTypography variant="subtitle1" color="text">
            Express yourself with confidence and quality, and create writing that has value for
            yourself and others.
          </MKTypography>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <FeaturesInfoCard
              color="primary"
              icon="article"
              title="Exclusive Content"
              description="Our blockchain tech protects your writing from duplication and plagiarism."
              direction="center"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FeaturesInfoCard
              icon="currency_exchange"
              title="Trade At Profit"
              description="Our blockchain tech ensures that every purchase is profitable for you."
              direction="center"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <FeaturesInfoCard
              color="warning"
              icon="update"
              title="Unlimited Revisions"
              description="Revise and track down your articles revisions as it changes ownership."
              direction="center"
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Features;
