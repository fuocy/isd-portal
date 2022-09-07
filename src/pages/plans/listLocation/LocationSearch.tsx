import React, { useEffect, useState, Fragment } from "react";
import {
  Grid,
  Paper,
  FormControl,
  Typography,
  OutlinedInput,
  Button,
} from "@material-ui/core";
import styles from "./locationSearch.module.css";
const defaultValues = {
  plant: "",
  warehouse: "",
  storageBin: "",
  sloc: "",
  storageType: "",
};
export const LocationSearch = ({presenter,store,pageSize}:{presenter:any,store:any,pageSize:number}) => {
 
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    presenter(store, {
      paging: {
        draw: 1,
        start: 0,
        length: pageSize,
      },
      "plant": formValues.plant,
      "sloc": formValues.sloc,
      "warehouseNo": formValues.warehouse,
      "storageType": formValues.storageType,
      "storageBin": formValues.storageBin,
     
    });
  };
  return (
    <Paper className={styles.paper} elevation={0}>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={2}>
            <Typography className={styles.label}>Plant</Typography>
          </Grid>
          <Grid item xs={12} md={3} className={styles.paddingInput}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                name="plant"
                className={styles.input}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography className={styles.label}>Warehouse No</Typography>
          </Grid>
          <Grid item xs={12} md={3} className={styles.paddingInput}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                className={styles.input}
                name="warehouse"
                onChange={handleInput}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={2}>
            <Typography className={styles.label}>Storage Bin</Typography>
          </Grid>
          <Grid item xs={12} md={3} className={styles.paddingInput}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                className={styles.input}
                name="storageBin"
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography className={styles.label}>Sloc </Typography>
          </Grid>
          <Grid item xs={12} md={3} className={styles.paddingInput}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                className={styles.input}
                name="sloc"
                onChange={handleInput}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={2}>
            <Typography className={styles.label}>Storage Type</Typography>
          </Grid>
          <Grid item xs={12} md={3} className={styles.paddingInput}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                className={styles.input}
                name="storageType"
                onChange={handleInput}
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
  );
};
