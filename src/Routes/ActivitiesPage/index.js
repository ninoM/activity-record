import React, { Component } from 'react';
import Activity from '../../Components/Activity';
import FormModal from '../../Components/FormModal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Firestore } from '../../ApiLayer';

const styles = () => ({
  activitiesContainer: {
    maxWidth: "500px",
  }
});

class Activities extends Component {
  state = {
    activities: [],
    editMode: false,
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
      this.setState({activities: fetchedActivities});
    })

  }
  

  render() {
    const { classes } = this.props;
    const {
      activities,
    } = this.state;
    
    return (
      <div>
        <Button onClick={this.activateEditMode} variant="contained" color="primary" >
          Track an activity
        </Button>
        <div className={classes.activitiesContainer}>
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
        </div>
        <FormModal 
          handleSubmit={this.submitActivity}
          editMode={this.state.editMode}
          handleClose={this.deactivateEditMode} />
      </div>
    );
  }
}

export default withStyles(styles)(Activities);