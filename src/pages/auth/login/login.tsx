import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import styles from './login.module.css';
import { Select, MenuItem, Paper, Grid, Typography, FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@material-ui/core';
import logo from '../../../assets/logo.png';
import Visibility from "../../../base/core/icon/Visibility";
import VisibilityOff from "../../../base/core/icon/VisibilityOff";
import CustomSelect from "base/core/customSelect/CustomSelect";
import { Company, ICompanyServices } from "services/company_list_services";
import { createCompanyPresenter } from "./user_store";
import { Link, useNavigate } from 'react-router-dom';
import { toJS } from "mobx";
interface FormValues {
  userName: string;
  // company: { companyCode: string; companyName: string };
  password: string;
  saleOrg: string;
  companyCode:string;
}

const SignupSchema = yup
  .object({
    userName: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export function createLogin(services: {
  companyServices: ICompanyServices
}) {
  // create store/presenter
  const presenter = createCompanyPresenter(services)
  const store = presenter.createStore();
  // sử dụng store.XXX ngay trong observer để khi XXX thay đổi thì component sẽ dc render lại
  return observer(() => {
    // load data khi component dc mount
    const [values, setValues] = React.useState({
      password: "",
      showPassword: false,
    });
    const [hiddenSelect, setHiddenSelect] = React.useState<string>('');
    const [selectCompany, setSelectCompany] = React.useState<string>('');
    const {
      register,
      handleSubmit,
      control,
      formState: { errors }
    } = useForm<FormValues>({
      resolver: yupResolver(SignupSchema),
    });
    const navigate = useNavigate();
 
    //======================hidden show password==================//
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
    const onchangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        setHiddenSelect(e.target.value);
      }
    };
   //======================== call api get company get salORG======================
    useEffect(() => { presenter.getCompanies(store, hiddenSelect) }, [hiddenSelect]);
    useEffect(() => {
      presenter.getSaleORG(store,hiddenSelect, selectCompany);
    }, [hiddenSelect, selectCompany]); 
    //======================= handle Submit form login ============================//
    const onSubmit = (data: FormValues) => {
      data.saleOrg = store.saleOrg[0].saleOrgCode;
      data.companyCode=selectCompany;   
      presenter.login(store, data)  
       
    }
    
 const handlechangeSelect =(e:any)=>{
        setSelectCompany(e)
 }

    return (
      <div className={styles.background}>
        <div className={styles.paperForm}>
          <Paper className={styles.paperWrapper}>
            <img className={styles.logo} src={logo} alt="logo" />
            <br />
            <Typography className={styles.title}>Đăng Nhập</Typography>
            <form  onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item md={12} xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <Typography className={styles.label}>
                      Tên Đăng Nhập
                    </Typography>
                    <OutlinedInput
                      {...register("userName")}
                      className={styles.input}
                      placeholder="Tên Tài Khoản"
                      onChange={onchangeUserName}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <Typography className={styles.label}>
                      Mật khẩu
                    </Typography>
                    <OutlinedInput
                      {...register("password")}
                      className={styles.input}
                      placeholder="Mật khẩu"
                      type={values.showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            className={styles.IconButton}
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>


                { hiddenSelect ? (<Grid item md={12} xs={12}>
                    <FormControl fullWidth>
                      <Typography className={styles.label}>Công ty</Typography>

                      <CustomSelect
                             handlechangeSelect={handlechangeSelect}
                         
                              companies={store.companies}
                            />
                    </FormControl>
                  </Grid>) : ("")
                }
                {/* {errors.company && <p>{errors.company.companyName?.message}</p>} */}
                <Grid item md={12} xs={12}>
                  <Typography>
                    <a
                      style={{
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "#0b6aaf",
                      }}
                    >
                      Quên mật khẩu?
                    </a>
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={styles.button}
                  >
                    ĐĂNG NHẬP
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
      </div>
    );
  });
}



