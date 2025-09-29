import { useState } from 'react';
import './Calculator.css';

type CalculatorMode = 'basic' | 'scientific';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [mode, setMode] = useState<CalculatorMode>('basic');

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    if (previousValue !== null && operation !== null && !shouldResetDisplay) {
      handleEquals();
    }
    setPreviousValue(display);
    setOperation(op);
    setShouldResetDisplay(true);
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result: number;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = current !== 0 ? prev / current : NaN;
        break;
      case '^':
        result = Math.pow(prev, current);
        break;
      default:
        return;
    }

    setDisplay(isNaN(result) ? 'Error' : String(result));
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleScientific = (func: string) => {
    const value = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(value);
        break;
      case 'cos':
        result = Math.cos(value);
        break;
      case 'tan':
        result = Math.tan(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'exp':
        result = Math.exp(value);
        break;
      case '1/x':
        result = value !== 0 ? 1 / value : NaN;
        break;
      case 'x²':
        result = value * value;
        break;
      case 'abs':
        result = Math.abs(value);
        break;
      default:
        return;
    }

    setDisplay(isNaN(result) ? 'Error' : String(result));
    setShouldResetDisplay(true);
  };

  const handleToggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const handlePi = () => {
    setDisplay(String(Math.PI));
    setShouldResetDisplay(true);
  };

  const handleE = () => {
    setDisplay(String(Math.E));
    setShouldResetDisplay(true);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-header">
          <button
            className={`mode-toggle ${mode === 'basic' ? 'active' : ''}`}
            onClick={() => setMode('basic')}
          >
            Basic
          </button>
          <button
            className={`mode-toggle ${mode === 'scientific' ? 'active' : ''}`}
            onClick={() => setMode('scientific')}
          >
            Scientific
          </button>
        </div>

        <div className="display">{display}</div>

        <div className={`calculator-buttons ${mode}`}>
          {mode === 'scientific' && (
            <>
              <button className="btn-function" onClick={() => handleScientific('sin')}>sin</button>
              <button className="btn-function" onClick={() => handleScientific('cos')}>cos</button>
              <button className="btn-function" onClick={() => handleScientific('tan')}>tan</button>
              <button className="btn-function" onClick={() => handleOperation('^')}>x^y</button>

              <button className="btn-function" onClick={() => handleScientific('sqrt')}>√</button>
              <button className="btn-function" onClick={() => handleScientific('x²')}>x²</button>
              <button className="btn-function" onClick={() => handleScientific('1/x')}>1/x</button>
              <button className="btn-function" onClick={() => handleScientific('abs')}>|x|</button>

              <button className="btn-function" onClick={() => handleScientific('log')}>log</button>
              <button className="btn-function" onClick={() => handleScientific('ln')}>ln</button>
              <button className="btn-function" onClick={() => handleScientific('exp')}>exp</button>
              <button className="btn-function" onClick={handlePi}>π</button>

              <button className="btn-function" onClick={handleE}>e</button>
              <button className="btn-function" onClick={handleToggleSign}>±</button>
              <button className="btn-clear" onClick={handleBackspace}>⌫</button>
              <button className="btn-clear" onClick={handleClear}>C</button>
            </>
          )}

          {mode === 'basic' && (
            <>
              <button className="btn-clear" onClick={handleClear}>C</button>
              <button className="btn-clear" onClick={handleBackspace}>⌫</button>
              <button className="btn-function" onClick={handleToggleSign}>±</button>
              <button className="btn-operation" onClick={() => handleOperation('/')}>÷</button>
            </>
          )}

          <button className="btn-number" onClick={() => handleNumber('7')}>7</button>
          <button className="btn-number" onClick={() => handleNumber('8')}>8</button>
          <button className="btn-number" onClick={() => handleNumber('9')}>9</button>
          <button className="btn-operation" onClick={() => handleOperation('*')}>×</button>

          <button className="btn-number" onClick={() => handleNumber('4')}>4</button>
          <button className="btn-number" onClick={() => handleNumber('5')}>5</button>
          <button className="btn-number" onClick={() => handleNumber('6')}>6</button>
          <button className="btn-operation" onClick={() => handleOperation('-')}>−</button>

          <button className="btn-number" onClick={() => handleNumber('1')}>1</button>
          <button className="btn-number" onClick={() => handleNumber('2')}>2</button>
          <button className="btn-number" onClick={() => handleNumber('3')}>3</button>
          <button className="btn-operation" onClick={() => handleOperation('+')}>+</button>

          <button className="btn-number btn-zero" onClick={() => handleNumber('0')}>0</button>
          <button className="btn-number" onClick={handleDecimal}>.</button>
          <button className="btn-equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
}