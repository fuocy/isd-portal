import React, { useEffect,forwardRef,} from "react";
import { IPlansServices } from "../../../../services/plan_services";
import { observer } from "mobx-react-lite";
import { createPurchaseOderPresenter } from "../purchaseOrder_store";
import { useParams } from "react-router-dom";
import { toJS } from "mobx";
import {  Paper, Typography, Button } from "@mui/material";
import styles from "./printBarcodePurchaseOder.module.css";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { ContentBarcode } from "./ContentBarcode";
import { Link, useNavigate } from 'react-router-dom';
export interface Props {
  barcode: string;
  batch: string;
  material: number;
  description: string;
  wbsso: string;
}
export function createPrintBarcodePurchaseOder(services: {
  plansServices: IPlansServices;
}) {
  const presenter = createPurchaseOderPresenter(services);
  const store = presenter.createStore();
  return observer(() => {
    const { PurchaseOrderDetailId } = useParams();
    useEffect(() => {
      presenter.getBarcode(store, PurchaseOrderDetailId);
    }, []);

    const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const navigate = useNavigate();
    return (
      <div>
        <div className={styles.wrapperHeader}>
          <Typography className={styles.title}>
            PRINTF BARCODE PURCHASE ODER
          </Typography>
          <Button
            onClick={() => navigate(-1)}
            className={styles.buttonBack}
          >
            Quay lại
          </Button>
       
        </div>
        <Paper className={styles.paper}>
          <ComponentToPrint
            ref={ref}
            barcode={store.infoBarcodePurchaseOder.barcode}
            batch={store.infoBarcodePurchaseOder.data.batch}
            description={store.infoBarcodePurchaseOder.data.description}
            material={store.infoBarcodePurchaseOder.data.material}
            wbsso={store.infoBarcodePurchaseOder.data.wbsso} 
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
    );
  });
}

const ComponentToPrint = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div ref={ref}>
      <ContentBarcode
        barcode={props.barcode}
        batch={props.batch}
        description={props.description}
        material={props.material}
        wbsso={props.wbsso}
      />
    </div>
  );
});
