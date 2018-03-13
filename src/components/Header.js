import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { withTheme, withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import { fade } from 'material-ui/styles/colorManipulator';
import SearchBar from './SearchBar.js';



import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';




class Header extends React.Component {

    

    render(){

        const { classes } = this.props;

        return (
            <div>
                <div className={classes.root}>
                    <AppBar className={classes.appBar}>
                    <Toolbar>      
                        <Link to="/" style={{textDecoration: "none", color: "inherit"}}>                  
                        <Typography className={classes.title} variant="title" color="inherit" noWrap>
                            CourseWrap
                        </Typography>
                        </Link>
                      
                        <div className={classes.grow} />
                        <SearchBar />
                    </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '10vh',
        width: '100%',
      },
      grow: {
        flex: '1 1 auto',
      },
      title: {
        marginLeft: 24,
        fontSize: `1.75em`
      },
      appBar: {
        color: "#fff"
      },

  });

export default compose(withStyles(styles))(Header);