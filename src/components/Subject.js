import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');
import CourseCard from './CourseCard.js';
import GridList, { GridListTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import green from 'material-ui/colors/green';
import { fade } from 'material-ui/styles/colorManipulator';
import { withTheme, withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
const queryString = require('query-string');
const Helpers = require("../helpers.js");
import SubjectSubheader from './SubjectSubheader.js';
import CourseGrid from './CourseGrid.js';
import { CircularProgress } from 'material-ui/Progress';

class Subject extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
    }
    componentWillMount(){
        Helpers.httpGet(Helpers.apiRootUrl + "subjects?id=" + Helpers.getURLParamByName("id", this.props.location.search) + "&getCourses=true", result => {
            if(result.subjects[0]){
                this.setState({
                    subject: result.subjects[0]
                });
            }
        });
    }

    assembleCourseItems(subject){
        let assembledCourses = [];
        subject.courses.forEach(course => {
            course.subject = Object.assign({}, subject);
            course.school = subject.school;
            delete course.subject.school;
            delete course.subject.courses;
            assembledCourses.push(course);
        });
        return assembledCourses;
    }

    render(){
        const { classes } = this.props;
        console.log(this.state);
        return (
            <div className={classes.subjectWrapper}>
                {this.state.subject ? <SubjectSubheader subject={this.state.subject} />: <div></div>}
                <br />
                {this.state.subject ? <CourseGrid courses={this.assembleCourseItems(this.state.subject)} />: <div></div>}
                <div className={classes.spinnerContainer}>
                    {this.state.subject ? null : <CircularProgress />}
                </div>
            </div>
        );
    }
}


const styles = theme => ({
    spinnerContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '25px'
    },
    subjectWrapper: {
        width: '1450px',
    },
    card: {
        minWidth: 275,
        background: green[400],
        color: 'white',
        marginBottom: "1em",
        height: "5em",
        paddingLeft: '24px'
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
       color: 'white'
   
      },

});
export default withStyles(styles)(Subject);