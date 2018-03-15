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


class SubjectHighlight extends React.Component {
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
                
                <CourseCard key={course._id}  margin="10px" course={{name: course.name,url: course.url, image: course.image, description: course.description, school: course.school[0], subject: course.subject[0]}}/>

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

    generateSchoolUrlLink(schoolUrl){
        return (
            <a href={schoolUrl}  target="_blank" style={{textDecoration: 'none', color: 'white'}}>{schoolUrl}</a>
        );
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                    <Typography variant="headline" component="h2" style={{color:'white'}}>
                        {this.state.courses[0] ? this.state.courses[0].subject[0].name : ""}
                    </Typography>
                    <Typography className={classes.title}>
                    {this.state.courses ? this.state.courses.length + (this.state.courses.length > 1 ? " Courses" : " Course") + " | " : ""}

                    {this.state.courses[0] ? this.state.courses[0].school[0].name.charAt(0).toUpperCase() + this.state.courses[0].school[0].name.slice(1) : ""}
                    <a href={this.state.courses[0] ? this.state.courses[0].school[0]._id : ""} target='_blank' style={{textDecoration: 'none', color: 'white'}} >{this.state.courses[0] ?  ' - ' + this.state.courses[0].school[0]._id : ""}</a>
                    </Typography>

                    </CardContent>
                </Card>
                <div style={{display: "flex", WebkitFlexWrap: 'wrap', flexWrap: 'wrap', WebkitJustifyContent: 'center', justifyContent: 'flex-start', paddingLeft: '24px'}}>
                    {this.generateCourseItems(this.state.courses)}
                </div>
            </div>
        );
    }
}


const styles = theme => ({

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
export default withStyles(styles)(SubjectHighlight);