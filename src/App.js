import React, { useReducer } from 'react';
import './App.css';
import DigitButton from './components/Digitbutton'; // Make sure the import path is correct for DigitButton.
import Operation from './components/Operation'; // Updated import to use "Operation" component.

export const ACTIONS = {
  ADD_DIGIT: 'add-digit', // Corrected the action type names.
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currOperand: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === '.' && state.currOperand.includes('.')) return state;
      if (payload.digit === '0' && state.currOperand === '0') return state;
      return {
        ...state,
        currOperand: (state.currOperand || '') + payload.digit,
      };
    case ACTIONS.CLEAR:
      return {
        currOperand: '',
        prevOperand: '',
        operation: '',
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currOperand == null && state.prevOperand == null) {
        return state;
      }
      if (state.prevOperand === '') {
        // Handle the case when there's no previous operand.
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currOperand,
          currOperand: '',
        };
      }
      if (state.operation === '') {
        // Handle the case when an operation is chosen for the first time.
        return {
          ...state,
          operation: payload.operation,
          currOperand: '',
        };
      }
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currOperand: '',
      };
      case ACTIONS.EVALUATE:
        if(
          state.operation==null ||
          state.currOperand ==null ||
          state.prevOperand ==null
        ){
          return state
        }
        return {
          ...state,
          overwrite: true,
          prevOperand: null,
          operation: null,
          currOperand: evaluate(state)
        }
        case ACTIONS.DELETE_DIGIT:
          if(state.overwrite){
            return{
              ...state,
              overwrite: false,
              currOperand: null
            }
          }
          if(state.currOperand == null) return state
          if(state.currOperand.length ===1){
            return{
              ...state, currOperand: null
            }
          }
          return{
            ...state,
            currOperand: state.currOperand.slice(0, -1)
          }
    default:
      return state;
  }
}

function evaluate({ currOperand, prevOperand, operation }) {
  const prev = parseFloat(prevOperand); // Fixed the typo prevFloat to parseFloat
  const curr = parseFloat(currOperand); // Fixed the typo prevFloat to parseFloat

  if (isNaN(prev) || isNaN(curr)) return ""; // Corrected the check for NaN

  let computation;

  switch (operation) {
    case "+": // Added colons here
      computation = prev + curr;
      break;
    case "-": // Added colons here
      computation = prev - curr;
      break;
    case "*": // Added colons here
      computation = prev * curr;
      break;
    case "/": // Added colons here
      computation = prev / curr;
      break;
    default:
      return "";
  }

  return computation.toString(); // Added parentheses after toString
}


function App() {
  const [{ currOperand, prevOperand, operation }, dispatch] = useReducer(reducer, { currOperand: '', prevOperand: '', operation: '' });

  return (
    <div className="calculator-grid"> {/* Corrected the class name. */}
      <div className="output">
        <div className="prev-operand">{prevOperand} {operation}</div>
        <div className="curr-operand">{currOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch ({ type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch ({ type: ACTIONS.DELETE_DIGIT})} >DEL</button>
      <Operation operation="/" dispatch={dispatch}></Operation> {/* Updated to use "Operation" component. */}
      <DigitButton digit="1" dispatch={dispatch}></DigitButton> {/* Updated to use DigitButton component. */}
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <Operation operation="*" dispatch={dispatch}></Operation> {/* Updated to use "Operation" component. */}
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <Operation operation="+" dispatch={dispatch}></Operation> {/* Updated to use "Operation" component. */}
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <Operation operation="-" dispatch={dispatch}></Operation> {/* Updated to use "Operation" component. */}
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <button className="span-two"onClick={() => dispatch ({ type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
