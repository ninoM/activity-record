import React, { Component } from 'react';
import Activity from '../../Components/Activity';
import FormModal from '../../Components/FormModal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { Firestore } from '../../ApiLayer';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  activitiesContainer: {
    marginBottom: "100px",
  },
  track: {
    marginBottom: "50px",
  },
  loadingBar: {
    marginTop: "50px",
  },
});

class Activities extends Component {
  state = {
    activities: [],
    editMode: false,
    isLoading: true,
  };

  activateEditMode = () => {
    this.setState({ editMode: true });
  }

  deactivateEditMode = () => {
    this.setState({ editMode: false });
  }

  submitActivity = (activity) => {
    this.setState(({ activities }) => ({
      activities: [
        ...activities, 
        {...activity},
      ]
    }));
    this.deactivateEditMode();

    // Update firebase
    Firestore.collection("activities").add({
      ...activity
    }).then(ref => {
      const updatedActivities = this.state.activities.map(activity => {
        if (activity.id) {
          return activity
        } else {
          return ({...activity, id: ref.id})
        }
      });
      this.setState({ activities: updatedActivities });
    })
  }

  handleActivityToggle = (index, e) => {
    const updatedActivities = [...this.state.activities];
    updatedActivities[index].status = updatedActivities[index].status === "complete" ? "incomplete" : "complete";
    this.setState({ activities: updatedActivities });
    e && e.stopPropagation();

    this.updateActivityInFirebase(updatedActivities[index]);
  }

  handleActivityDelete = index => {
    const updatedActivities = [...this.state.activities];
    const firebaseId = updatedActivities[index].id
    updatedActivities.splice(index, 1);
    this.setState({ activities: updatedActivities });

    if (firebaseId) {
      Firestore.collection("activities").doc(firebaseId).delete();
    }
  }

  handleActivityEdit = (updatedActivity, index) => {
    const updatedActivities = [...this.state.activities]
    updatedActivities[index] = updatedActivity;
    this.setState({ activities: updatedActivities });

    this.updateActivityInFirebase(updatedActivity);
  }

  updateActivityInFirebase = ({id, ...updatedActivity}) => {
    Firestore.collection("activities").doc(id).set({ ...updatedActivity });
  }

  componentDidMount() {
    const fetchedActivities = [];
    Firestore.collection("activities").get().then(snapshot => {
      snapshot.forEach(doc => {
        const activity = doc.data();
        activity["id"] = doc.id;
        fetchedActivities.push(activity);
      })
    }).then(() => {
      this.setState({isLoading: false, activities: fetchedActivities});
    })

  }
  

  render() {
    const { classes } = this.props;
    const {
      activities,
    } = this.state;
    
    return (
      <div>
      <Grid container justify="center">
        <Grid item>
          <Typography variant="h1" gutterBottom>Activity Record</Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item className={classes.track}>
          <Button size="large" onClick={this.activateEditMode} variant="contained" color="primary" >
            Track an activity
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.activitiesContainer}>
        <Grid item xs={8}>
          {
            this.state.isLoading &&
            <LinearProgress className={classes.loadingBar} />
          }
        </Grid>
        <Grid item xs={5}>
          {
            activities.map((activity, index) => 
            <Activity 
            {...activity} 
            handleSubmit={this.handleActivityEdit}
            handleActivityInput={this.handleActivityInput}
            handleCategoryToggle={this.handleCategoryToggle}
            edit={this.handleActivityEdit}
            key={activity.id} 
            index={index}
            remove={this.handleActivityDelete} 
            toggle={this.handleActivityToggle} />)
          }
        </Grid>
      </Grid>
        <FormModal 
          handleSubmit={this.submitActivity}
          editMode={this.state.editMode}
          handleClose={this.deactivateEditMode} />
          </div>
    );
  }
}

export default withStyles(styles)(Activities);