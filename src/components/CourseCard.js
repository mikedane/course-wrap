import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Truncate from 'react-truncate';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';
  import Slide from 'material-ui/transitions/Slide';
  import Chip from 'material-ui/Chip';


function Transition(props) {
return <Slide direction="up" {...props} />;
}

class CourseCard extends React.Component {
  state = { expanded: false, modalObject: {}, showModal: false };

  handleClickOpen = (course) => {
    this.setState({ showModal: true, modalObject: course });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  generateModal(){
      if(this.state.modalObject != {}){
        return (
        
            <Dialog
            open={this.state.showModal}
            transition={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">
            {this.state.modalObject.name}
            <Typography color="primary" component="p" variant="caption" style={{fontSize: "0.9em", }}>
                {this.state.modalObject.school != null ? this.state.modalObject.school.name.charAt(0).toUpperCase() + this.state.modalObject.school.name.slice(1) : ""} - {this.state.modalObject.subject != null ?this.state.modalObject.subject.name : ""}
                </Typography>
               
            </DialogTitle>


            <DialogContent>

            <span style={{float: 'left', marginRight: "25px", }}><img width="200" src={this.state.modalObject.image} /></span>    
            <DialogContentText id="alert-dialog-slide-description">
                {this.state.modalObject.description}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <Button onClick={this.handleClose} color="primary">
                <a href={this.state.modalObject.url} target="_blank" className={this.props.classes.goToCourse} >
                    Go To Course
                </a>
            </Button>
            </DialogActions>
        </Dialog>
          );
      } else {
          return;
      }
      
  }


  render() {
    const { classes, course } = this.props;
   
    return (
      <div>
        <Card style={{margin: this.props.margin}} className={classes.card}>
           
          <CardMedia onClick={() => this.handleClickOpen(course)}
            className={classes.media}
            image={course.image}
            title={course.name}
          />
       
          <CardContent style={{paddingRight: "5px", paddingLeft: "5px"}}>
            
           

            <Typography variant="title" component="h2" style={{fontSize: "1.1rem", fontWeight: "400", height: "2.4rem"}}>
                <Truncate lines={2}  >
                    {course.name}
                </Truncate>

          </Typography>



            <Typography component="p" variant="caption" style={{fontSize: "0.9em", marginTop: "10px"}}>
                <Truncate lines={1}  >
                {course.school.name.charAt(0).toUpperCase() + course.school.name.slice(1)} - {course.subject.name}

                </Truncate>
            </Typography>
          </CardContent>
          <CardActions>
          <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <Button size="small" color="primary">
            <a href={course.url} target="_blank" className={classes.goToCourse} >

                Go To Course
                </a>

            </Button>

        </CardActions>
        </Card>
        {this.generateModal()}
      </div>
    );
  }
}


const styles = theme => ({
    card: {
    padding: "5px",
      width: 200,
    },
    media: {
        height: 120,

    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    goToCourse : {
        textDecoration: "none",
        color: theme.palette.primary.main
    }



    
      
    


  });
export default withStyles(styles)(CourseCard);