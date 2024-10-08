import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import depedLogo from "../../assets/images/deped_logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FcImport, FcReading } from "react-icons/fc";
import { useStateContext } from "../../contexts/ContextProvider";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FcSupport } from "react-icons/fc";
import ChangePasswordModal from "../../modals/AccountDetails/ChangePasswordModal";
import accountService from "../../services/account-service";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openPortalMenu, setOpenPortalMenu] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1366px)");
  const { auth, setAuth } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (auth?.uid) {
      try {
        await accountService.logout(auth.uid, auth.username);
        setOpenProfileMenu(false);
        setAuth(null);
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      console.error("No UID found");
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleopenKTO12 = () => {
    navigate("/Portal");
  };

  // const handleopenSHS = () => {
    // navigate("/PortalSHS");
  // };

  const portalOptions = [
    { text: "Elementary and Junior High School", action: handleopenKTO12 },
    // { text: "Senior High School", action: handleopenSHS },
  ];

  const menuOptions = [
    { text: "About Us", action: () => navigate("/AboutUs") },
    {
      text: "Portal",
      action: () => setOpenPortalMenu(!openPortalMenu),
      hasDropdown: true,
    },
    {
      text: "Library",
      action: () => navigate("/Library"),
    },
    {
      text: "Citizen's Charter",
      action: () => navigate("/CitizensCharter"),
    },
  ];

  const profileOptions = [
    {
      text: "My Account Details",
      icon: <FcReading size={36} />,
      action: () => {},
    },
    {
      text: "Change Password",
      icon: <FcSupport size={36} />,
      action: handleOpenModal,
    },
    {
      text: "Log Out",
      icon: <FcImport size={36} />,
      action: handleLogout,
    },
  ];

  const handleDrawerOpen = () => {
    setOpenMenu(true);
  };

  const handleDrawerClose = () => {
    setOpenMenu(false);
  };

  const handleProfileOpen = () => {
    setOpenProfileMenu(true);
  };

  const handleProfileClose = () => {
    setOpenProfileMenu(false);
  };

  const handleHome = () => {
    navigate("/Homepage");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          background: "black",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={handleHome}
          >
            <img
              src={depedLogo}
              alt="DepEd Logo"
              style={{
                width: isMediumScreen ? "40px" : "50px",
                height: isMediumScreen ? "40px" : "50px",
              }}
            />
          </Box>
          <Typography
            sx={{
              ml: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontFamily: "Barlow Semi Condensed",
              fontSize: isMediumScreen ? 26 : 24,
              color: "white",
            }}
          >
            {isMobile ? "ILeaRN" : "Imus Learning Resource Navigator"}
          </Typography>
        </Box>
        {isMobile ? (
          <>
            <IconButton
              onClick={handleDrawerOpen}
              sx={{ color: "white", mr: 5 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={openMenu} onClose={handleDrawerClose}>
              <List sx={{ width: 250 }}>
                {menuOptions.map((option, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      button
                      onClick={
                        typeof option === "string"
                          ? handleDrawerClose
                          : option.action
                      }
                    >
                      <ListItemText primary={option.text} />
                    </ListItem>
                    {option.hasDropdown && openPortalMenu && (
                      <List component="div" disablePadding>
                        {portalOptions.map((portalOption, portalIndex) => (
                          <ListItem
                            button
                            key={portalIndex}
                            onClick={() => {
                              portalOption.action();
                              setOpenPortalMenu(false);
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemText
                              sx={{ fontSize: 11, fontFamily: "Fira Sans" }}
                            >
                              {portalOption.text}
                            </ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </React.Fragment>
                ))}
                <ListItem button onClick={handleDrawerClose}></ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: isMediumScreen ? 2 : 3,
              color: "white",
              flexWrap: isMediumScreen ? "wrap" : "nowrap",
              mr: 5,
            }}
          >
            {menuOptions.map((option, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <Typography
                  onClick={
                    typeof option === "string"
                      ? () => {} // Handle regular menu items
                      : option.action
                  }
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Fira Sans Condensed",
                    fontSize: isMediumScreen ? 16 : 21,
                    "&:hover": {
                      color: "cyan",
                      cursor: "pointer",
                      textShadow: "0 0 5px cyan, 0 0 10px cyan, 0 0 20px cyan",
                    },
                  }}
                >
                  {typeof option === "string" ? option : option.text}
                </Typography>
                {option.hasDropdown && openPortalMenu && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      backgroundColor: "white",
                      boxShadow: 3,
                      zIndex: 1000,
                      color: "black",
                    }}
                  >
                    {portalOptions.map((portalOption, portalIndex) => (
                      <Typography
                        key={portalIndex}
                        onClick={() => {
                          portalOption.action();
                          setOpenPortalMenu(false);
                        }}
                        sx={{
                          padding: "8px 16px",
                          color: "black",
                          width: "200px",
                          fontSize: 11,
                          "&:hover": {
                            backgroundColor: "lightgray",
                            cursor: "pointer",
                          },
                        }}
                      >
                        {portalOption.text}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
            <IconButton sx={{ color: "white" }} onClick={handleProfileOpen}>
              <AccountCircleIcon sx={{ fontSize: 36 }} />
            </IconButton>
            <Drawer
              anchor="right"
              open={openProfileMenu}
              onClose={handleProfileClose}
            >
              <List sx={{ width: 350 }}>
                <ListItem
                  sx={{
                    mb: 5,
                    mt: 3,
                    gap: -1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 48, color: "black" }} />
                  <ListItemText
                    primary={`${auth?.username}`}
                    primaryTypographyProps={{
                      fontFamily: "Fira Sans Condensed",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  />
                  {auth?.role === "admin" ? (
                    <>
                      <ListItemText
                        primary={auth?.officeName}
                        primaryTypographyProps={{
                          fontFamily: "Fira Sans Condensed",
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      />
                      <ListItemText
                        primary="Administrator"
                        primaryTypographyProps={{
                          fontFamily: "Fira Sans Condensed",
                          fontSize: 14,
                        }}
                      />
                    </>
                  ) : auth?.role === "teacher" ? (
                    <>
                      <ListItemText
                        primary={auth?.schoolName}
                        primaryTypographyProps={{
                          fontFamily: "Fira Sans Condensed",
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      />
                      <ListItemText
                        primary="Teacher"
                        primaryTypographyProps={{
                          fontFamily: "Fira Sans Condensed",
                          fontSize: 14,
                        }}
                      />
                    </>
                  ) : null}
                </ListItem>
                {profileOptions.map((option, index) => (
                  <ListItem button key={index} onClick={option.action}>
                    <ListItemIcon sx={{ color: "black" }}>
                      {option.icon}
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: "black",
                        fontFamily: "Fira Sans Condensed",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                      primary={option.text}
                      primaryTypographyProps={{
                        fontFamily: "Fira Sans Condensed",
                        fontSize: 16,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>
        )}
      </Box>
      <ChangePasswordModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </>
  );
}
