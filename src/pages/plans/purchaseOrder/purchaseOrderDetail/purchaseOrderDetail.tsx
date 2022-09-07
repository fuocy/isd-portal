import React, { useEffect, useState, Fragment } from "react";
import { IPlansServices } from "../../../../services/plan_services";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./purchaseOrderDetail.module.css";
import { createPurchaseOderPresenter } from "../purchaseOrder_store";
import {
  Grid,
  Paper,
  FormControl,
  Typography,
  OutlinedInput,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { DevGrid } from "base/core/table/DevGrid";
import { PAGE_SIZE } from "utils/config";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export function createPurchaseOrderDetail(services: {
  plansServices: IPlansServices;
}) {
  const presenter = createPurchaseOderPresenter(services);
  const store = presenter.createStore();
  return observer(() => {
    const { PurchaseOrderId } = useParams();

    useEffect(() => {
      presenter.getDetailPurchaseOder(store, PurchaseOrderId);
    }, []);

    const tableRows = store.dataDetails.details.map((row, key) => {
      return {
        stt: key + 1,
        purchaseOrderCode: row.purchaseOrderCode,
        poItem: row.poItem,
        plant: row.plant,
        material: row.material,
        deletionInd: row.deletionInd,
        shortText: row.shortText,
        storageLocation: row.storageLocation,
        poQuantity: row.poQuantity,
        orderUnit: row.orderUnit,
        delivCompl: row.delivCompl,
        acctAssgmtCat: row.acctAssgmtCat,
        itemCategory: row.itemCategory,
        goodsReceipt: row.goodsReceipt,
        sdDocument: row.sdDocument,
        item: row.item,
        wbsElement: row.wbsElement,
        cumulativeQuantity: row.cumulativeQuantity,
        purchaseOrderDetailId: row.purchaseOrderDetailId,
      };
    });
    const [column] = useState([
      { columnName: "stt", align: "right", width: 90, visible: "true" },
      {
        columnName: "purchaseOrderCode",
        align: "right",
        width: 180,
        visible: "true",
      },
      { columnName: "poItem", align: "right", width: 180, visible: "true" },
      { columnName: "plant", width: 180, visible: "true" },
      { columnName: "material", width: 180, visible: "true" },
      { columnName: "deletionInd", width: 180, visible: "true" },
      { columnName: "shortText", width: 180, visible: "true" },
      { columnName: "storageLocation", width: 180, visible: "true" },
      { columnName: "poQuantity", width: 180, visible: "true" },
      { columnName: "orderUnit", width: 180, visible: "true" },
      { columnName: "delivCompl", width: 100, visible: "true" },
      { columnName: "acctAssgmtCat", width: 180, visible: "true" },
      { columnName: "itemCategory", width: 180, visible: "true" },
      { columnName: "goodsReceipt", width: 180, visible: "true" },
      { columnName: "sdDocument", width: 180, visible: "true" },
      { columnName: "item", width: 180, visible: "true" },
      { columnName: "wbsElement", width: 180, visible: "true" },
      { columnName: "cumulativeQuantity", width: 180, visible: "true" },
      { columnName: "purchaseOrderDetailId", width: 180, visible: "false" },
    ]);
    const handlePageSizeChange = (value: number) => {};
    const handlePageChange = () => {};
    const navigate = useNavigate();
    const handleDetail = (e: any) => {
      if (e.purchaseOrderDetailId) {
        navigate("../purchaseOrder/printBarcode/" + e.purchaseOrderDetailId);
      }
    };
    return (
      <Fragment>
        <div className={styles.wrapperHeader}>
          <Typography className={styles.title}>
            PURCHASE ORDER DETAIL
          </Typography>
          <Button onClick={() => navigate(-1)} className={styles.buttonBack}>
            Quay lại
          </Button>
        </div>

        <Paper className={styles.paper} elevation={0}>
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
                  disabled
                  value={store.dataDetails.master.purchaseOrderCode || " "}
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
                  value={store.dataDetails.master.companyCode || " "}
                  disabled
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
                  disabled
                  value={store.dataDetails.master.documentType || " "}
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
                  disabled
                  value={store.dataDetails.master.deletionInd || " "}
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
                  disabled
                  value={store.dataDetails.master.vendorNumber}
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
                  disabled
                  value={store.dataDetails.master.purchasingOrg || " "}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={1}></Grid>

            <Grid item xs={12} md={2}>
              <Typography className={styles.label}>Ngày tạo</Typography>
            </Grid>
            <Grid item xs={12} md={3} className={styles.paddingInput}>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  className={styles.input}
                  disabled
                  value={store.dataDetails.master.createTime || ""}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <Typography className={styles.label}>Ngày cập nhật</Typography>
            </Grid>
            <Grid item xs={12} md={3} className={styles.paddingInput}>
              <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                  className={styles.input}
                  disabled
                  value={store.dataDetails.master.lastEditTime || " "}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={styles.paperPO}>
          <DevGrid
            rows={tableRows}
            column={column}
            paging={false}
            pageSize={PAGE_SIZE}
            currentPage={1}
            handleDetail={handleDetail}
            detailButton={true}
            onCurrentPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            totalRecords={store.dataDetails.details.length}
          />
        </Paper>
      </Fragment>
    );
  });
}
