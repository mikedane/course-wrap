import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from "react-router-dom";
const axios = require('axios');

export default class App extends React.Component {

    render() {
        return (
        <div>
            <h1>Course Wrap</h1>
            <hr />
            <Router>
                <div>
                    <Route exact path="/" component={SubjectGrid} />
                    <Route exact path="/:school" component={SubjectGrid} />
                    <Route exact path="/:school/:subject" component={SubjectHighlight} />
                </div>
            </Router>
        </div>
        );
    }
}

export class SubjectGrid extends React.Component {

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
            axios.get('https://us-central1-test-api-197100.cloudfunctions.net/ocwScraper/' + school.name.toLowerCase()).then((response) => {
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
                <Link to={"/" + school.toLowerCase() + "/" + subject.url.split("/").pop()} key={subject.name}>
                    <li style={{border: "1px solid black", margin: "10px"}} >
                    <img width="250" src={subject.image} />
                    <h3>{subject.name}</h3>
                    </li>
                </Link>
            );
        });
    }

    generateSchoolItems(schools){
        return schools.map((school) => {
            return (
                <Link to={"/" + school.name.toLowerCase()} key={school.name} >
                    <li style={{display: "inline-block", verticalAlign : "top", paddingRight: "50px"}} >
                        <h2>{school.name.charAt(0).toUpperCase() + school.name.slice(1)}</h2> 
                        <ul>
                        {this.generateSubjectItems(school.name, school.subjects)}
                        </ul>
                    </li>
                </Link>
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


export class SubjectHighlight extends React.Component {
    constructor(props){
        super(props);
        console.log("Constructor");
        this.state = {
            courses: []
        }
    }

    componentWillMount(){
        axios.get('https://us-central1-test-api-197100.cloudfunctions.net/ocwScraper/' + this.props.match.params.school + '/' + this.props.match.params.subject)
            .then((response) => {
                this.setState({
                    courses: response.data.courses
                });
            });
    }

    removeDuplicateCourses(courses){
        let result = [];
        courses.forEach((course) => {
            if(result.length > 0){
                let found = result.find(function(element) {
                    return element.name == course.name || element.url == course.url;
                  });
                if(found === undefined){
                    result.push(course);
                }
            } else {
                result.push(course);
            }
            
        });            
        return result;
    }

    generateCourseItems(courses){
        return this.removeDuplicateCourses(courses).map((course, index) => {
            return (
                <a href={course.url} key={course.name + index.toString()} target="_blank">
                    <li style={{display: "inline-block", verticalAlign : "top", margin: "50px", width: "250px", height: "500px", overflow: "scroll", border: "1px solid black"}}>
                        <img width="250" src={course.image} />
                        <h2>{course.name}</h2>
                        <p>{course.instructors}</p>
                        <p>{course.description}</p>
                    </li>
                </a>
            );
        });
    }

    formatSubjectName(unformattedSubject){
        let result = "";
        unformattedSubject.split("-").forEach((component) => {
            result += " " + component[0].toUpperCase() + component.slice(1);
        });
        return result;
    }

    render(){
        return (
            <div>
                <h2>{this.formatSubjectName(this.props.match.params.subject)}</h2>
                {this.generateCourseItems(this.state.courses)}
            </div>
        );
    }
}