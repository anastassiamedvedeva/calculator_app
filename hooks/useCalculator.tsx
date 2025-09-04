import { useState } from 'react';

// Type definitions
type Operator = '+' | '-' | '*' | '/' | null;

interface CalculatorHook {
  displayValue: string;
  handleDigit: (digit: string) => void;
  handleDecimal: () => void;
  handleOperator: (op: string) => void;
  handleEquals: () => void;
  handleClear: () => void;
  handleBackspace: () => void;
}

const MAX_DISPLAY_LENGTH = 16;
const ERROR_MESSAGE = 'Error';

export const useCalculator = (): CalculatorHook => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const formatNumber = (value: string): string => {
    const num = parseFloat(value);
    if (isNaN(num)) return ERROR_MESSAGE;
    if (Math.abs(num) >= 1e16) return num.toExponential(10);
    return num.toString();
  };

  const calculate = (firstValue: number, secondValue: number, op: Operator): number => {
    if (!op) throw new Error('Invalid operator');
    
    switch (op) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/':
        if (secondValue === 0) throw new Error('Division by zero');
        return firstValue / secondValue;
      default: throw new Error('Unknown operator');
    }
  };

  const resetCalculator = () => {
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleDigit = (digit: string) => {
    if (!/^[0-9]$/.test(digit)) {
      console.error('Invalid digit input');
      return;
    }

    if (displayValue.length >= MAX_DISPLAY_LENGTH) return;

    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else if (!displayValue.includes('.') && displayValue.length < MAX_DISPLAY_LENGTH) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      try {
        const result = calculate(previousValue, inputValue, operator);
        const formattedResult = formatNumber(result.toString());
        setPreviousValue(result);
        setDisplayValue(formattedResult);
      } catch {
        setDisplayValue(ERROR_MESSAGE);
        resetCalculator();
        return;
      }
    }

    setWaitingForOperand(true);
    setOperator(nextOperator as Operator);
  };

  const handleEquals = () => {
    if (!operator || previousValue === null) return;

    try {
      const result = calculate(previousValue, parseFloat(displayValue), operator);
      const formattedResult = formatNumber(result.toString());
      setDisplayValue(formattedResult);
      resetCalculator();
    } catch {
      setDisplayValue(ERROR_MESSAGE);
      resetCalculator();
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
    resetCalculator();
  };

  const handleBackspace = () => {
    if (waitingForOperand || displayValue === ERROR_MESSAGE) return;
    
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue('0');
    }
  };

  return {
    displayValue,
    handleDigit,
    handleDecimal,
    handleOperator,
    handleEquals,
    handleClear,
    handleBackspace,
  };
};

export default useCalculator;