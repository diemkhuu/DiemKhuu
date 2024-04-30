import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { svgUrl } from "../util/constraints";

export interface ConfirmationDialogRawProps {
  options: Record<string, any>[];
  id: string;
  keepMounted: boolean;
  value: Record<string, any>;
  open: boolean;
  onClose: (value?: Record<string, any>) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, options, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp.currency);
  const radioGroupRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    const valueSelected = options.find((el) => el.currency === value);
    onClose(valueSelected);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }} maxWidth="xs" TransitionProps={{ onEntering: handleEntering }} open={open} {...other}>
      <DialogTitle>Currency</DialogTitle>
      <DialogContent dividers>
        <RadioGroup ref={radioGroupRef} aria-label="currency" name="currency" value={value} onChange={handleChange}>
          {options.map((option: Record<string, any>) => (
            <Box sx={{ alignItems: "flex-start", justifyContent: "center" }}>
              <FormControlLabel value={option.currency} key={option.currency} control={<Radio />} label={option.currency} />
              <img src={`${svgUrl}/${option?.currency}.svg`} width="25" className="pr-1" />
            </Box>
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialogRaw;
