import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { withTheme, withStyles } from 'material-ui/styles';
import { fade } from 'material-ui/styles/colorManipulator';
import SearchIcon from 'material-ui-icons/Search';
import Paper from 'material-ui/Paper';
import Autosuggest from 'react-autosuggest';



class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchQuery: "",
            searchResults: [],
            searching: false,
            shouldRedirect: false,
            redirectUrl: ""
        }
        this.renderInput = this.renderInput.bind(this);
        this.generateSearchResults = this.generateSearchResults.bind(this);
    }

    componentDidUpdate(){
        if(this.state.shouldRedirect){
            this.state.shouldRedirect = false;
        }
    }

    generateSearchResults(){
            const { classes } = this.props;

            let listItems = this.state.searchResults.map((element, index) => {
                return (<a key={element.name + index} href={element.url} target="_blank"><li>{element.name}</li></a>);
            });
            if(listItems.length >0){
                return (
                    <div style={{position: "absolute"}}>
                    <Paper className={classes.searchSuggestions}>
                        <ul >
                            {listItems}
                        </ul>
                    </Paper>
                    </div>
                );
            }

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

    renderSuggestionsContainer(options) {
        const { containerProps, children } = options;
      
        return (
          <Paper {...containerProps} square>
            {children}
          </Paper>
        );
      }
      

    render(){
        const { classes } = this.props;
        return(
            <div>


                <Autosuggest
                    renderInputComponent={this.renderInput}
                    suggestions={this.state.searchResults}
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                    renderSuggestionsContainer={this.generateSearchResults}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={{
                    classes,
                    placeholder: 'Search a country (start with a)',
                    value: this.state.searchQuery,
                    onChange: this.handleTextInput,
                    }}
                />




                {/* {this.generateSearchResults()} */}
                {(this.state.shouldRedirect) ? <Redirect to={this.state.redirectUrl} /> : ''}
            </div>
        );
    }

    renderSuggestion(suggestion, { query, isHighlighted }) {
        
      
        return (
            <div>
              {suggestion}
            </div>
        );
      }

    getSuggestionValue(suggestion) {
        return suggestion.name;
      }

    handleSuggestionsClearRequested(){
        this.setState({
          suggestions: [],
        });
    };

    renderInput(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <div className={classes.search}>
                <SearchIcon />
            </div>
            <input className={classes.input} type="text" value={this.state.searchQuery} onChange={(e) => this.handleTextInput(e)} onKeyPress={(e) => this.handleSubmit(e)}/>
        </div>
        );
    }


    handleSubmit(e){
        if (e.key === 'Enter') {
            this.setState({
                searchResults: [],
                searching: false,
                shouldRedirect: true,
                redirectUrl: '/search-results?searchQuery=' + e.target.value.trim().replace(/&/g, "").replace(/\+{2,}/g, "").replace(/\s{2,}/g, " ").replace(/ /g, "+")
            });
        
        }
    }

    handleSuggestionsFetchRequested({value}){
        axios.get('https://us-central1-test-api-197100.cloudfunctions.net/ocwScraper/search?searchQuery=' + value + "&" + "limit=5")
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

const styles = theme => ({
    root: {
      fontFamily: theme.typography.fontFamily,
      position: 'relative',
      marginRight: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit,
      borderRadius: 2,
      background: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        background: fade(theme.palette.common.white, 0.25),
      },
      '& $input': {
        transition: theme.transitions.create('width'),
        width: 200,
        '&:focus': {
          width: 250,
        },
      },
    },
    search: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      font: 'inherit',
    //   marginTop: "16px",
      padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
        .spacing.unit * 9}px`,
      border: 0,
      display: 'block',
      verticalAlign: 'middle',
      whiteSpace: 'normal',
      background: 'none',
      margin: 0, // Reset for Safari
      color: 'inherit',
      width: '100%',
      '&:focus': {
        outline: 0,
      },
    },
    searchSuggestions: {
        padding: "5px",
        display: 'flex',
    }
  });

export default withStyles(styles)(SearchBar);