// import React, { useEffect, useState } from "react";
// import { observer } from "mobx-react-lite";
// import { IPlansServices } from "../../../services/plan_services";
// export function createVendor(services: { plansServices: IPlansServices }) {
//   return observer(() => {
//     return <div>ddaay la vendor </div>;
//   });
// }

import React, { useEffect, useState, forwardRef } from "react";
import { IPlansServices } from "../../../services/plan_services";
import { observer } from "mobx-react-lite";
import { createVendorPresenter } from "./vendor_store";
import { useParams } from "react-router-dom";
import {  Paper, Typography, Button } from "@mui/material";
import styles from "./listVendor.module.css";
import { toJS } from "mobx";
import {VendorSearch} from './VendorSearch'
import { DevGrid } from "base/core/table/DevGrid";
import { PAGE_SIZE } from "utils/config";
export function createVendor(services: {
  plansServices: IPlansServices;
}) {
  const presenter = createVendorPresenter(services);
  const store = presenter.createStore();
  return observer(() => {
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [page, setPage] = useState(1);
    useEffect(() => {
      presenter.getVenderList(store,{
        "paging": {
            "draw": 1,
            "start": 0,
            "length": pageSize
        },
       
    });
    }, []);
    //data table
    const tableRows = store.dataVendorList.data.map((row: any, key: any) => {
        return {
          stt: row.stt,
          supplierNumber: row.supplierNumber,
          shortName: row.shortName,
          longName: row.longName,
          adderss: row.adderss,
          telephone: row.telephone,
      
        };
      });
      // header table
      const [column] = useState([
        { columnName: "stt", width: 90, align: "center", visible: "true" },
        {
          columnName: "supplierNumber",
          width: 270,
          align: "center",
          visible: "true",
        },
        {
          columnName: "shortName",
          width: 270,
          align: "left",
          visible: "true",
        },
        {
          columnName: "longName",
          width: 270,
          align: "left",
          visible: "true",
        },
        {
          columnName: "adderss",
          width: 270,
          align: "left",
          visible: "true",
        },
        {
          columnName: "telephone",
          width: 270,
          align: "left",
          visible: "true",
        },
       
      ]);
      //number row in page
      const handlePageSizeChange = (value: number) => {
        setPageSize(value);
        presenter.getVenderList(store, {
          paging: {
            draw: page,
            start: (page - 1) * value,
            length: value,
          },
        });
      };
      const handlePageChange = (value: any) => {
        setPage(value);
        presenter.getVenderList(store, {
          paging: {
            draw: page,
            start: pageSize * (value - 1),
            length: pageSize,
          },
        });
      };
    //   const navigate = useNavigate();
      const handleDetail = (e: any) => {
    //     console.log(e)
    //     if (e.storageBinId) {
    //       navigate(`./printBarcode/`+e.storageBinId);
    //       // return <Navigate to={`/printBarcode/${e.storageBinId}`} replace />;
    //     }
      };
    //   console.log(toJS( ))
    return (
      
      <div className={styles.wrapperHeader}>
        <Typography className={styles.title}>
         LIST VENDOR 
        </Typography>
        <VendorSearch
         presenter={presenter.getVenderList}
         store={store}
         pageSize={pageSize}
        />
        <Paper elevation={0} className={styles.paperTable}>
          <DevGrid
            rows={tableRows}
            column={column}
            detailButton={false}
            handleDetail={handleDetail}
            // Page+
            paging={true}
            currentPage={page}
            pageSize={pageSize}
            totalRecords={store.dataVendorList.recordsTotal}
            onCurrentPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Paper>
  
    </div>
    )
  });
}
