import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');


export default class SubjectHighlight extends React.Component {
    constructor(props){
        super(props);
        console.log("Constructor");
        this.state = {
            courses: []
        }
    }

    componentWillMount(){
        axios.get('https://us-central1-test-api-197100.cloudfunctions.net/ocwScraper/data/' + this.props.match.params.school + '/' + this.props.match.params.subject)
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