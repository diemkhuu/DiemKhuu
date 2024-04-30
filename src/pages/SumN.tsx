import React from "react";
import { Typography } from "@mui/material";

export default function SumN() {
  var sum_to_n_a = function (n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  };

  var sum_to_n_b = function (n: number): number {
    let sum = 0;
    let i = 1;
    while (i <= n) {
      sum += i;
      i++;
    }
    return sum;
  };

  var sum_to_n_c = function (n: number): number {
    if (n === 1) {
      return 1;
    }
    return n + sum_to_n_c(n - 1);
  };

  return (
    <Typography variant="h5" gutterBottom>
      {`result: ${sum_to_n_a(5)} ${sum_to_n_b(5)} ${sum_to_n_c(5)}`}
    </Typography>
  );
}
