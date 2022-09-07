import { Grid, Paper, Typography } from "@mui/material";
import { BASE_API_BARCODE } from "utils/config";
import styles from "./printBarcodeLocation.module.css";
export const ContentBarcode = ({
  barcode,

}: {

  barcode: string;

}) => {
  return (
    <div>
      <Grid container className={styles.wrap}>
        <Grid item>
          <img src={BASE_API_BARCODE + barcode} className={styles.imgBarcode} />
        </Grid>
      </Grid>
    </div>
  );
};
