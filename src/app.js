// React
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route} from "react-router-dom";
// Custom Components
import Header from './components/Header.js';
import Home from './components/Home.js';
import Subject from './components/Subject.js';
import SubjectGrid from './components/SubjectGrid.js';
import Footer from './components/Footer.js';
import CourseGrid from './components/CourseGrid.js';
import SearchResults from './components/SearchResults.js';
// Material Ui
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';




class App extends React.Component {
    render() {
        const theme = createMuiTheme({
            palette: {
                primary: green,
              }
        });
        const { classes } = this.props;
        return (
            <div>






            <MuiThemeProvider theme={theme}>
                <Router onUpdate={() => window.scrollTo(0, 0)}>
                    <div className={classes.body}>
                            <Header />
                            <div className={classes.main}>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/subject" component={Subject} />
                                <Route exact path="/search" component={SearchResults} />
                            </div>
                            <Footer />
                        </div>
                </Router>
            </MuiThemeProvider>
            </div>               
        );
    }
}



const styles = theme => ({
    body: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#fcfcfc',
    },
    main: {
        flex: '1 0 auto',
        display: 'flex', 
        justifyContent: 'center'
    },
});

export default withStyles(styles)(App);



// <div className={classes.body}>
// <Header />
//     <div className={classes.main}>
//         <div className={classes.pageWrap}>
//             <div className={classes.pageMargin}>
                                <Route exact path="/" render={() => <Home/>} />

                {/* <Route exact path="/" component={SubjectGrid} />
                    <Route exact path="/" render={() => <Home/>} />

                <Route exact path="/search-results" component={SearchResults} />
                <Route exact path="/data/:school" component={SchoolSubjectGrid} />
                <Route exact path="/data/:school/:subject" component={SubjectHighlight} /> */}
            {/* </div>
        </div>
    </div>
<Footer />
</div> */}