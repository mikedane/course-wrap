import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Redirect } from "react-router-dom";
import SearchBar from './SearchBar.js';

// Material Ui
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import { fade } from 'material-ui/styles/colorManipulator';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';




class Header extends React.Component {
    
    render(){
        const { classes } = this.props;
        return (
            <Paper>
                <div className={classes.headerWrap}>
                    <div className={classes.header}>
                            <Link to="/" className={classes.link}>
                                <Typography variant="title" color="inherit" className={classes.title}>
                                        CourseWrap
                                </Typography>
                            </Link>
                            <Hidden only="xs">
                                <Route path="/" component={SearchBar} />
                            </Hidden>
                    </div>
                </div>
            </Paper>
        );
    }
}

const styles = theme => ({

    title: {
        fontSize: '2em',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    headerWrap: {
        display: 'flex', 
        justifyContent: 'center',
        background: theme.palette.primary.main, 
        paddingTop: '1em',
        paddingBottom: '1em',
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between', 
        width: '1400px', 
        marginLeft: '2%',
        marginRight: '2%',
        color: 'white',
    },
});

export default withStyles(styles)(Header);