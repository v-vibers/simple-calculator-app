import { useState } from 'react';
import './Calculator.css';

type CalculatorMode = 'basic' | 'scientific';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [mode, setMode] = useState<CalculatorMode>('basic');
  const [buttonHistory, setButtonHistory] = useState<string>('');
  const [currentNumber, setCurrentNumber] = useState('0');

  const handleNumber = (num: string) => {
    setButtonHistory(prev => prev + num);
    let newNumber: string;
    if (shouldResetDisplay) {
      newNumber = num;
      setCurrentNumber(num);
      setDisplay(previousValue !== null && operation !== null ? `${previousValue}${operation === '*' ? '×' : operation === '/' ? '÷' : operation === '-' ? '−' : operation}${num}` : num);
      setShouldResetDisplay(false);
    } else {
      newNumber = currentNumber === '0' ? num : currentNumber + num;
      setCurrentNumber(newNumber);
      if (previousValue !== null && operation !== null) {
        const opSymbol = operation === '*' ? '×' : operation === '/' ? '÷' : operation === '-' ? '−' : operation;
        setDisplay(`${previousValue}${opSymbol}${newNumber}`);
      } else {
        setDisplay(newNumber);
      }
    }
  };

  const handleDecimal = () => {
    setButtonHistory(prev => prev + '.');
    let newNumber: string;
    if (shouldResetDisplay) {
      newNumber = '0.';
      setCurrentNumber(newNumber);
      setDisplay(previousValue !== null && operation !== null ? `${previousValue}${operation === '*' ? '×' : operation === '/' ? '÷' : operation === '-' ? '−' : operation}${newNumber}` : newNumber);
      setShouldResetDisplay(false);
    } else if (!currentNumber.includes('.')) {
      newNumber = currentNumber + '.';
      setCurrentNumber(newNumber);
      if (previousValue !== null && operation !== null) {
        const opSymbol = operation === '*' ? '×' : operation === '/' ? '÷' : operation === '-' ? '−' : operation;
        setDisplay(`${previousValue}${opSymbol}${newNumber}`);
      } else {
        setDisplay(newNumber);
      }
    }
  };

  const handleOperation = (op: string) => {
    const opSymbol = op === '*' ? '×' : op === '/' ? '÷' : op === '-' ? '−' : op;
    setButtonHistory(prev => prev + opSymbol);
    if (previousValue !== null && operation !== null && !shouldResetDisplay) {
      handleEquals();
      setPreviousValue(display);
      setCurrentNumber(display);
    } else {
      setPreviousValue(currentNumber);
    }
    setOperation(op);
    setDisplay(`${currentNumber}${opSymbol}`);
    setShouldResetDisplay(true);
  };

  const handleEquals = () => {
    if (previousValue === null || operation === null) return;

    setButtonHistory(prev => prev + '=');
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentNumber);
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

    const resultString = isNaN(result) ? 'Error' : String(result);
    setDisplay(resultString);
    setCurrentNumber(resultString);
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentNumber('0');
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
    setButtonHistory('');
  };

  const handleBackspace = () => {
    if (currentNumber.length === 1) {
      setCurrentNumber('0');
      if (previousValue !== null && operation !== null) {
        const opSymbol = operation === '*' ? '×' : operation === '/' ? '÷' : operation === '-' ? '−' : operation;
        setDisplay(`${previousValue}${opSymbol}0`);
      } else {
        setDisplay('0');
      }
    } else {
      const newNumber = currentNumber.slice(0, -1);
      setCurrentNumber(newNumber);
      if (previousValue !== null && operation !== null) {
        const opSymbol = operation === '*' ? '×' : operation === '/' ? '÷' : operation === '-' ? '−' : operation;
        setDisplay(`${previousValue}${opSymbol}${newNumber}`);
      } else {
        setDisplay(newNumber);
      }
    }
  };

  const handleScientific = (func: string) => {
    const value = parseFloat(currentNumber);
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

    const resultString = isNaN(result) ? 'Error' : String(result);
    setDisplay(resultString);
    setCurrentNumber(resultString);
    setShouldResetDisplay(true);
  };

  const handleToggleSign = () => {
    const newNumber = String(-parseFloat(currentNumber));
    setCurrentNumber(newNumber);
    if (previousValue !== null && operation !== null) {
      const opSymbol = operation === '*' ? '×' : operation === '/' ? '÷' : operation === '-' ? '−' : operation;
      setDisplay(`${previousValue}${opSymbol}${newNumber}`);
    } else {
      setDisplay(newNumber);
    }
  };

  const handlePi = () => {
    const piString = String(Math.PI);
    setDisplay(piString);
    setCurrentNumber(piString);
    setShouldResetDisplay(true);
  };

  const handleE = () => {
    const eString = String(Math.E);
    setDisplay(eString);
    setCurrentNumber(eString);
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

        <div className="button-history">{buttonHistory || '\u00A0'}</div>

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