import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
function Filters(props) {
  const FilterHandler = (e) => {
    // console.log(e);
    props.filter(e);
  };
  return (
    <FormControl
      sx={{
        background: "linear-gradient(45deg, #9c55a7 30%, #e273df 90%)",
        color: "white",
        display: "inline-block",
        width: "98%",
      }}
    >
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="all"
          checked={props.filterName === "all"}
          control={<Radio />}
          label="All"
          onChange={(e) => FilterHandler("all")}
        />
        <FormControlLabel
          value="solved"
          checked={props.filterName === "solved"}
          control={<Radio />}
          label="Solved"
          onChange={(e) => FilterHandler("solved")}
        />
        <FormControlLabel
          value="unsolved"
          checked={props.filterName === "unsolved"}
          control={<Radio />}
          label="Unsolved"
          onChange={(e) => FilterHandler("unsolved")}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default Filters;
