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
      isCalculating: false,
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
      isFinalResult: true,
      isCalculating: false,
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

  setInitialCalState = (op, num) => {
    let isCalculating = false;
    if(this.state.number !== ''){
      isCalculating = true;
    }
    this.setState(prevState => ({
      result: num,
      number: '',
      computeText: `${prevState.computeText} ${op}`,
      operation: `${op}`,
      isCalculating:{isCalculating},
    }));
  }

  updateOperation = op => {
    const num = Number(this.state.number);
    switch(op){
      case '+':
        this.setState(prevState => ({
          result: prevState.result + num,
          number: '',
          computeText: `${prevState.computeText} +`,
          operation: '+',
          isCalculating:true,
        }));
        break;
      case '-':
        if(this.state.isCalculating){
          this.setState(prevState => ({
            result: prevState.result - num,
            number: '',
            computeText: `${prevState.computeText} -`,
            operation: '-',
            isCalculating:true,
          }));
        }
        else{
          this.setInitialCalState('-', num);
        }
        break;
      case '*':
        if(this.state.isCalculating){
          this.setState(prevState => ({
            result: prevState.result * num,
            number: '',
            computeText: `${prevState.computeText} *`,
            operation: '*',
            isCalculating:true,
          }));
        }
        else{
          this.setInitialCalState('*', num);
        }
        break;
      case '/':
        if(this.state.isCalculating){
          this.setState(prevState => ({
            result: prevState.result / num,
            number: '',
            computeText: `${prevState.computeText} /`,
            operation: '/',
            isCalculating:true,
          }));
        }
        else {
          this.setInitialCalState('/', num);
        }
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
      operation:'',
      isCalculating:false,
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
    <div className="main">
      <div className="App">
        <div className="display">
          <div><label className="text">{this.state.computeText}</label></div>
          { !this.state.isFinalResult &&
            <div><label className="lbl">{this.state.number}</label></div>
          }
          {this.state.isFinalResult && 
            <div><label className="lbl">{this.state.result}</label></div>
          }
        </div>
        <div className="operation">
          <div className="clear"><button className="btn" onClick={this.clearAll}>Clear</button></div>
          <div className="result"><button className="btn" onClick={this.updateResult}>=</button></div>
        </div>
        <div className="buttons">
          {Functions.map(fun => (<div><button className="btn" value={fun} onClick={this.onFunClick}>{fun}</button></div>))}
          {Numbers.map(num => (<div><button className="btn" value={num} onClick={this.onNumClick}>{num}</button></div>))}
        </div>
        
      </div>
    </div>
    );
  }
}

export default App;
