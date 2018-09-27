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
    };
  }

  componentDidMount =()=>{
    document.onkeypress =(event)=>{
    event.preventDefault();
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

  updateResult = () => {
    this.updateOperation(this.state.operation);
    this.setState({
      number: '',
      operation: '',
      computeText:'',
      isFinalResult: true
    })
  }

  updateNumber = num => {
    if(this.state.isFinalResult){
      this.setState({
        result: 0,
        isFinalResult: false,
      })
    }
    this.setState(prevState =>({
      number:`${prevState.number}${num}`,
      computeText:`${prevState.computeText}${num}`
    }))
  }

  updateOperation = op => {
    const num = Number(this.state.number);
    switch(op){
      case '+':
        this.setState(prevState => ({
          result: prevState.result + num,
          number: '',
          computeText: `${prevState.computeText} +`,
          operation: '+'
        }));
        break;
      case '-':
        this.setState(prevState => ({
          result: prevState.result - num,
          number: '',
          computeText: `${prevState.computeText} -`,
          operation: '-'
        }));
        break;
      case '*':
        this.setState(prevState => ({
          result: prevState.result * num,
          number: '',
          computeText: `${prevState.computeText} *`,
          operation: '*'
        }));
        break;
      case '/':
        this.setState(prevState => ({
          result: prevState.result / num,
          number: '',
          computeText: `${prevState.computeText} /`,
          operation: '/'
        }));
        break;
      default:
        return;
    }
  }

  clearAll = () => {
    this.setState({
      number: '',
      operation: '',
      result: 0,
      isFinalResult: false,
      computeText:'',
      operation:''
    })
  }

  onNumClick = e => {
    this.updateNumber(e.target.value);
  }

  onFunClick = e => {
    this.updateOperation(e.target.value);
  }

  render() {
    return (
      <div className="App" onKeyPress={this.handleKeyPress}>
        <div>
          <label className="number">{this.state.number}</label>
          <label className="text">{this.state.computeText}</label>
        </div>
        <div className="buttons">
          {Functions.map(fun => (<div><button className="btn" value={fun} onClick={this.onFunClick}>{fun}</button></div>))}
          {Numbers.map(num => (<div><button className="btn" value={num} onClick={this.onNumClick}>{num}</button></div>))}
          <div><button className="btn" onClick={this.clearAll}>Clear</button></div>
        </div>
      </div>
    );
  }
}

export default App;
