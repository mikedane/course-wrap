import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
const axios = require('axios');
import CourseCard from './CourseCard.js';
const queryString = require('query-string');
const Helpers = require("../helpers.js");

export default class SearchResults extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchQuery: Helpers.getURLParamByName("query", this.props.location.search),
            searchResults: [],
            
        }
    }

    componentDidMount(){
        this.getSearchResults(this.state.searchQuery);
    }

    componentDidUpdate(){
        let currentQuery = Helpers.getURLParamByName("query", this.props.location.search);
        if(currentQuery != this.state.searchQuery){
            this.setState({
                searchQuery: currentQuery
            });
            this.getSearchResults(currentQuery);
        }
    }

    getSearchResults(query){
        Helpers.httpGet(Helpers.apiRootUrl + "search?query=" + query + "&limit=30", result => {
            
            this.setState({
                searchResults: result.courses
            });
            
        });
    }

    generateCourseItems(courses){
        return Helpers.removeDuplicateCourses(courses).map((course, index) => {
            return (
                <CourseCard key={course._id}  margin="10px" course={course}/>
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

    }
}