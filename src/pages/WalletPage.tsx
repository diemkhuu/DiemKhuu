// points are awared

// 1. line 24: no export component
// 2. line 23: empty props
// 3. line 24: redundant props
// 4. line 26, 27: missing hooks: useWalletBalances, usePrices
// 5. line 28: any type
// 6. line 44: missing hooks memo
// 7. line 47: missing prop blockchain in WalletBalance
// 6. line 48: missing declare lhsPriority
// 9. line 58: missing case left-right equal
// 10. line 65: redundant formattedBalances
// 12. line 73:  missing declare WalletRow and style
// 13. line 75: div is not component => redundant rest

// interface WalletBalance {
//   currency: string;
//   amount: number;
// }
// interface FormattedWalletBalance {
//   currency: string;
//   amount: number;
//   formatted: string;
// }
// interface Props extends BoxProps {}
// const WalletPage: React.FC<Props> = (props: Props) => {
//   const { children, ...rest } = props;
//   const balances = useWalletBalances();
//   const prices = usePrices();
//   const getPriority = (blockchain: any): number => {
//     switch (blockchain) {
//       case "Osmosis":
//         return 100;
//       case "Ethereum":
//         return 50;
//       case "Arbitrum":
//         return 30;
//       case "Zilliqa":
//         return 20;
//       case "Neo":
//         return 20;
//       default:
//         return -99;
//     }
//   };
//   const sortedBalances = useMemo(() => {
//     return balances
//       .filter((balance: WalletBalance) => {
//         const balancePriority = getPriority(balance.blockchain);
//         if (lhsPriority > -99) {
//           if (balance.amount <= 0) {
//             return true;
//           }
//         }
//         return false;
//       })
//       .sort((lhs: WalletBalance, rhs: WalletBalance) => {
//         const leftPriority = getPriority(lhs.blockchain);
//         const rightPriority = getPriority(rhs.blockchain);
//         if (leftPriority > rightPriority) {
//           return -1;
//         } else if (rightPriority > leftPriority) {
//           return 1;
//         }
//       });
//   }, [balances, prices]);
//   const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
//     return {
//       ...balance,
//       formatted: balance.amount.toFixed(),
//     };
//   });
//   const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
//     const usdValue = prices[balance.currency] * balance.amount;
//     return <WalletRow className={classes.row} key={index} amount={balance.amount} usdValue={usdValue} formattedAmount={balance.formatted} />;
//   });
//   return <div {...rest}>{rows}</div>;
// };

export default function WalletPage() {
  return null;
}
