import React from "react";
import { FormattedWalletBalance, svgUrl } from "../util/constraints";
import useWalletStyleStyle from "../styles/WalletStyle";
import { ListItem, Typography } from "@mui/material";

interface Props {
  key: number;
  usdValue: number;
  balance: FormattedWalletBalance;
}
const WalletPage: React.FC<Props> = (props: Props) => {
  const classes = useWalletStyleStyle();
  const { balance } = props;

  return (
    <ListItem divider className={classes.row}>
      <Typography variant="h5" gutterBottom>
        {balance.currency} - {balance.amount}
      </Typography>
    </ListItem>
  );
};

export default WalletPage;
