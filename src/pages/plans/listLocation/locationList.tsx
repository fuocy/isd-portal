import React, { useEffect, useState, Fragment } from "react";
import { IPlansServices } from "../../../services/plan_services";
import { observer } from "mobx-react-lite";
import { Typography } from "@mui/material";
import { LocationSearch } from "./LocationSearch";
import { createLocationPresenter } from "./location_store";
import { useNavigate } from "react-router-dom";
import { DevGrid } from "base/core/table/DevGrid";
import { Paper } from "@material-ui/core";
import moment from "moment";
import { PAGE_SIZE } from "utils/config";
import styles from "./locationList.module.css";
import { Navigate } from "react-router-dom";
export function createLocationList(services: {
  plansServices: IPlansServices;
}) {
  const presenter = createLocationPresenter(services);
  const store = presenter.createStore();
  return observer(() => {
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [page, setPage] = useState(1);
    //GET data table call API
    useEffect(() => {
      presenter.location(store, {
        paging: {
          draw: 1,
          start: 0,
          length: pageSize,
        },
      });
    }, []);
    //data table
    const tableRows = store.locationData.data.map((row: any, key: any) => {
      return {
        stt: row.stt,
        plant: row.plant,
        sloc: row.sloc,
        warehouseNo: row.warehouseNo,
        storageType: row.storageType,
        storageBin: row.storageBin,
        storageBinId: row.storageBinId,
      };
    });
    // header table
    const [column] = useState([
      { columnName: "stt", width: 90, align: "center", visible: "true" },
      {
        columnName: "storageBinId",
        width: 90,
        align: "center",
        visible: "false",
      },
      {
        columnName: "plant",
        width: 250,
        align: "left",
        visible: "true",
      },
      {
        columnName: "sloc",
        width: 250,
        align: "left",
        visible: "true",
      },
      {
        columnName: "warehouseNo",
        width: 250,
        align: "right",
        visible: "true",
      },
      {
        columnName: "storageType",
        width: 250,
        align: "right",
        visible: "true",
      },
      {
        columnName: "storageBin",
        width: 250,
        align: "right",
        visible: "true",
      },
    ]);
    //number row in page
    const handlePageSizeChange = (value: number) => {
      setPageSize(value);
      presenter.location(store, {
        paging: {
          draw: page,
          start: (page - 1) * value,
          length: value,
        },
      });
    };
    const handlePageChange = (value: any) => {
      setPage(value);
      presenter.location(store, {
        paging: {
          draw: page,
          start: pageSize * (value - 1),
          length: pageSize,
        },
      });
    };
    const navigate = useNavigate();
    const handleDetail = (e: any) => {
      if (e.storageBinId) {
        navigate(`./printBarcode/`+e.storageBinId);
      }
    };

    return (
      <div>
        <Typography className={styles.title}>Location List</Typography>
        <LocationSearch
          presenter={presenter.location}
          store={store}
          pageSize={pageSize}
        />
        <Paper elevation={0} className={styles.paperTable}>
          <DevGrid
            rows={tableRows}
            column={column}
            handleDetail={handleDetail}
            detailButton={true}
            // Page+

            paging={true}
            currentPage={page}
            pageSize={pageSize}
            totalRecords={store.locationData.recordsTotal}
            onCurrentPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Paper>
      </div>
    );
  });
}
