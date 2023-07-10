import React, { useContext } from "react";

import { ArticleContext } from "../../context/ArticlesContext";

// @mui material components
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import Icon from "@mui/material/Icon";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

const Notification = () => {
  const { showNotification, setShowNotification, notification, buyArticle } =
    useContext(ArticleContext);

  return (
    <Modal
      open={showNotification}
      onClose={() => setShowNotification(false)}
      sx={{ display: "grid", placeItems: "center" }}
    >
      <Slide direction="down" in={showNotification} timeout={500}>
        <MKBox
          position="relative"
          width="500px"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          variant="gradient"
          bgColor="info"
          shadow="sm"
        >
          <MKBox py={6} textAlign="center" color="white">
            <Icon fontSize="large" color="inherit">
              notifications_active
            </Icon>
            <MKTypography variant="h4" color="white" mt={3} mb={1}>
              {notification.title}
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mb={2} mx={5}>
              {notification.message}
            </MKTypography>
          </MKBox>
          <Divider light sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="center" py={2} px={1.5}>
            {notification.amount ? (
              <MKButton
                color="white"
                onClick={() => buyArticle(notification.id, String(notification.amount))}
              >
                Buy & Own Article
              </MKButton>
            ) : (
              <MKButton color="white" onClick={() => setShowNotification(false)}>
                ok, got it!
              </MKButton>
            )}
          </MKBox>
        </MKBox>
      </Slide>
    </Modal>
  );
};

export default Notification;
