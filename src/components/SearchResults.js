import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
const axios = require('axios');
import CourseCard from './CourseCard.js';


export default class SearchResults extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchQuery: this.getParameterByName("searchQuery").split("+").join(" "),
            searchResults: [],
            
        }
    }

    componentDidMount(){
        console.log("component did mount")
        this.getSearchResults(this.state.searchQuery);
    }

    componentDidUpdate(){
        if(this.getParameterByName("searchQuery").split("%20").join(" ") != this.state.searchQuery){
            this.setState({
                searchQuery: this.getParameterByName("searchQuery").split("+").join(" ")
            });
            this.getSearchResults(this.getParameterByName("searchQuery").split("+").join(" "));
        }
    }


    getSearchResults(searchQuery){
        axios.get('https://us-central1-test-api-197100.cloudfunctions.net/ocwScraper/search?searchQuery=' + searchQuery + "&limit=20")
        .then((response) => { 
            this.setState({
                searchResults: response.data.results
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
                <CourseCard key={course._id}  margin="10px" course={{name: course.name,url: course.url, image: course.image, description: course.description, school: course.school[0], subject: course.subject[0]}}/>

            );
        });
    }

    render(){
        return (
            <div style={{display: "flex", WebkitFlexWrap: 'wrap', flexWrap: 'wrap', WebkitJustifyContent: 'center', justifyContent: 'flex-start', paddingLeft: '24px'}}>
            {this.generateCourseItems(this.state.searchResults)}
        </div>

        );
    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}