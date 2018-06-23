import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { Link } from "react-router-dom";

// Material Ui
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import SearchIcon from 'material-ui-icons/Search';
import { fade } from 'material-ui/styles/colorManipulator';
import Hidden from 'material-ui/Hidden';
const Helpers = require("../helpers.js");

function generateQueryUrl(query){
    if(query){
      return '/search?query=' + query.trim().replace(/&/g, "").replace(/\+{2,}/g, "").replace(/\s{2,}/g, " ").replace(/ /g, "+");
    }
    return '/';
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
  return (
    <Link to={generateQueryUrl(suggestion.name)} style={{textDecoration: "none"}}>
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
    </Link>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;
  return (
    <Hidden only="xs">
        <Paper {...containerProps} square >
        {children}
        </Paper>
    </Hidden>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            suggestions: [],
          };
    }

    handleSubmit(e){
        if (e.key === 'Enter') {
            this.props.history.push(generateQueryUrl(this.state.value))
        }
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

    handleSuggestionsFetchRequested = ({ value }) => {
        Helpers.httpGet(Helpers.apiRootUrl + "search?query=" + value + "&" + "limit=5", result => {
            
            let dog = Helpers.removeDuplicateCourses(result.courses).map((course) => {
              if(course.name) {
                console.log("Got course with name: " + course.name);
                return course;
              }
            });
            console.log(dog);
            if(result.courses.length > 0){
                this.setState({
                    suggestions: Helpers.removeDuplicateCourses(result.courses)
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
    const { classes } = this.props;
    return (
      <div onKeyPress={(e) => this.handleSubmit(e)} >
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
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
            placeholder: 'Search for a course',
            value: this.state.value,
            onChange: this.handleChange,
            classes: this.props.classes
            }}
        />
      </div>
        

    );
  }
}

const styles = theme => ({
    root: {
      fontFamily: theme.typography.fontFamily,
      position: 'relative',
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
      '&::placeholder': {
        color: "white",
        opacity: "1" /* Firefox */
    },
    
    '&:-ms-input-placeholder': { /* Internet Explorer 10-11 */
       color: "inherit",
    },
    
    '&::-ms-input-placeholder' : { /* Microsoft Edge */
       color: "inherit"
    }
    },
      suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
      },
      suggestion: {
        display: 'block',
      },
      suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
      },
    suggestionsContainer: {
        position: "absolute", 
        right: "2.5em",
        marginTop: "5px",
        borderRadius: "5px"
    }
  });
export default withStyles(styles)(SearchBar);