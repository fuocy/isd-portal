import React, { useEffect, useState, Fragment } from "react";
import {
  Grid,
  Paper,
  FormControl,
  Typography,
  OutlinedInput,
  Button,
} from "@material-ui/core";
import styles from "./vendorSearch.module.css";
const defaultValues = {
  supplierNumber: "",
  longName: "",
  address: "",
  shortName: "",
  telephone: "",
};
export const VendorSearch = ({presenter,store,pageSize}:{presenter:any,store:any,pageSize:number}) => {
 
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
      "supplierNumber": formValues.supplierNumber,
      "shortName": formValues.shortName,
      "longName": formValues.longName,
      "address": formValues.address,
      "telephone": formValues.telephone,
     
    });
  };
  return (
    <Paper className={styles.paper} elevation={0}>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} md={2}>
            <Typography className={styles.label}>Supplier number</Typography>
          </Grid>
          <Grid item xs={12} md={3} className={styles.paddingInput}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                name="supplierNumber"
                className={styles.input}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography className={styles.label}>Short name</Typography>
          </Grid>
          <Grid item xs={12} md={3} className={styles.paddingInput}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                className={styles.input}
                name="shortName"
                onChange={handleInput}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={2}>
            <Typography className={styles.label}>Address</Typography>
          </Grid>
          <Grid item xs={12} md={3} className={styles.paddingInput}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                className={styles.input}
                name="address"
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography className={styles.label}>Long name </Typography>
          </Grid>
          <Grid item xs={12} md={3} className={styles.paddingInput}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                className={styles.input}
                name="longName"
                onChange={handleInput}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={2}>
            <Typography className={styles.label}>Telephone</Typography>
          </Grid>
          <Grid item xs={12} md={3} className={styles.paddingInput}>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInput
                className={styles.input}
                name="telephone"
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
