import { useForm } from "@mantine/form";
import {
  TextInput,
  Select,
  Button,
  NumberInput,
  type SelectProps,
  CheckIcon,
} from "@mantine/core";
import ExchangePrice from "./components/prices.json";
import { useState } from "react";
import { LazySvg } from "./components/LazyImage";

type FormType = {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
};

const iconProps = {
  stroke: "1.5",
  color: "currentColor",
  opacity: 0.6,
  size: 10,
};

const renderSelectOption: SelectProps["renderOption"] = ({
  option,
  checked,
}) => {
  return (
    <div className="flex items-center gap-2 w-full">
      {
        <LazySvg
          className="w-4 h-4"
          name={
            ExchangePrice?.find((item) => item?.currency === option.value)
              ?.currency as string
          }
          {...iconProps}
        />
      }
      {option.label}
      {checked && (
        <CheckIcon style={{ marginInlineStart: "auto" }} {...iconProps} />
      )}
    </div>
  );
};

const ProblemTwo = () => {
  const [result, setResult] = useState<number>(0);
  const form = useForm<FormType>({
    initialValues: {
      fromCurrency: "",
      toCurrency: "",
      amount: 0,
    },
  });

  function convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number {
    const currencyData = ExchangePrice;

    const fromCurrencyData = currencyData.find(
      (data) => data.currency === fromCurrency
    );
    const toCurrencyData = currencyData.find(
      (data) => data.currency === toCurrency
    );

    if (!fromCurrencyData || !toCurrencyData) {
      return 0;
    }

    const convertedAmount =
      (amount / fromCurrencyData.price) * toCurrencyData.price;
    return convertedAmount;
  }

  const handleSubmit = (values: FormType) => {
    setResult(
      convertCurrency(
        Number(values?.amount),
        values?.fromCurrency,
        values?.toCurrency
      )
    );
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="p-4 rounded-md bg-slate-200"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Select
            label="From"
            placeholder="Select"
            className="w-60"
            data={ExchangePrice.map((item) => ({
              label: item?.currency,
              value: item?.currency,
            }))}
            renderOption={renderSelectOption}
            {...form.getInputProps("fromCurrency")}
          />
          <Select
            label="To Currency"
            className="w-60"
            placeholder="Select currency"
            data={ExchangePrice.map((item) => ({
              label: item?.currency,
              value: item?.currency,
            }))}
            renderOption={renderSelectOption}
            {...form.getInputProps("toCurrency")}
          />
        </div>
        <div className="flex gap-4">
          <NumberInput
            label="Amount"
            className="w-60"
            placeholder="Enter amount"
            min={0}
            {...form.getInputProps("amount")}
          />

          <TextInput
            className="w-60"
            label="result"
            placeholder="Enter amount"
            value={result}
            disabled
          />
        </div>
        <Button type="submit" className="mt-4">
          Swap
        </Button>
      </div>
    </form>
  );
};

export default ProblemTwo;
