import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { HashRouter as Route, Link } from "react-router-dom";
import Truncate from 'react-truncate';
import LazyLoad from 'react-lazyload';
import ShareIcon from 'material-ui-icons/Share';
import IconButton from 'material-ui/IconButton';


class SubjectCard extends React.Component {

  render() {
    const { classes, subject, school, margin } = this.props;

    return (
      <div style={{margin: margin}}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Subject" className={classes.avatar}
                            alt={school.name}
                            src={require(".././static/images/" + school.name.toLowerCase().split(" ").join("-") + ".jpg")}>
                        </Avatar>
                    }
                    title={
                        <Link to={"/subject?id=" + subject._id} key={subject.name} style={{textDecoration: 'none'}}>
                            <Typography variant="title" style={{fontSize: "1.2em"}}>
                                <Truncate lines={1}  >
                                    {subject.name}
                                </Truncate>
                            </Typography>
                        </Link>
                    }
                    subheader={subject.courseCount + (subject.courseCount > 1 ? " Courses" : " Course") + " | " + school.name}
                    action={
                        <a href={'https://www.facebook.com/sharer/sharer.php?u=' + subject.url} target="_blank" style={{zIndex: 1000}} >
                            <IconButton aria-label="Share">
                                <ShareIcon />
                            </IconButton>
                        </a>
                      }
                />
                <LazyLoad once height={194}>
                    <Link to={"/subject?id=" + subject._id} key={subject.name} style={{textDecoration: 'none'}}>

                        <CardMedia
                            className={classes.media}
                            image={subject.image}
                            title={subject.name}
                        />
                    </Link>
                </LazyLoad>
            </Card>
      </div>
    );
  }
}

const styles = theme => ({
    card: {
      width: 325,
      maxHeight: 275
    },
    media: {
      height: 194,
    },
  });

export default withStyles(styles)(SubjectCard);