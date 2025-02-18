import { Component } from "react";

class FunClass extends Component{
    constructor(){
        super();
        this.state = {count:1}
        this.handleIncrement = this.handleIncrement.bind(this);
    }
    handleIncrement(){
        console.log('fn called')
        this.setState((prevState)=>({count:prevState.count+1}));
        this.setState((prevState)=>({count:prevState.count+1}));
        this.setState((prevState)=>({count:prevState.count+1}));
        console.log(this.state.count)
    }
    componentDidMount(){
        console.log('component mounted----')
    }
    componentDidUpdate(prevProps, prevState){
        console.log('component updated----')
        console.log(prevProps)
        console.log(prevState)
      
    }
    render(){
        return(
           <div>
                <p>Increment {this.state.count}</p>
                <button onClick={this.handleIncrement}>click</button>
            </div>
        );
    }
}

export default FunClass;