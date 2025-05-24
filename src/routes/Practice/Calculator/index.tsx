import { Col, Input, Row } from 'antd';
import CalculatorButton from '../../../Components/CalculatorButton';
import './index.css';
import { useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

function Calculator() {
  //Generate accepted input
  //Create the ui for the buttons
  //When each button is pressed update the input and calculate the equation
  //Save the calculation into the history
  //When clicking on the history restore the equation

  const acceptedInput = [
    '(',
    ')',
    'DEL',
    'AC',
    '7',
    '8',
    '9',
    '/',
    '4',
    '5',
    '6',
    '*',
    '1',
    '2',
    '3',
    '-',
    '0',
    '.',
    '=',
    '+',
  ];

  const [inputValue, setInputValue] = useState();
  const [equation, setEquation] = useState();
  const [history, setHistory] = useState([]);

  function handleInputOnChange(e) {
    setInputValue(e.target.value);
  }

  const items: MenuProps['items'] = history;
  // {
  //   key: '1',
  //   label: '9*9',
  // },

  return (
    <div className="container">
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>History</Space>
        </a>
      </Dropdown>

      <div className="equation-text">{equation}</div>

      <Input
        value={inputValue}
        onChange={handleInputOnChange}
        disabled
        className="input-box"
      />

      <Row>
        {acceptedInput.map((input) => (
          <Col className="gutter-row" span={6}>
            <CalculatorButton
              inputValue={inputValue}
              setInputValue={setInputValue}
              buttonText={input}
              equation={equation}
              setEquation={setEquation}
              history={history}
              setHistory={setHistory}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Calculator;
