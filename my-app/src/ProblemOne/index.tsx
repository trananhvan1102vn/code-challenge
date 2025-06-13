import React, { useState } from "react";

const ProblemOne = () => {
  const [number, setNumber] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setNumber(Number(value));
    }
  };

  function sum_to_n_a(n: number) {
    if (n <= 0) return 0;
    let sum: number = 0;
    for (let index = 0; index <= n; index++) {
      sum = sum + index;
    }
    return sum;
  }

  function sum_to_n_b(n: number): number {
    if (n <= 0) return 0;
    return n + sum_to_n_b(n - 1);
  }

  function sum_to_n_c(n: number): number {
    if (n <= 0) return 0;

    return Array.from({ length: n }, (_, i) => i + 1).reduce(
      (sum, current) => sum + current,
      0
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        value={number}
        onChange={handleChange}
        className="border rounded p-2"
        placeholder="Enter a number"
      />
      <div className="flex flex-col gap-4">
        <div>{sum_to_n_a(number)}</div>
        <div>{sum_to_n_b(number)}</div>
        <div>{sum_to_n_c(number)}</div>
      </div>
    </div>
  );
};

export default ProblemOne;
