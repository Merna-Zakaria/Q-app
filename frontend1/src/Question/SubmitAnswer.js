// import React , {Component, Fragment} from 'raect';
// import {withRouter} from 'react-router-dom';
// import auth0Client from '../Auth';

// class SubmitAnswer extends Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             answer : '',
//         };
//     }

//     updateAnswer(value){
//      this.setState({
//           answer : value,
//      });
//     }

//     submit(){
//         this.props.SubmitAnswer(this.state.answer);

//         this.setState({
//             answer : '',
//         });
//         console.log('sunmitAnswer',this.props.SubmitAnswer(this.state.answer));
//     }
    

//     render(){
//         return(
//             <Fragment>
//                 <div className='form-group text-center'>
//                   <label htmlFor='exampleInputEmail1'>Answer: </label>
//                   <input
//                   className='form-control'
//                   placeholder='Share your answer'
//                   type='text'
//                   onChange={(e) => {this.updateAnswer(e.target.value)}}
//                   value={this.state.value}>
//                   </input>
//                 </div>
//                 <button
//                 className='btn btn-primary'
//                 onClick={() => {this.submit()}}>
//                     Submit
//                 </button>
//                 <hr className="my-4" />
//             </Fragment>
//         )
//     }
// }

// export default withRouter(SubmitAnswer);



import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

class SubmitAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    };
  }

  updateAnswer(value) {
    this.setState({
      answer: value,
    });
  }

  submit() {
    this.props.submitAnswer(this.state.answer);

    this.setState({
      answer: '',
    });
  }

  render() {
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <Fragment>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Answer:</label>
          <input
            type="text"
            onChange={(e) => {this.updateAnswer(e.target.value)}}
            className="form-control"
            placeholder="Share your answer."
            value={this.state.answer}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {this.submit()}}>
          Submit
        </button>
        <hr className="my-4" />
      </Fragment>
    )
  }
}

export default withRouter(SubmitAnswer);
