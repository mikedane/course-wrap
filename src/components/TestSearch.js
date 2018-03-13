import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
const axios = require('axios');
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import SearchIcon from 'material-ui-icons/Search';
import { fade } from 'material-ui/styles/colorManipulator';
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";



const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];



function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          ) : (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;
    console.log(containerProps);
  return (
    <Paper {...containerProps} square >
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}




class IntegrationAutosuggest extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            suggestions: [],
          };

    }
    componentDidUpdate(){
        if(this.state.shouldRedirect){
            this.state.shouldRedirect = false;
        }
    }


    handleSubmit(){
            const redirectUrl = '/search-results?searchQuery=' + this.state.value.trim().replace(/&/g, "").replace(/\+{2,}/g, "").replace(/\s{2,}/g, " ").replace(/ /g, "+");
            this.setState({
                suggestions: [],
                shouldRedirect: true,
                redirectUrl: redirectUrl
            });
    }

    renderInput(inputProps) {
        const { classes, ref, ...other } = inputProps;      
        return (

          <div className={classes.root}>
              <div className={classes.search}>
                  <SearchIcon />
              </div>
              <input {...inputProps} className={classes.input} type="text" />
          </div>
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

    handleSuggestionsFetchRequested = ({ value }) => {
        axios.get('https://us-central1-test-api-197100.cloudfunctions.net/ocwScraper/search?searchQuery=' + value + "&" + "limit=5")
            .then((response) => {
                if(response.data.results.length > 0){
                    this.setState({
                        suggestions: this.removeDuplicateCourses(response.data.results)
                    });
                }

            });
    };

    handleSuggestionsClearRequested = () => {      
        this.setState({
        suggestions: [],
        });
    };

    handleChange = (event, { newValue }) => {
        this.setState({
        value: newValue,
        });
    };

  render() {
      console.log(this.state.value)
    const { classes } = this.props;

    return (
      <form onSubmit={() => this.handleSubmit()} >

      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
          suggestionsContainer: classes.suggestionsContainer
        }}
        renderInputComponent={this.renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}      // update state with new suggestions 
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: 'Search for a course',
          value: this.state.value,
          onChange: this.handleChange,
          classes: this.props.classes
        }}
      />
      {(this.state.shouldRedirect) ? <Redirect to={this.state.redirectUrl} /> : ''}
      </form>
        

    );
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
    suggestionsContainer: {
        position: "absolute", 
        right: "2.5em",
        marginTop: "5px",
        borderRadius: "5px"
        

    }
  });
export default withStyles(styles)(IntegrationAutosuggest);
