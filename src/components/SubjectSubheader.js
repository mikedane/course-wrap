import React from 'react';
import ReactDOM from 'react-dom';
import Typography from 'material-ui/Typography';
import green from 'material-ui/colors/green';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

class SubjectSubheader extends React.Component {
    render(){
        const { classes, subject } = this.props;
        return (
            <Paper className={classes.subheaderWrapper}>
                <div className={classes.subheader}>
                    <Typography variant="headline" component="h2" className={classes.title}>
                        {subject.name}
                    </Typography>
                    <Typography className={classes.subtitle}>
                        { subject.courses.length + (subject.courses.length > 1 ? " Courses" : " Course") + " | " + subject.school.name}
                        <a href={subject.school._id} target='_blank' style={{textDecoration: 'none', color: 'white'}} >{' - ' + subject.school._id}</a>
                    </Typography>
                    </div>
            </Paper>
        );
    }
}


const styles = theme => ({
    subheaderWrapper: {
        backgroundColor: green[400],
    },
    subheader: {
        marginLeft: '2%',
        marginRight: '2%',
    },

    title: {
        color: 'white',
    },
    subtitle: {
        fontSize: 14,
        color: 'white'
    },
});
export default withStyles(styles)(SubjectSubheader);