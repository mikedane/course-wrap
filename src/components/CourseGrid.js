import React from 'react';
import ReactDOM from 'react-dom';
import CourseCard from './CourseCard.js';
import { withStyles } from 'material-ui/styles';
const Helpers = require("../helpers.js");

class CourseGrid extends React.Component {
    constructor(props){
        super(props);
    }

    generateCourseItems(courses){
        return Helpers.removeDuplicateCourses(courses).map((course, index) => {
            if(course.name){
                return (
                    <CourseCard key={course._id}  margin="10px" course={course} />
                );
            } else {
                return;
            }
        });
    }

    render(){
        const { classes, courses } = this.props;
        return (
            <div className={classes.gridWrapper}>
                {this.generateCourseItems(courses)}
            </div>
        );
    }
}

const styles = theme => ({
    gridWrapper: {
        display: "flex", 
        WebkitFlexWrap: 'wrap', 
        flexWrap: 'wrap', 
        WebkitJustifyContent: 'center', 
        justifyContent: 'center', 
        paddingLeft: '24px'
    }
});
export default withStyles(styles)(CourseGrid);