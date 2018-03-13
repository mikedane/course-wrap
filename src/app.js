import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Header from './components/Header.js';
import SubjectGrid from './components/SubjectGrid.js';
import SubjectHighlight from './components/SubjectHighlight.js';
import SearchResults from './components/SearchResults.js';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
const axios = require('axios');
import brown from 'material-ui/colors/green';




export default class App extends React.Component {




    render() {
        const theme = createMuiTheme({
            palette: {
                primary: brown,
              },
        });
        return (
            <MuiThemeProvider theme={theme}>
                
                <div>
                    <Router>
                        <div>
                            <Header />
                            
                            <Route exact path="/" component={SubjectGrid} />
                            <Route exact path="/search-results" component={SearchResults} />
                            <Route exact path="/data/:school" component={SubjectGrid} />
                            <Route exact path="/data/:school/:subject" component={SubjectHighlight} />
                        </div>
                    </Router>
                </div>   
            </MuiThemeProvider>

               
   
        );
    }
}