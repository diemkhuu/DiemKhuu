export type TRate = {
  currency: string;
  date: string;
  price: number;
};

export type TRateList = TRate[];

export const svgUrl = "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";
export const currencyUrl = "https://interview.switcheo.com/prices.json";

export interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
