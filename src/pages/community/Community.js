import { SwButton, SwShare } from "sw-web-shared";
import React, { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { ReactComponent as Member } from "@assets/member-card.svg";
import { ReactComponent as Roles } from "@assets/roles.svg";
import { ReactComponent as Share } from "@assets/share.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Community = (props) => {
  const basePath = props.location.pathname;

  const [openShare, setOpenShare] = useState(false);

  const handleShareClose = () => {
    setOpenShare(false);
  };

  const shareMessage = `Hey there! We've just deployed ${props?.state?.community?.name} on SkillWallet - choose your Role in our Community, pick your Skills, and let's build something great together!`;

  return (
    <>
      <SwShare
        mode="light"
        url="https://skillwallet.id/"
        title="with friends"
        sx={{
          '.MuiTypography-h2': {
            mt: 0
          }
        }}
        twitterProps={{
          title: shareMessage,
          hashtags: ["SkillWallet", "DAO", "Blockchain"],
        }}
        linkedinProps={{
          title: shareMessage,
          summary: "Do more with DAO",
          source: "https://skillwallet.id",
        }}
        telegramProps={{
          title: shareMessage,
        }}
        open={openShare}
        onClose={handleShareClose}
      />
      <Box
        sx={{
          height: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          overflow: "hidden",
          p: "12px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Avatar
            sx={{
              height: "111px",
              width: "111px",
            }}
            variant="square"
            src={props?.state?.community?.image}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              ml: "21px",
            }}
          >
            <Typography variant="h1">{props?.state?.community?.name}</Typography>
            <Typography variant="h2">Community</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
          className="sw-box"
        >
          <Box
            sx={{
              mx: "auto",
              width: 4 / 5,
            }}
          >
            <SwButton
              sx={{
                whiteSpace: "nowrap",
                width: 1,
                borderColor: "primary.main",
                height: "85px",
                mb: "48px",
              }}
              endIcon={<Member className="sw-btn-icon" width="30px" />}
              label="Members"
              component={Link}
              to={`${basePath}/members`}
            />
            <SwButton
              sx={{
                whiteSpace: "nowrap",
                width: 1,
                borderColor: "primary.main",
                height: "85px",
                mb: "48px",
              }}
              endIcon={<Roles className="sw-btn-icon" width="30px" />}
              label="Roles & Skills"
              component={Link}
              to={`${basePath}/roles`}
            ></SwButton>
            <SwButton
              sx={{
                whiteSpace: "nowrap",
                width: 1,
                borderColor: "primary.main",
                height: "85px",
              }}
              onClick={() => setOpenShare(true)}
              endIcon={<Share className="sw-btn-icon" width="30px" />}
              label="Invite & Share"
            ></SwButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = state => {
  return {
    state: {
      community: state.community.community
    }
  }
}

export default connect(mapStateToProps)(Community);
