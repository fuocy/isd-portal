import React, { Fragment } from "react";
import styles from "./layout.module.css";
import { observer } from "mobx-react-lite";
import { createHandlePresenter } from "stores/handleStore";
import { createServices } from "services/services";
import Box from "@mui/material/Box";
import { toJS } from "mobx";
import { Outlet } from "react-router-dom";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
export const Layout = observer(
  ({
    header,
    footer,
    sidebar,
  }: // content,

  {
    header: React.ReactNode;
    footer: React.ReactNode;
    sidebar: React.ReactNode;
    // content: React.ReactNode,
  }) => {
    return (
      <Box sx={{ display: "flex" }}>
        {header}
        {sidebar}

        <Box
          sx={{ flexGrow: 1, pt: 0, pb: 1, pl: 1, pr: 1 }}
          className={styles.content}
        >
          <DrawerHeader />
          {/* {content}
           */}
          <Outlet />
        </Box>
        {footer}
      </Box>
    );
  }
);

export type LayoutHOC = <T = {}>(
  Content: React.ComponentType<T>
) => React.ComponentType<T>;
