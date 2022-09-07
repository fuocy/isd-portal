import React, { useState, useEffect, useContext } from "react";
import styles from "./sidebar.module.css";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import classNames from "classnames";
import {
  IconButton,
  List,
  Autocomplete,
  Checkbox,
  TextField,
  makeStyles,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { SidebarLink } from "./sidebarlink";
import { boolean } from "yup";
import { User, ChildMenu, Menu } from "services/company_list_services";
import { toJS } from "mobx";
import _ from "lodash";
const drawerWidth = 240;
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});
export function Sidebar({
  openSidebarWrapper
}: {
  openSidebarWrapper: boolean;

}) {
  let [isPermanent, setPermanent] = useState(true);
  const data = JSON.parse(
    localStorage.getItem("user_session") || "{}"
  );

  return (
 
    <Drawer
      variant={"permanent"}
      className={classNames(styles.drawer, {
        [styles.drawerOpen]: openSidebarWrapper,
        [styles.drawerClose]: openSidebarWrapper,
      })}
      classes={{
        paper: classNames({
          [styles.drawerOpen]: openSidebarWrapper,
          [styles.drawerClose]: !openSidebarWrapper,
        }),
      }}
      open={openSidebarWrapper}
      // onClose={toggleDrawer}
    >
      <div className={styles.divToolbar}></div>
      <List
        className={styles.sidebarList}
        classes={{ padding: styles.padding }}
      >
        {!_.isEmpty(data.webPermission.menuModel)
          ? data.webPermission.menuModel.map((link: any, key: any) => (
              <SidebarLink
                key={key}
                // location={location}
                isSidebarOpened={
                  !isPermanent ? !openSidebarWrapper : openSidebarWrapper
                }
                icon={link.icon}
                menuName={link.menuName}
                menuId={link.menuId}
                pageModel={data.webPermission.pageModel?data.webPermission.pageModel:" "}
                // toggleDrawer={toggleDrawer(true)}
              />
            ))
          : ""}
      </List>
    </Drawer>
  );
}
export const header = React.memo(Sidebar);
