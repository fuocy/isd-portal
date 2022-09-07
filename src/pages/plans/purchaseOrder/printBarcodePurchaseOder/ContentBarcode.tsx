import { Grid, Paper, Typography } from "@mui/material";
import { BASE_API_BARCODE } from "utils/config";
import styles from "./printBarcodePurchaseOder.module.css";
export const ContentBarcode = ({
  batch,
  barcode,
  description,
  material,
  wbsso,
}: {
  batch: string;
  barcode: string;
  description: string;
  material: number;
  wbsso: string;
}) => {
  return (
    <div>
      <Grid container className={styles.wrap}>
        <Grid item>
          <img src={BASE_API_BARCODE + barcode} className={styles.imgBarcode} />
        </Grid>
        <Grid item className={styles.dataBarcode}>
          <div>
            <div className={styles.textBarcode}>
              <Typography className={styles.titleBarcode}>
                Mat. : &nbsp;{" "}
              </Typography>

              <Typography variant="h6">{material}</Typography>
            </div>
            <div className={styles.textBarcode}>
              <Typography className={styles.titleBarcode}>
                Des.: &nbsp;
              </Typography>
              <Typography variant="h6">{description}</Typography>
            </div>
            <div className={styles.textBarcode}>
              <Typography className={styles.titleBarcode}>
                Batch: &nbsp;
              </Typography>
              <Typography variant="h6">{batch}</Typography>
            </div>
            <div className={styles.textBarcode}>
              <Typography className={styles.titleBarcode}>
                WBS./SO:&nbsp;
              </Typography>
              <Typography variant="h6">{wbsso}</Typography>
            </div>
          </div>
        </Grid>
        {/* </div> */}
      </Grid>
    </div>
  );
};
