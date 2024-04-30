import React from "react";
import { TRate, TRateList, currencyUrl, svgUrl } from "../util/constraints";
import { Box, Button, ListItem, TextField, Typography } from "@mui/material";
import Dialog from "./Dialog";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SwapVerticalCircleRoundedIcon from "@mui/icons-material/SwapVerticalCircleRounded";

export default function ConfirmationDialog() {
  const [openInput, setOpenInputdialog] = React.useState(false);
  const [openOutput, setOpenOutputDialog] = React.useState(false);

  const [inputCurreny, setInputCurrency] = React.useState<TRate>();
  const [outputCurrency, setOutputCurrency] = React.useState<TRate>();

  const [inputAmount, setInputAmount] = React.useState(0);
  const [outputAmount, setOutputAmount] = React.useState(0);

  const [rate, setRate] = React.useState<TRateList>([]);

  const handleClickInputItem = () => {
    setOpenInputdialog(true);
  };
  const handleClickOutputItem = () => {
    setOpenOutputDialog(true);
  };

  const inputAmountHandleClose = (newValue?: Record<string, any>) => {
    setOpenInputdialog(false);

    if (newValue) {
      setInputCurrency(newValue as TRate);
    }
  };
  const outputAmountHandleClose = (newValue?: Record<string, any>) => {
    setOpenOutputDialog(false);

    if (newValue) {
      setOutputCurrency(newValue as TRate);
    }
  };

  const onHandleSwap = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const price = rate.find((i) => i.currency === inputCurreny?.currency)?.price;
    if (price) {
      const result = inputAmount * price;
      setOutputAmount(Math.floor(result * 100) / 100);
    }
    return 0;
  };

  const resetValue = () => {
    setInputAmount(0);
    setOutputAmount(0);
  };

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(currencyUrl);
      if (!response.ok) {
        throw new Error("faild");
      }

      const data = await response.json();
      const uniqueData = data.reduce((acc: TRate[], el: TRate) => {
        const existingType = acc.find((e) => e.currency === el.currency);
        if (!existingType) {
          acc.push(el);
        }
        return acc;
      }, []);

      return uniqueData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  React.useEffect(() => {
    fetchExchangeRate().then((data) => {
      if (data) {
        setRate(data);
        setInputCurrency(data[0]);
        setOutputCurrency(data[0]);
      } else {
        console.log("fetching data fail");
      }
    });
  }, []);

  return (
    <form onSubmit={(e) => onHandleSwap(e)}>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List component="div" role="group">
          <ListItem divider>
            <Typography variant="h5" gutterBottom>
              Swap
            </Typography>
          </ListItem>

          <ListItemButton divider aria-haspopup="true" aria-controls="currency-menu" aria-label="currency" onClick={handleClickInputItem}>
            <ListItemText primary="Amount to send" secondary={inputCurreny?.currency} />
            <img src={`${svgUrl}/${inputCurreny?.currency}.svg`} width="25" className="pr-1" />
          </ListItemButton>

          <ListItem>
            <TextField
              hiddenLabel
              id="input-amount"
              defaultValue="Small"
              variant="filled"
              size="small"
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={inputAmount}
              onChange={(e) => setInputAmount(+e.target.value)}
            />
          </ListItem>
          <ListItemButton divider aria-haspopup="true" aria-controls="currency-menu" aria-label="currency" onClick={handleClickOutputItem}>
            <ListItemText primary="Amount to receive" secondary={outputCurrency?.currency} />
            <img src={`${svgUrl}/${outputCurrency?.currency}.svg`} width="25" className="pr-1" />
          </ListItemButton>
          <ListItem>
            <TextField
              hiddenLabel
              id="output-amount"
              defaultValue="Small"
              variant="filled"
              size="small"
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={outputAmount}
              onChange={(e) => setOutputAmount(+e.target.value)}
            />
          </ListItem>
          <ListItem>
            <Button type="submit" variant="outlined" startIcon={<SwapVerticalCircleRoundedIcon />} fullWidth>
              CONFIRM SWAP
            </Button>
          </ListItem>
          <ListItem>
            <Button type="button" variant="outlined" startIcon={<SwapVerticalCircleRoundedIcon />} fullWidth onClick={resetValue}>
              RESET
            </Button>
          </ListItem>
          <Dialog id="input-amount" keepMounted open={openInput} onClose={inputAmountHandleClose} value={inputCurreny || {}} options={rate} />
          <Dialog id="output-amount" keepMounted open={openOutput} onClose={outputAmountHandleClose} value={outputCurrency || {}} options={rate} />
        </List>
      </Box>
    </form>
  );
}
