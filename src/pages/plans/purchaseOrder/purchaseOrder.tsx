import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Stack from "@mui/material/Stack";
import {
  Grid,
  Paper,
  FormControl,
  Typography,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { DevGrid } from "base/core/table/DevGrid";
import { Fragment } from "react";
import _ from "lodash";
import styles from "./purchaseOrder.module.css";
import { IPlansServices } from "../../../services/plan_services";
import { createPurchaseOderPresenter } from "./purchaseOrder_store";
import { PAGE_SIZE } from "utils/config";
import { column } from "base/core/table/services";
import { number } from "yup";
import { Link } from "react-router-dom";
import moment from "moment";

const defaultValues = {
  purchaseOrderCode: "",
  companyCode: "",
  documentType: "",
  deletionInd: "",
  vendorNumber: "",
  purchasingOrg: "",
  paging: {
    draw: typeof number,
    start: typeof number,
    length: typeof number,
  },
};
export function createPurchaseOrder(services: {
  plansServices: IPlansServices;
}) {
  const presenter = createPurchaseOderPresenter(services);
  const store = presenter.createStore();
  return observer(() => {
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [page, setPage] = useState(1);
    const [formValues, setFormValues] = useState(defaultValues);

    useEffect(() => {
      presenter.getTablePurchaseOder(store, {
        paging: {
          draw: 1,
          start: 0,
          length: pageSize,
        },
      });
    }, []);

    const tableRows = store.dataTablePurchaseOder.data.map((row, key) => {
      return {
        stt: row.stt,
        purchaseOrderCode: row.purchaseOrderCode,
        companyCode: row.companyCode,
        documentType: row.documentType,
        deletionInd: row.deletionInd,
        vendorNumber: row.vendorNumber,
        purchasingOrg: row.purchasingOrg,
        createTime: row.createTime
          ? moment(row.createTime).format("DD-MM-YY hh:mm A")
          : " ",
        lastEditTime: row.lastEditTime
          ? moment(row.lastEditTime).format("DD-MM-YY hh:mm A")
          : "",
        active: row.active,
        purchaseOrderId: row.purchaseOrderId,
        // action:
      };
    });

    const [column] = useState([
      {
        columnName: "purchaseOrderId",
        width: 180,
        align: "center",
        visible: "false",
      },
      { columnName: "stt", width: 90, align: "center", visible: "true" },
      {
        columnName: "purchaseOrderCode",
        width: 180,
        align: "center",
        visible: "true",
      },
      {
        columnName: "companyCode",
        width: 180,
        align: "center",
        visible: "true",
      },
      {
        columnName: "documentType",
        width: 180,
        align: "center",
        visible: "true",
      },
      {
        columnName: "deletionInd",
        width: 180,
        align: "center",
        visible: "true",
      },
      {
        columnName: "vendorNumber",
        width: 180,
        align: "center",
        visible: "true",
      },
      {
        columnName: "purchasingOrg",
        width: 180,
        align: "center",
        visible: "true",
      },
      {
        columnName: "createTime",
        width: 180,
        align: "center",
        visible: "true",
      },
      {
        columnName: "lastEditTime",
        width: 180,
        align: "center",
        visible: "true",
      },
      { columnName: "active", width: 180, align: "center", visible: "true" },
    ]);

    const handlePageSizeChange = (value: number) => {
      setPageSize(value);
      presenter.getTablePurchaseOder(store, {
        paging: {
          draw: page,
          start: (page - 1) * value,
          length: value,
        },
      });
    };
    const navigate = useNavigate();
    const handleDetail = (e: any) => {
      if (e.purchaseOrderId) {
        navigate("detail/" + e.purchaseOrderId);
      }
    };
    const handlePageChange = (value: any) => {
      setPage(value);
      presenter.getTablePurchaseOder(store, {
        paging: {
          draw: page,
          start: pageSize * (value - 1),
          length: pageSize,
        },
      });
    };
    const handleInput = (e: any) => {
      // console.log(e)
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
    const handleSubmit = (e: any) => {
      e.preventDefault();
      presenter.getTablePurchaseOder(store, {
        paging: {
          draw: 1,
          start: 0,
          length: pageSize,
        },
        purchaseOrderCode: formValues.purchaseOrderCode,
        companyCode: formValues.companyCode,
        documentType: formValues.documentType,
        deletionInd: formValues.deletionInd,
        vendorNumber: formValues.vendorNumber,
        purchasingOrg: formValues.purchasingOrg,
      });
    };

    return (
      <Fragment>
        <Typography className={styles.title}>PURCHASE ORDER</Typography>
        <Paper className={styles.paperSearch} elevation={0}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} md={2}>
                <Typography className={styles.label}>
                  Purchase Order Code
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} className={styles.paddingInput}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    className={styles.input}
                    onChange={handleInput}
                    name="purchaseOrderCode"
                    value={formValues.purchaseOrderCode}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <Typography className={styles.label}>Company Code</Typography>
              </Grid>
              <Grid item xs={12} md={3} className={styles.paddingInput}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    className={styles.input}
                    onChange={handleInput}
                    name="companyCode"
                    value={formValues.companyCode}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}></Grid>
              <Grid item xs={12} md={2}>
                <Typography className={styles.label}>Document Type</Typography>
              </Grid>
              <Grid item xs={12} md={3} className={styles.paddingInput}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    className={styles.input}
                    onChange={handleInput}
                    name="documentType"
                    value={formValues.documentType}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <Typography className={styles.label}>Deletion Ind</Typography>
              </Grid>
              <Grid item xs={12} md={3} className={styles.paddingInput}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    className={styles.input}
                    onChange={handleInput}
                    name="deletionInd"
                    value={formValues.deletionInd}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}></Grid>
              <Grid item xs={12} md={2}>
                <Typography className={styles.label}>Vendor Number</Typography>
              </Grid>
              <Grid item xs={12} md={3} className={styles.paddingInput}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    className={styles.input}
                    onChange={handleInput}
                    name="vendorNumber"
                    value={formValues.vendorNumber}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <Typography className={styles.label}>Purchasing Org</Typography>
              </Grid>
              <Grid item xs={12} md={3} className={styles.paddingInput}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    className={styles.input}
                    onChange={handleInput}
                    name="purchasingOrg"
                    value={formValues.purchasingOrg}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <div className={styles.button}>
              <Button
                type="submit"
                variant="contained"
                className={styles.buttonSearch}
              >
                Tìm kiếm
              </Button>
            </div>
          </form>
        </Paper>
        <Paper className={styles.paperTable} elevation={0}>
          <DevGrid
            rows={tableRows}
            column={column}
            handleDetail={handleDetail}
            detailButton={true}
            // Page+
            paging={true}
            currentPage={page}
            pageSize={pageSize}
            totalRecords={store.dataTablePurchaseOder.recordsFiltered}
            onCurrentPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Paper>
      </Fragment>
    );
  });
}
