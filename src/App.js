import React, { Component } from 'react';
import './App.css';

const Numbers = ['1','2','3','4','5','6','7','8','9','0','.'];
const Others = ['=', 'Enter'];
const Functions = ['+', '-', '/', '*'];

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      number: '',
      operation: '',
      result: 0,
      isFinalResult: false,
      computeText:'',
      operation:''
    };
  }

  componentDidMount =()=>{
    document.onkeypress =(event)=>{
      if(Numbers.includes(event.key) || Functions.includes(event.key) || Others.includes(event.key)){
        if (Numbers.includes(event.key)) {
          this.updateNumber(event.key);
        }

        if (Functions.includes(event.key)) {
          this.updateOperation(event.key);
        }

        if (Others.includes(event.key)) {
          this.updateResult();
        }
      }
    }
  }

  updateResult = () => {
    this.updateOperation(this.state.operation);
  }

  updateNumber = num => {
    this.setState(prevState =>({
      number:`${prevState.number}${num}`,
      computeText:`${prevState.computeText}${prevState.number}${num}`
    }))
  }

  updateOperation = op => {
    const num = Number(this.state.number);
    switch(op){
      case '+':
        this.setState(prevState => ({
          result: prevState.result + num,
          number: '',
          computeText: `${prevState.number} +`,
          operation: '+'
        }));
        break;
      case '-':
        this.setState(prevState => ({
          result: prevState.result - num,
          number: '',
          computeText: `${prevState.number} -`,
          operation: '-'
        }));
        break;
      case '*':
        this.setState(prevState => ({
          result: prevState.result * num,
          number: '',
          computeText: `${prevState.number} *`,
          operation: '*'
        }));
        break;
      case '/':
        this.setState(prevState => ({
          result: prevState.result / num,
          number: '',
          computeText: `${prevState.number} /`,
          operation: '/'
        }));
        break;
      default:
        return;
    }
  }

  onNumClick = e => {
    this.updateNumber(e.target.value);
  }

  render() {
    return (
      <div className="App" onKeyPress={this.handleKeyPress}>
        <label>Number :{this.state.number}</label>
        <label>Result :{this.state.result}</label>
        <label>Text :{this.state.computeText}</label>
        {Numbers.map(num => (<button className="btn" value={num} onClick={this.onNumClick}>{num}</button>))}
      </div>
    );
  }
}

export default App;
