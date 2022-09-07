import React, { useState, useEffect, forwardRef, Fragment } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  TextField as Input,
  Typography,
} from "@mui/material";
import {
  Inbox as InboxIcon,
  ExpandMore as ExpandIcon,
  Home,
  ExpandLess,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Menu, ChildMenu } from "services/company_list_services";
import styles from "./sidebarLink.module.css";
import classnames from "classnames";
import { toJS } from "mobx";
export interface Props {}
export function SidebarLink({
  menuId,
  menuName,
  icon,
  pageModel,
  isSidebarOpened,
}: {
  menuId: string;
  menuName: string;
  icon: string;
  pageModel: Array<ChildMenu>;
  isSidebarOpened: Boolean;
}) {
  let [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = (e: any) => {
    setIsOpen(!isOpen);
  };

  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  return (
    <Fragment>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "#1e282c" }}>
        <ListItem onClick={toggleCollapse} className={styles.list}>
          <div className={classnames(styles.icon, icon)}></div>
          <ListItemText
            className={styles.menuName}
            primary={<span className={styles.textMenu}>{menuName}</span>}
          />
          <div className={styles.iconExpand}>
            {isOpen ? <ExpandLess /> : <ExpandIcon />}
          </div>
        </ListItem>
      </Box>
      {pageModel.map((e, key) => {
        if (e.menuId === menuId) {
          return (
            <Collapse
              key={key}
              in={isOpen === true && isSidebarOpened === true ? true : !true}
              timeout="auto"
              unmountOnExit
              className={styles.collapse}
              ref={ref}
            >
              <List component="div" disablePadding className={styles.list}>
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={React.forwardRef<HTMLAnchorElement, Props>(
                    (props, ref) => (
                      <Link to={e.pageUrl} {...props} ref={ref as any} />
                    )
                  )}
                >
                  <li className={styles.pageName}>{e.pageName}</li>
                </ListItemButton>
              </List>
            </Collapse>
          );
        }
      })}
    </Fragment>
  );
}
export const sidebarLink = React.memo(SidebarLink);


