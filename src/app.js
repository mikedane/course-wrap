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
                
                
                    <Router>
                        <div>
                            <Header />
                            <div style={{display:'flex', minHeight: '100vh', flexDirection: 'column'}}>
                                <div style={{flex: '1 0 auto', margin: '0 auto !important', float: 'none !important'}}>
                                    <Route exact path="/" component={SubjectGrid} />
                                    <Route exact path="/search-results" component={SearchResults} />
                                    <Route exact path="/data/:school" component={SubjectGrid} />
                                    <Route exact path="/data/:school/:subject" component={SubjectHighlight} />
                                </div>
                            </div>
                        </div>
                    </Router>
            </MuiThemeProvider>

               
   
        );
    }
}