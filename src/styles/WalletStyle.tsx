import { createStyles, makeStyles, Theme } from "@material-ui/core";

const WalletStyleStyle = (theme: Theme) =>
  createStyles({
    row: {},
  });

const useWalletStyleStyle = makeStyles((theme: Theme) => WalletStyleStyle(theme));

export default useWalletStyleStyle;
