import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');
import SubjectCard from './SubjectCard.js';
import GridList, { GridListTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import green from 'material-ui/colors/green';
import { fade } from 'material-ui/styles/colorManipulator';
import { withTheme, withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Chip from 'material-ui/Chip';


class SchoolSubjectGrid extends React.Component {
    constructor(props){
        super(props);
        console.log("Constructor");
        this.state = {
            subjects: []
        }
    }

    componentWillMount(){
        console.log(this.props.match.params.school);
        axios.get('https://us-central1-test-api-197100.cloudfunctions.net/ocwScraper/data/' + this.props.match.params.school)
            .then((response) => {
                this.setState({
                    subjects: response.data.subjects
                });
            });
    }



    generateSubjectItems(subjects){
        return subjects.map((subject, index) => {
            return (
                <SubjectCard key={subject._id}  margin="10px" subject={subject}/>
            );
        });
    }
    countCoursesInSchool(){
        let result = 0;
        this.state.subjects.forEach((subject) => {
            result += subject.courses;
        });
        return result;
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
            <Card className={classes.titleCard}>
                            <CardMedia
                                className={classes.cover}
                                image={this.state.subjects && this.state.subjects[0] ? require(".././static/images/" + this.state.subjects[0].school[0].name.toLowerCase().split(" ").join("-") + ".jpg") : "/"}
                                title="Live from space album cover"
                                />
                                <CardContent>
                                
                                <Typography variant="headline" >
                                {this.state.subjects && this.state.subjects[0] ? this.state.subjects[0].school[0].name.charAt(0).toUpperCase() + this.state.subjects[0].school[0].name.slice(1) : ""}
                                </Typography>
                                <Typography variant="subheading" color="textSecondary">
                                {this.state.subjects && this.state.subjects[0] ? this.state.subjects.length + " " + (this.state.subjects.length > 1 ? "Subjects" : "Subject") : ""} | {this.countCoursesInSchool() + " " + (this.countCoursesInSchool() > 1 ? "Courses" : "Course")}
                                </Typography>
                                </CardContent>
                            </Card>
                
                <div style={{display: "flex", WebkitFlexWrap: 'wrap', flexWrap: 'wrap', WebkitJustifyContent: 'center', justifyContent: 'flex-start', paddingLeft: '24px'}}>
                    {this.generateSubjectItems(this.state.subjects)}
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
      titleCard: {
        marginLeft: "35px", marginTop: "25px",
        width: '400px',
        display: 'flex'
    },
    cover: {
        width: 100,
        height: 100,
      },

});
export default withStyles(styles)(SchoolSubjectGrid);