import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, typography } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { HashRouter as Route, Link } from "react-router-dom";
import Truncate from 'react-truncate';



const styles = theme => ({
  card: {
    width: 400,
    maxHeight: 275
  },
  media: {
    height: 194,
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
  },
});

class SubjectCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes, subject } = this.props;

    return (
      <div style={{margin: this.props.margin}}>
        <Link to={"/data/" + subject.school[0].name.toLowerCase() + "/" + subject.url.split("/").pop()} key={subject.name} style={{textDecoration: 'none'}}>

        <Card className={classes.card}>
        <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}
              alt={subject.school[0].name}
              src={require(".././static/images/" + subject.school[0].name.toLowerCase().split(" ").join("-") + ".jpg")}>
              </Avatar>
            }
            action={
                <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              }
            title={
                <Typography variant="title" style={{fontSize: "1.2em"}}>
                    <Truncate lines={1}  >
                                {subject.name}
                    </Truncate>
                
                </Typography>
            
            }
            subheader={subject.courses + (subject.courses > 1 ? " Courses" : " Course") + " | " + subject.school[0].name.charAt(0).toUpperCase() + subject.school[0].name.slice(1)}
          />
          <CardMedia
            className={classes.media}
            image={subject.image}
            title={subject.name}
          />

        </Card>
        </Link>
      </div>
    );
  }
}



export default withStyles(styles)(SubjectCard);