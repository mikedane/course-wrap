import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
const axios = require('axios');
import Typography from 'material-ui/Typography';
const Helpers = require("../helpers.js");
import SubjectGrid from './SubjectGrid.js';
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
  } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import LazyLoad from 'react-lazyload';
import { CircularProgress } from 'material-ui/Progress';

function countCoursesInSchool(school){
    let result = 0;
    school.subjects.forEach((subject) => {

        result += subject.courseCount;
    });
    return result;
}

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            schools: []
        };
    }

    componentDidMount(){
        console.log(this.state);
        Helpers.httpGet(Helpers.apiRootUrl + "schools?getSubjects=true", result => {
            this.setState({
                schools: result.schools,
                expanded: null,
                loadedPanels: []
            });
        })
    }
    handleChange = panel => (event, expanded) => {
        let tempLoadedPanels = this.state.loadedPanels;
        if(expanded && tempLoadedPanels.indexOf(panel) == -1){
            tempLoadedPanels.push(panel);
        }
        this.setState({
          expanded: expanded ? panel : false,
          loadedPanels: tempLoadedPanels,
        });
      };

    render(){
        const { classes } = this.props;
        const { expanded, loadedPanels, schools } = this.state;
        return (
            
            <div className={classes.panelsWrapper}>
                <div className={classes.spinnerContainer}>
                    {schools.length == 0 ? <CircularProgress /> : null}
                </div>
                {schools.map(school => (
                    <div key={school._id} className={classes.panel}>
                        <ExpansionPanel expanded={expanded === school._id} onChange={this.handleChange(school._id)} >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className={classes.panelBody}>
                            <img
                                className={classes.avatar}
                                src={require(".././static/images/" + school.name.toLowerCase().split(" ").join("-") + ".jpg")}
                                alt={school.name + " school logo"}
                            />
                            <div className={classes.panelHeader}>
                                <div>
                                    <Typography variant="headline" >
                                        {school.name}
                                    </Typography>
                                    <Typography variant="subheading" color="textSecondary">
                                        {school.subjectCount+ " " + (school.subjectCount > 1 ? "Subjects" : "Subject") + " | " + school.courseCount + " " + (school.courseCount > 1 ? "Courses" : "Course")}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {expanded !== school._id && loadedPanels.indexOf(school._id) == -1  ? <span></span> :<SubjectGrid school={school} /> }
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                ))}
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
    panelsWrapper: {
        width: '1200px',
    },
    panel: {
        margin: '25px'
    },
    panelBody: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    panelHeader: {
        display: 'flex', 
        flexDirection: "columns", 
        alignItems: 'center'
    },
    avatar: {
        maxHeight: 200,
        marginRight: '25px'
      },
  });
export default withStyles(styles)(Home);