import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';
const axios = require('axios');
import SubjectCard from './SubjectCard.js';
import Truncate from 'react-truncate';
import { KeyboardArrowRight } from 'material-ui-icons';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { HashRouter as Route, Link } from "react-router-dom";

 
class SubjectGrid extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            schoolNames: ["mit", "yale"],
            schools: []
        };
    }

    componentDidMount(){
        this.state.schoolNames.forEach((school, index) => {
            axios.get('https://us-central1-test-api-197100.cloudfunctions.net/ocwScraper/data/' + school.toLowerCase()).then((response) => {
                let tempSchools = this.state.schools;
                tempSchools.push({name: school, subjects: response.data.subjects});
                this.setState({
                    schools: tempSchools
                });
            });
        });   
    }

    countCoursesInSchool(school){
        let result = 0;
        school.subjects.forEach((subject) => {
            result += subject.courses;
        });
        return result;
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                {this.state.schools.map(school => (
                    <div key={school.name.toString()}>
                        <Link style={{textDecoration: 'none'}} to={"/data/" + school.name.split(" ").join("-").toLowerCase()}>
                            <Card className={classes.titleCard}>
                            <CardMedia
                                className={classes.cover}
                                image={require(".././static/images/" + school.name.toLowerCase().split(" ").join("-") + ".jpg")}
                                title="Live from space album cover"
                                />
                                <CardContent>
                                
                                <Typography variant="headline" >
                                {school.name.charAt(0).toUpperCase() + school.name.slice(1)}
                                </Typography>
                                <Typography variant="subheading" color="textSecondary">
                                {school.subjects.length + " " + (school.subjects.length > 1 ? "Subjects" : "Subject")} | {this.countCoursesInSchool(school) + " " + (this.countCoursesInSchool(school) > 1 ? "Courses" : "Course")}
                                </Typography>
                                </CardContent>
                            </Card>
                        </Link>

                        <div className={classes.root}>

                            <GridList className={classes.gridList}>
                                {school.subjects.map(subject => (
                                    <div key={subject.name} style={{marginRight: "10px"}}>
                                        <SubjectCard subject={subject}/>
                                    </div>
                                ))}
                            </GridList>
                            <span style={{position: 'absolute', right: 25, marginTop: '100px'}}>
                                <KeyboardArrowRight style={{fontSize: '100px', opacity: "0.8"}} />
                            </span>
                            
                        </div>   
                    </div>
                    
                ))}

            </div>
        );
    }

}



const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      marginLeft: '50px', marginRight: '50px', marginTop: '20px', marginBottom: '75px',
      height: 275
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
    },
    titleCard: {
        marginLeft: "50px", marginTop: "50px",
        width: '400px',
        display: 'flex'
    },
    cover: {
        width: 100,
        height: 100,
      },
  });
export default withStyles(styles)(SubjectGrid);