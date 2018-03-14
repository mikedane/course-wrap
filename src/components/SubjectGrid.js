import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Route, Link } from "react-router-dom";
const axios = require('axios');


export default class SubjectGrid extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            schools: this.generateEmptySchoolData()
        };
    }

    generateEmptySchoolData(){
        if(this.props.match.params.school != null){
            return [{name: this.props.match.params.school, subjects: [], image: ""}];
        }
        return [
            {name: "Mit", subjects: [], image: ""},
            {name: "Yale", subjects: [], image: ""},
        ];
    }

    componentDidMount(){
        this.state.schools.forEach((school, index) => {
            axios.get('https://us-central1-test-api-197100.cloudfunctions.net/ocwScraper/data/' + school.name.toLowerCase()).then((response) => {
                let tempSchools = this.state.schools;
                tempSchools[index].subjects = response.data.subjects;
                this.setState({
                    schools: tempSchools
                });
            });
        });   
    }

    generateSubjectItems(school, subjects){
        return subjects.map((subject) => {
            return (
                <Link to={"/data/" + school.toLowerCase() + "/" + subject.url.split("/").pop()} key={subject.name}>
                    <li style={{border: "1px solid black", margin: "10px"}} >
                    <img width="250" src={subject.image} />
                    <h3>{subject.name}</h3>
                    <p>{subject.school[0].name[0].toUpperCase() + subject.school[0].name.substring(1)}</p>
                    </li>
                </Link>
            );
        });
    }

    generateSchoolItems(schools){
        return schools.map((school) => {
            return (
                
                    <li key={school.name} style={{display: "inline-block", verticalAlign : "top", paddingRight: "50px"}} >
                        <Link to={"/data/" + school.name.toLowerCase()}  >
                            <h2>{school.name.charAt(0).toUpperCase() + school.name.slice(1)}</h2> 
                        </Link>
                        <ul>
                        {this.generateSubjectItems(school.name, school.subjects)}
                        </ul>
                    </li>
               
            );
        });
    }

    render(){
        return (
            <ul >
                
            {this.generateSchoolItems(this.state.schools)}
            </ul>
        );
    }
}