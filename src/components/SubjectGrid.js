import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');
import SubjectCard from './SubjectCard.js';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

class SubjectGrid extends React.Component {
    constructor(props){
        super(props);
    }

    generateSubjectItems(school){
        const { classes } = this.props;
        return school.subjects.map((subject, index) => {
            return (
                    <SubjectCard key={subject._id}  margin="10px" subject={subject} school={school}/>
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
            <div className={classes.wrapper}>
                {this.generateSubjectItems(this.props.school)}
            </div>
        );
    }
}

const styles = theme => ({
    wrapper: {
        display: "flex", 
        WebkitFlexWrap: 'wrap', 
        flexWrap: 'wrap', 
        WebkitJustifyContent: 'center', 
        justifyContent: 'flex-start'
    },
    link: {
        textDecoration: 'none',
    }
});
export default withStyles(styles)(SubjectGrid);