import { FormControlLabel, Checkbox } from "@mui/material";

const CheckBox = ({ label, option, handleCheck, name }: CheckBoxProps) => {
  return (
    <FormControlLabel
      sx={{ color: "white", width: "100%" }}
      control={
        <Checkbox
          sx={{ color: "white" }}
          checked={option}
          name={name}
          onChange={handleCheck}
        />
      }
      label={label}
      labelPlacement="end"
    />
  );
};
export default CheckBox;
