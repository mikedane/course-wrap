import React from 'react';
import ReactDOM from 'react-dom';

// Material Ui
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';


class Footer extends React.Component{

    render(){
        const { classes } = this.props;
        return(
            <Paper>
                <div className={classes.footerWrap}>
                    <div className={classes.footer}>
                        <div className={classes.footerItem}>
                            <Typography variant="headline" color="inherit" className={classes.footerHeading}>
                                CourseWrap
                            </Typography>
                            <br />
                            <Typography variant="body1" color="inherit" className={classes.footerText}>
                                CourseWrap is the ultimate resource for finding free and high quality OpenCourseWare content
                                from the world's best companies and universities!
                            </Typography>
                            <br />
                            <a href="https://en.wikipedia.org/wiki/OpenCourseWare" target="_blank" className={classes.link}>
                                <Button variant="raised" color="primary" className={classes.button}>
                                    Learn More
                                </Button>
                            </a>
                        </div>
                        <div className={classes.footerItem}>
                            <Typography variant="headline" color="inherit"  className={classes.footerHeading}>
                                Popular Links
                            </Typography>
                            <br />
                            <a href="https://ocw.mit.edu/index.htm" target="_blank" className={classes.link}>
                                <Typography variant="body1" color="inherit" className={classes.footerText} >
                                
                                    MIT OpenCourseWare
                                </Typography>
                            </a>
                            <a href="https://oyc.yale.edu/" target="_blank" className={classes.link}>
                                <Typography variant="body1" color="inherit" className={classes.footerText}>
                                    Open Yale Courses
                                </Typography>
                            </a>
                            <a href="https://www.edx.org/" target="_blank" className={classes.link}>

                                <Typography variant="body1" color="inherit" className={classes.footerText} >
                                    edX Courses
                                </Typography>
                            </a>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
}

const styles = theme => ({
    footerWrap: {
        display: 'flex', 
        justifyContent: 'center',
        background: grey[600], 
        paddingTop: '1em',
        paddingBottom: '1em',
    },
    footer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between', 
        width: '1400px', 
        marginLeft: '2%',
        marginRight: '2%',
        color: 'white',
    },
    footerItem: {
        maxWidth: '400px',
    },
    footerText: {
        fontSize: '1em',
    },
    footerHeading: {
        fontSize: '1.7em',
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    },
    button: {
        color: 'white',
    },
});
  export default withStyles(styles)(Footer);
