import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { updateAndSaveSkills } from "@contracts/contracts";
import { connect } from "react-redux";
import { saveCommunity } from "@store/Community/community.actions";
import "./roles.scss";
import { SwButton } from "sw-web-shared";

const Roles = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState({ rolename: "" });
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState(["", "", ""]);

  useEffect(() => {
    if (props?.state?.community?.roles) {
      filterRoles(props.state.community.roles.roles);
      console.log(roles);
      setIsLoading(false);
    } else {
      return;
    }
  }, [props.state.community]);

  const changeRole = (newRole) => {
    setActiveRole(newRole);
    setSkills(newRole["skills"]);
  };

  const updateSkills = async (skills) => {
    setIsLoading(true);
    try {
      activeRole["skills"] = skills;

      const res = await updateAndSaveSkills(activeRole, props.state.community);

      props.dispatchSaveCommunity(res);
    } catch (err) {
      alert(err);
    }
    setIsLoading(false);
  };

  const filterRoles = (rolesFromState) => {
    let newRoles = [];
    let isCoreTeam = false;
    if (props.isCoreTeam) {
      isCoreTeam = true;
    }
    rolesFromState.forEach((r) => {
      if (r["isCoreTeamMember"] === isCoreTeam) {
        newRoles.push({
          credits: r["credits"],
          isCoreTeamMember: r["isCoreTeamMember"],
          roleName: r["roleName"],
          skills: r["skills"],
        });
      }
    });
    setRoles(newRoles);
    setActiveRole(newRoles[0]);
    setSkills(newRoles[0]["skills"]);
  };

  const skillData = [
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4",
    "Skill 5",
    "Skill 6",
  ];

  const addSelectedSkill = (skill) => {
    if (skills.includes(skill)) {
      const newArray = skills.filter((s) => {
        return s !== skill;
      });
      setSkills(newArray);
    } else if (skills.length < 4 && !skills.includes(skill)) {
      setSkills((skills) => [...skills, skill]);
    } else {
      alert("Please select no more than 4 skills.");
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          mb: "35px",
        }}
        variant="h1"
      >
        Roles & Skills
      </Typography>
      <Typography
        sx={{
          mb: "35px",
        }}
        variant="h3"
      >
        Add Skills for each Role, and assign them to your{" "}
        {props.isCoreTeam ? "Core Team" : "Community Members"}
      </Typography>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            p: "24px 68px",
          }}
        >
          {roles.map((role, n) => {
            return (
              <SwButton
                key={n}
                sx={{
                  whiteSpace: "nowrap",
                  width: 1,
                  borderColor: "primary.main",
                  height: "85px",
                  mb: "35px",
                }}
                className={activeRole === role ? "active-link" : ""}
                label={role["roleName"]}
                onClick={() => changeRole(role)}
              ></SwButton>
            );
          })}
        </Box>
        <Box
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            p: "24px 68px",
          }}
        >
          <Card
            sx={{
              mb: "20px",
              border: "1px solid",
              borderColor: "primary.main",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.dark",
            }}
          >
            <CardHeader
              title={`Select up to 4 skills for "${activeRole["roleName"]}"`}
              titleTypographyProps={{
                mx: "auto",
                variant: "h2",
                align: "center",
                color: "primary.main",
                mt: "6px",
              }}
            />
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                p: "5px",
              }}
            >
              {skillData.map((skill, i) => {
                return (
                  <SwButton
                    sx={{
                      height: "70px",
                      flex: "0 0 30%",
                      whiteSpace: "nowrap",
                      borderColor: "primary.main",
                      m: "5px",
                    }}
                    className={skills.includes(skill) ? "active-link" : ""}
                    key={i}
                    onClick={() => addSelectedSkill(skill)}
                  >
                    <Typography variant="h3">{skill}</Typography>
                  </SwButton>
                );
              })}
            </CardContent>
          </Card>
          <SwButton
            sx={{
              whiteSpace: "nowrap",
              borderColor: "primary.main",
              height: "85px",
            }}
            disabled={isLoading}
            label={"Confirm & Add Skills"}
            onClick={() => updateSkills(skills)}
          ></SwButton>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    state: {
      community: state.community.community,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSaveCommunity: (res) => dispatch(saveCommunity(res)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
