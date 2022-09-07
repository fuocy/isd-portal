import React, { useEffect, useState, forwardRef } from "react";
import { IPlansServices } from "../../../../services/plan_services";
import { observer } from "mobx-react-lite";
import { createLocationPresenter } from "../location_store";
import { useParams } from "react-router-dom";
import {  Paper, Typography, Button } from "@mui/material";
import styles from "./printBarcodeLocation.module.css";
import { toJS } from "mobx";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { Link, useNavigate } from 'react-router-dom';
import { ContentBarcode } from "./ContentBarcode";
export interface Props {
  barcode: string;
}
export function createPrintBarcodeLocation(services: {
  plansServices: IPlansServices;
}) {
  const presenter = createLocationPresenter(services);
  const store = presenter.createStore();
  return observer(() => {
    const { StorageBinId } = useParams();
    useEffect(() => {
      presenter.getBarcode(store,StorageBinId);
    }, []);
    const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    return (
      <div>
      <div className={styles.wrapperHeader}>
        <Typography className={styles.title}>
          PRINTF BARCODE LOCATION
        </Typography>
  
        <Button component={Link} to="../MasterData/StorageBin/" className={styles.buttonBack}>
            Quay lại
          </Button>
      </div>
      <Paper className={styles.paper}>
        <ComponentToPrint
          ref={ref}
          barcode={store.infoBarcode.data}
    
        />
        {/* @ts-ignore */}
        <ReactToPrint content={() => ref.current} >
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <div style={{ textAlign: "center"}}>
                <Button onClick={handlePrint} className={styles.printf}>
                  Print this out!
                </Button>
              </div>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
      </Paper>
    </div>
    )
  });
}
const ComponentToPrint = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div ref={ref}>
      <ContentBarcode
        barcode={props.barcode}
    
      />
    </div>
  );
});