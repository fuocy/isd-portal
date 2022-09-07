import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import {
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  Button,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Menu as MenuIcon,
  Person as AccountIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Company } from "services/company_list_services";
import classNames from "classnames";
import logo from "assets/img-01.png";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { createServices } from "services/services";
import { Link, useNavigate } from "react-router-dom";
// import {  ICompanyServices } from "services/company_list_services";
import { createCompanyPresenter } from "pages/auth/login/user_store";
const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
export function Header({ 
 openSidebar,
}: {
  openSidebar?: (newType: boolean) => void;
}) {
  const services = createServices("api-url");
  const presenter = createCompanyPresenter(services);
  const store = presenter.createStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isSidebarOpenedWrapper, setIsSidebarOpenedWrapper] = useState(false);
  const [profileMenu, setProfileMenu] = useState(null);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpenedWrapper(!isSidebarOpenedWrapper);
    openSidebar?.(!isSidebarOpenedWrapper);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    presenter.signOut();
    navigate("../../auth/login", { replace: true });
  };
  const data = JSON.parse(
    localStorage.getItem("user_session") || "{}"
  );
  console.log(data)
  
  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        {isSidebarOpenedWrapper ? (
          <NavLink to="/Dashboard" className={styles.logo}>
            <Typography variant="h6" className={styles.logotype}>
              iCRM System
            </Typography>
          </NavLink>
        ) : (
          <NavLink to="/Dashboard" className={styles.logo}>
            <img src={logo} className={styles.imgLogo} />
          </NavLink>
        )}

        <IconButton
          color="inherit"
          onClick={toggleSidebar}
          className={
            !isSidebarOpenedWrapper
              ? classNames(
                  styles.headerMenuButton,
                  styles.headerMenuButtonCollapse
                )
              : classNames(
                  styles.headerMenuButton,
                  styles.headerMenuButtonCollapse,
                  styles.headerMenuButtonCollapseMargin
                )
          }
        >
          <MenuIcon />
        </IconButton>
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          // aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          className={styles.buttonSelect}
        >
          Chọn
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {data.webPermission.moduleModel != undefined
            ? data.webPermission.moduleModel.map((item: any, index: any) => (
                <MenuItem onClick={handleClose} key={index}>
                  <i className={item.icon}></i>
                  <Typography className={styles.headerSection}>
                    {item.moduleName}
                  </Typography>
                </MenuItem>
              ))
            : ""}
        </Menu>
        <div className={styles.grow} />
        <div className={styles.menuUser}>
          <div className={styles.menuProfileUser}>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              className={styles.headerMenuButton}
              aria-controls="profile-menu"
            >
              <AccountCircleIcon
                style={{ width: "18px", paddingRight: "5px" }}
              />
              <Typography className={styles.textButtonHeader}>
                {data.userName}
              </Typography>
            </IconButton>
          </div>
          <div className={styles.nofitication}>
            <NotificationsIcon style={{ marginTop: "5px", width: "20px" }} />
          </div>
          <div className={styles.menuProfile}>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              className={styles.headerMenuButton}
              aria-controls="profile-menu"
              onClick={(e: any) => setProfileMenu(e.currentTarget)}
            >
              <PersonIcon style={{ width: "20px" }} />
              <span className={styles.nameUser}></span>
              <ArrowDropDownIcon></ArrowDropDownIcon>
            </IconButton>
          </div>
        </div>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={styles.headerMenu}
          classes={{ paper: styles.profileMenu }}
          disableAutoFocusItem
        >
          <MenuItem
            className={classNames(
              styles.profileMenuItem,
              styles.headerMenuItem
            )}
          >
            <VpnKeyIcon className={styles.profileMenuIcon} />
            Đổi mật khẩu
          </MenuItem>
          <div className={styles.profileMenuItem}>
            <MenuItem
              className={styles.profileMenuLink}
              onClick={() => handleLogOut()}
            >
              <ExitToAppIcon className={styles.profileMenuIcon} />
              Đăng xuất
            </MenuItem>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
export const header = React.memo(Header);
