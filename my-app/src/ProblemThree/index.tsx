import { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  // Missing type blockchain
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// Missing interface for BoxProps
// interface Props extends BoxProps {}

interface Props {}

const WalletPage: React.FC<Props> = (props: Props) => {
  // Unused variables, remove this
  // const { children, ...rest } = props;
  const { ...rest } = props;

  // Missing hooks
  const balances = useWalletBalances();
  const prices = usePrices();

  // Param is type "any", since its compare to string, so assume it's type is string
  // const getPriority = (blockchain: any): number => {
  const getPriority = (blockchain: string): number => {
    // Should declare an enum for this comparison
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
    return balances
      .filter((balance: WalletBalance) => {
        // Unused variables, remove this line
        // const balancePriority = getPriority(balance.blockchain);

        // lhsPriority not found, change lhsPriority to balance amount
        // This condition is not optimized since there is two if statement, can merge into one check
        // if (lhsPriority > -99) {
        //   if (balance.amount <= 0) {
        //     return true;
        //   }
        // }
        // return false;
        if (balance.amount > -99 && balance.amount < 0) return true;
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        // Sorting callback not optimized, we do not need to declare too many variables

        // const leftPriority = getPriority(lhs.blockchain);
        // const rightPriority = getPriority(rhs.blockchain);
        // if (leftPriority > rightPriority) {
        //   return -1;
        // } else if (rightPriority > leftPriority) {
        //   return 1;
        // }
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
      });
    // prices is not necessary dependency
    // }, [balances, prices]);
  }, [balances]);

  // Unused variable
  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed(),
  //   };
  // });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        // Missing components
        <WalletRow
          // Missing classes file css
          // className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
