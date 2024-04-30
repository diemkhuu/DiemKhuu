// import React from "react";
import React, { useMemo } from "react";
import { FormattedWalletBalance, WalletBalance } from "../util/constraints";
import WalletRow from "./WalletRow";
import { useWalletBalances } from "../hooks/useWalletBalances";
import { usePrices } from "../hooks/usePrices";
import { Box, List } from "@mui/material";

// interface Props extends BoxProps {}
type TPrices = Record<string, any>;
const WalletPage: React.FC = () => {
  // const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices: TPrices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    const filteredBalances = balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      if (balancePriority > -99 && balance.amount <= 0) {
        return true;
      }
      return false;
    });

    const sortedFilteredBalances = filteredBalances.sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
      return 0;
    });

    return sortedFilteredBalances;
  }, [balances, prices]);

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency as keyof TPrices] * balance.amount;
    return <WalletRow key={index} usdValue={usdValue} balance={balance} />;
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="div" role="group">
        {rows}
      </List>
    </Box>
  );
};

export default WalletPage;
