import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withTheme, withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
import Button from 'material-ui/Button';
import { Link } from 'material-ui-icons';


class Footer extends React.Component{

    render(){
        const { classes } = this.props;
        return(
                <div className={classes.footerFlex}>
                    <div className={classes.footerFlexItem}>
                        <Typography variant="headline" color="inherit" className={classes.flex} style={{fontSize: '27px'}}>
                            CourseWrap
                        </Typography>
                        <br />
                        <Typography variant="body1" color="inherit" className={classes.flex} style={{fontSize: "16px"}}>
                            CourseWrap is the ultimate resource for finding free and high quality OpenCourseWare content
                            from the world's best companies and universities!
                        </Typography>
                        <br />
                        <a href="https://en.wikipedia.org/wiki/OpenCourseWare" target="_blank" style={{textDecoration: 'none'}}>
                        <Button variant="raised" color="primary" style={{color: "white"}}>

                            Learn More
                        </Button>
                        </a>
                    </div>
                    <div className={classes.footerFlexItem}>
                        <Typography variant="headline" color="inherit" className={classes.flex} style={{fontSize: '27px'}}>
                            Popular Links
                        </Typography>
                        <br />
                        <a href="https://ocw.mit.edu/index.htm" target="_blank" style={{textDecoration: 'none', color: "white"}}>
                            <Typography variant="body1" color="inherit" className={classes.flex} style={{fontSize: "16px"}}>
                            <Link style={{fontSize: '20px'}}/> &nbsp;
                                MIT OpenCourseWare
                            </Typography>
                        </a>
                        <a href="https://oyc.yale.edu/" target="_blank" style={{textDecoration: 'none', color: "white"}}>
                            <Typography variant="body1" color="inherit" className={classes.flex} style={{fontSize: "16px"}}>
                            <Link style={{fontSize: '20px'}}/> &nbsp;
                                Open Yale Courses
                            </Typography>
                        </a>
                        <a href="https://www.edx.org/" target="_blank" style={{textDecoration: 'none', color: "white"}}>

                            <Typography variant="body1" color="inherit" className={classes.flex} style={{fontSize: "16px"}}>
                                <Link style={{fontSize: '20px'}}/> &nbsp;
                                edX Courses
                            </Typography>
                        </a>
                        <br />
                    </div>
                </div>
        );
    }
}

const styles = {

    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    footerFlex: {
        display: 'flex',
        color: "white",
        paddingTop: '25px',
        paddingBottom: '25px',
        paddingLeft: '50px',
        paddingRight: '50px',
        justifyContent: "space-between",
        backgroundColor: grey[600],
        flexWrap: 'wrap'
    },
    footerFlexItem: {
        maxWidth: "400px",
    }
  };
  export default withStyles(styles)(Footer);
