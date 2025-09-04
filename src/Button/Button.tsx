interface CalculatorButtonProps {
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, className, children }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

export default CalculatorButton;