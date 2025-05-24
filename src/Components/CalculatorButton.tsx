import { Button, Col } from 'antd';

function CalculatorButton(props) {
  const currentInput = props.inputValue;
  const setInput = props.setInputValue;
  const buttonText = props.buttonText;
  const equation = props.equation;
  const setEquation = props.setEquation;
  const history = props.history;
  const setHistory = props.setHistory;

  let handleOnClick = (numberValue) => {
    if (numberValue === '=') {
      try {
        // {
        //   key: '1',
        //   label: '9*9',
        // },
        const newLength = history.length;
        const newHistory = [
          ...history,
          {
            key: { newLength },
            label: currentInput + '=' + eval(currentInput),
          },
        ];
        setHistory(newHistory);
        setEquation(currentInput);
        setInput(eval(currentInput).toString());
      } catch (e) {
        setInput('ERROR');
      }
    } else if (numberValue === 'AC') {
      setEquation('');
      setInput('');
    } else if (numberValue === 'DEL') {
      setInput(currentInput.slice(0, -1));
    } else {
      if (currentInput) {
        setInput(`${currentInput}${numberValue}`);
      } else {
        setInput(numberValue);
      }
    }
  };
  return (
    <>
      <Button onClick={() => handleOnClick(buttonText)} className="calc-button">
        {props.buttonText}
      </Button>
    </>
  );
}

export default CalculatorButton;
