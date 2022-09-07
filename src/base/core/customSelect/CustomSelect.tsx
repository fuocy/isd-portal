import React from "react";
import PropTypes from "prop-types";
import { toJS } from "mobx";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem, OutlinedInput } from "@material-ui/core";
import { Company  } from "services/company_list_services";

const useStyles = makeStyles(() => ({
  input: {
    borderRadius: "48px",
    background: "#F7FAFB",
  },
}));


const CustomSelect = (
{
  companies,handlechangeSelect
}: {
  companies: Array<Company>;
  handlechangeSelect?: (newType: string) => void;
}
) => {

  const classes = useStyles();
  const [value, setValue] = React.useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    if (e.target.value) {
     
      setValue(e.target.value as string);
      handlechangeSelect?.(e.target.value as string)
  };
}

  return (
    <Select
      displayEmpty
      value={value}
      onChange={handleOnChange}
      input={<OutlinedInput />}
      className={classes.input}
      inputProps={{ "aria-label": "Without label" }}
    >
      <MenuItem disabled value="">
        <em>Công ty</em>
      </MenuItem>
      {companies.length > 0
        ? companies.map((name,i) => (
            <MenuItem
              key={i}
              value={name.companyCode}
              
              // style={getStyles(name, personName, theme)}
            >
              {name.companyName}
            </MenuItem>
          ))
        : ""}
    </Select>
  );
};

CustomSelect.propTypes = {};

export default CustomSelect;
