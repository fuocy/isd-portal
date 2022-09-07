import React, { useState, useEffect, ReactNode, Fragment } from "react";
import _ from "lodash";
import DataGrid, {
  Paging,
  Editing,
  Column,
  Button,
} from "devextreme-react/data-grid";
import { table, columnWidths } from "./services";
import Pagination from "@mui/material/Pagination";

import "./dx.generic.custom-scheme .css";
import { PAGE_SIZE_LIST } from "utils/config";
import {
  Grid,
  Paper,
  FormControl,
  Typography,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  Button as ButtonMUI,
  makeStyles,
} from "@material-ui/core";

type DevGridProps = {
  rows: Array<table>;
  children?: ReactNode;
  totalRecords: number;
  onPageSizeChange?: (newType: number) => void;
  pageSize: number;
  currentPage: number;
  onCurrentPageChange?: (newType: number) => void;
  column: Array<columnWidths>;
  paging: boolean;
  detailButton: boolean;
  handleDetail: (newType: number) => void;
};
const useStyles = makeStyles(() => ({
  color: {
    "& .Mui-selected": {
      backgroundColor: "#1976d2!important",
      color: "#fff",
    },
  },
}));
export const DevGrid = (props: DevGridProps) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [numberPage, setNumberPage] = useState(1);
  const handlePageSizeChange = (e: any) => {
    if (e.target.value && props.onPageSizeChange) {
      props.onPageSizeChange(e.target.value);
    }
  };
  const classes = useStyles();
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSelectedRows([]);
    if (props.onCurrentPageChange) {
      props.onCurrentPageChange(value);
    }
  };
  useEffect(() => {
    if (props.totalRecords != undefined && props.pageSize != undefined) {
 
      if (
        (props.totalRecords % props.pageSize > 0 &&
          props.totalRecords % props.pageSize > 5) ||
        (props.totalRecords % props.pageSize > 0 &&
          props.totalRecords % props.pageSize < 5)
      ) {

        setNumberPage(
          (props.totalRecords - (props.totalRecords % props.pageSize)) /
            props.pageSize +
            1
        );
      } else {
        setNumberPage(Math.round(props.totalRecords / props.pageSize));
      }
    }
  }, [props.pageSize, props.totalRecords]);
  const onClickDetail = (e: any) => {
    //
    const row = e.row.data;
    props.handleDetail(row);
  };
  return (
    <Fragment>
      <Grid container>
        <Grid item md={6}>
          <div style={{ display: "flex" }}>
            <Typography
              style={{ paddingRight: "5px", marginTop: "6px" }}
              variant="subtitle2"
            >
              Xem
            </Typography>
            <FormControl size="small">
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={props.pageSize}
                label="Document Date"
                onChange={(props) => handlePageSizeChange(props)}
                input={<OutlinedInput />}
                defaultValue="Custom"
              >
                {PAGE_SIZE_LIST.map((data: any, key: any) => (
                  <MenuItem value={data} key={key}>
                    {data}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography
              style={{ paddingLeft: "5px", marginTop: "6px" }}
              variant="subtitle2"
            >
              mục
            </Typography>
          </div>
        </Grid>
        <Grid item md={6}>
          <div style={{ float: "right", marginBottom: "20px" }}>
            <Pagination
              count={Math.round(numberPage) === 0 ? 1 : Math.round(numberPage)}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
              page={props.currentPage}
              className={classes.color}
            />
          </div>
        </Grid>
      </Grid>
      <DataGrid
        dataSource={props.rows}
        showBorders={true}
        hoverStateEnabled={true}
        columnAutoWidth={true}
        rowAlternationEnabled={true}
      >
        {props.column.map((data: any, key: any) => (
          <Column
            dataField={data.columnName}
            width={data.width ? data.width : ""}
            key={key}
            alignment={data.align ? data.align : ""}
            visible={data.visible === "true" ? true : false}
          />
        ))}
        {props.detailButton === true ? (
          <Column type="buttons" dataField="chức năng">
            <Button text="details" onClick={onClickDetail} />
          </Column>
        ) : (
          ""
        )}

        <Paging enabled={false} />
      </DataGrid>
      {props.paging === true ? (
        <Grid container>
          <Grid item md={6} style={{ marginTop: "10px" }}>
            <Typography variant="subtitle2">
              Đang xem {props.pageSize * (props.currentPage - 1) + 1} đến{" "}
              {props.pageSize * props.currentPage > props.totalRecords
                ? props.totalRecords
                : props.pageSize * props.currentPage}{" "}
              trong tổng số {props.totalRecords} mục (được lọc từ{" "}
              {props.pageSize} mục)
            </Typography>
          </Grid>
          <Grid item md={6}>
            <div style={{ float: "right", marginTop: "20px" }}>
              <Pagination
                count={
                  Math.round(numberPage) === 0 ? 1 : Math.round(numberPage)
                }
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
                page={props.currentPage}
                className={classes.color}
              />
            </div>
          </Grid>
        </Grid>
      ) : (
        " "
      )}
    </Fragment>
  );
};
