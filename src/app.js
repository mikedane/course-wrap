import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
const axios = require('axios');

export default class App extends React.Component {

    render() {
        return (
        <div>
            <h1>Course Wrap</h1>
            <hr />
            
            <Router>
                <div>
                    <SearchBar />
                    <Route exact path="/" component={SubjectGrid} />
                    <Route exact path="/search-results" component={SearchResults} />
                    <Route exact path="/data/:school" component={SubjectGrid} />
                    <Route exact path="/data/:school/:subject" component={SubjectHighlight} />
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

export class SubjectHighlight extends React.Component {
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

export class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchQuery: "",
            searchResults: [],
            searching: false,
            shouldRedirect: false,
            redirectUrl: ""
        }
        console.log("Constructor called");

    }

    componentDidUpdate(){
        if(this.state.shouldRedirect){
            this.state.shouldRedirect = false;
        }
    }

    generateSearchResults(){
            let listItems = this.state.searchResults.map((element, index) => {
                return (<a key={element.name + index} href={element.url} target="_blank"><li>{element.name}</li></a>);
            });
            return (
                <ul>
                    {listItems}
                </ul>
            );
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

    render(){
        return(
            <div>
                <input type="text" value={this.state.searchQuery} onChange={(e) => this.handleTextInput(e)} onKeyPress={(e) => this.handleSubmit(e)}/>
                {this.generateSearchResults()}
                {(this.state.shouldRedirect) ? <Redirect to={this.state.redirectUrl} /> : ''}
            </div>
        );
    }
    handleSubmit(e){
        if (e.key === 'Enter') {
            this.setState({
                searchResults: [],
                searching: false,
                shouldRedirect: true,
                redirectUrl: '/search-results?searchQuery=' + e.target.value.trim().replace(/ /g, "%20")
            });
        
        }
    }

    handleTextInput(e){
        if(e.target.value != ""){
            axios.get('https://us-central1-test-api-197100.cloudfunctions.net/ocwScraper/search?searchQuery=' + e.target.value + "&" + "limit=5")
            .then((response) => {
                if(this.state.searchQuery != "" && this.state.searching){
                    if(response.data.results.length > 0){
                        this.setState({
                            searchResults: this.removeDuplicateCourses(response.data.results)
                        });
                    }
                } else {
                    this.setState({
                        searchResults: []
                    });
                }

            });
        } else {
            this.setState({
                searchResults: []
            });
        }
        
        this.setState({
            searchQuery: e.target.value,
            searching: true
        });
    }
}

export class SearchResults extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchQuery: this.getParameterByName("searchQuery").split("%20").join(" "),
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
                searchQuery: this.getParameterByName("searchQuery").split("%20").join(" ")
            });
            this.getSearchResults(this.getParameterByName("searchQuery").split("%20").join(" "));
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

    render(){
        return (
            <div>

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