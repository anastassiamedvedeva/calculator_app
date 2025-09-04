import React from 'react';
import useCalculator from '../../hooks/useCalculator';

const App: React.FC = () => {
  const {
    displayValue,
    handleDigit,
    handleDecimal,
    handleOperator,
    handleEquals,
    handleClear,
    handleBackspace,
  } = useCalculator();

  const buttonClass = "transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 rounded-xl";
  const digitClass = `${buttonClass} bg-[#A4C944] text-white`;
  const operatorClass = `${buttonClass} bg-[#82D0EF] text-white`;
  const clearClass = `${buttonClass} bg-[#F59759] text-white`;
  const backButtonClass = `${buttonClass} bg-[#7D5BA6] text-white`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans p-4 bg-[#FBEECD]">
      <Header />
      <div className="w-full max-w-sm p-4 rounded-2xl shadow-2xl bg-purple-200">
        <Display value={displayValue} />
        <ButtonGrid
          digitClass={digitClass}
          operatorClass={operatorClass}
          clearClass={clearClass}
          backButtonClass={backButtonClass}
          onDigit={handleDigit}
          onOperator={handleOperator}
          onDecimal={handleDecimal}
          onEquals={handleEquals}
          onClear={handleClear}
          onBackspace={handleBackspace}
        />
      </div>
    </div>
  );
};

const Header: React.FC = () => (
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">
      A playful take on everyday functionality
    </h1>
    <p className="text-lg text-gray-600">
      This playful and modern calculator combines clean functionality with a colorful aesthetic.
      <br />
      Built with React, TypeScript, and Tailwind CSS.
    </p>
  </div>
);

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => (
  <div className="text-right p-4 rounded-xl mb-4 h-24 flex items-end justify-end overflow-hidden bg-white">
    <div className="text-4xl truncate">{value}</div>
  </div>
);

interface ButtonGridProps {
  digitClass: string;
  operatorClass: string;
  clearClass: string;
  backButtonClass: string;
  onDigit: (digit: string) => void;
  onOperator: (operator: string) => void;
  onDecimal: () => void;
  onEquals: () => void;
  onClear: () => void;
  onBackspace: () => void;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({
  digitClass,
  operatorClass,
  clearClass,
  backButtonClass,
  onDigit,
  onOperator,
  onDecimal,
  onEquals,
  onClear,
  onBackspace,
}) => (
  <div className="grid grid-cols-4 gap-4">
    <button className={`${clearClass} col-span-2`} onClick={onClear}>C</button>
    <button className={backButtonClass} onClick={onBackspace}>←</button>
    <button className={operatorClass} onClick={() => onOperator('/')}>÷</button>

    <button className={digitClass} onClick={() => onDigit('7')}>7</button>
    <button className={digitClass} onClick={() => onDigit('8')}>8</button>
    <button className={digitClass} onClick={() => onDigit('9')}>9</button>
    <button className={operatorClass} onClick={() => onOperator('*')}>×</button>

    <button className={digitClass} onClick={() => onDigit('4')}>4</button>
    <button className={digitClass} onClick={() => onDigit('5')}>5</button>
    <button className={digitClass} onClick={() => onDigit('6')}>6</button>
    <button className={operatorClass} onClick={() => onOperator('-')}>-</button>

    <button className={digitClass} onClick={() => onDigit('1')}>1</button>
    <button className={digitClass} onClick={() => onDigit('2')}>2</button>
    <button className={digitClass} onClick={() => onDigit('3')}>3</button>
    <button className={operatorClass} onClick={() => onOperator('+')}>+</button>

    <button className={`${digitClass} col-span-2`} onClick={() => onDigit('0')}>0</button>
    <button className={digitClass} onClick={onDecimal}>.</button>
    <button className={`${operatorClass} bg-[#DC3885]`} onClick={onEquals}>=</button>
  </div>
);

export default App;