import React, { Component } from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../Auth';


class Question extends Component{
    constructor(props){
        super(props);

        this.state= {
            question : null,
        };
        this.submitAnswer = this.submitAnswer.bind(this);
        console.log('question submitAnswer',this.SubmitAnswer);
        console.log('this',this);
    }

    async componentDidMount(){
        // const { match :{ params }} = this.props;
        // console.log(this.props)
        // const question = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;
        // this.setState ({
        //     question,
        // });

        await this.refreshQuestion();
    }

    async refreshQuestion() {
        const { match: { params } } = this.props;
        const question = (await axios.get(`http://localhost:8081/${params.questionId}`)).data;
        this.setState({
          question,
        });
      }

      
      async submitAnswer(answer) {
        await axios.post(`http://localhost:8081/answer/${this.state.question.id}`, {
          answer,
        }, {
          headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        });
        await this.refreshQuestion();
      }
    
    render(){
        const {question} = this.state;
        console.log('single question',question)
        if (question === null) return <p>Loading...</p>

        return(
            <div className="container">
                <div className="row">
                    <div className="jumbotron col-12">
                        <h1 className="display-3">{question.title}</h1>
                        <p className="lead">{question.description}</p>
                        <hr className="my-4"/>

                        <SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer} />

                        <p>Anawers:</p>
                        {
                            question.answers.map( (answer,idx) =>(
                                <p className="lead" key={idx}>{answer.answer}</p>   
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default Question;