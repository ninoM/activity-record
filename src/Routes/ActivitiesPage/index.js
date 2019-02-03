import React, { Component } from 'react';
import Activity from '../../Components/Activity';
import FormModal from '../../Components/FormModal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {
  ACTIVITY_CATEGORIES,
  DEFAULT_ACTIVITY,
} from '../../constant';

const styles = () => ({
  activitiesContainer: {
    maxWidth: "500px",
  }
});

class Activities extends Component {
  state = {
    activities: [
      {
        name: "Buy new tires",
        categories: ["personal"],
        dueDate: "Next week",
        status: "complete",
        details: "4 tires to buy",
      },
      {
        name: "Get business cards",
        categories: ["business"],
        dueDate: "tomorrow",
        status: "incomplete",
        details: "have to pick up all 500 business cards",
      },
      {
        name: "Take a break",
        categories: ["personal", "leisure"],
        dueDate: "in an hour",
        status: "incomplete",
        details: "have to take a break and drink water",
      },
    ],
    editMode: false,
  };

  activateEditMode = () => {
    this.setState({ editMode: true });
  }

  deactivateEditMode = () => {
    this.setState({ editMode: false });
  }

  submitActivity = (activity) => {
    console.log(activity);
    this.setState(({ activities }) => ({
      activities: [
        ...activities, 
        { 
          name: activity.name,
          categories: activity.categories,
          dueDate: activity.dueDate,
          status: activity.status,
          details: activity.details,
        }
      ]
    }));
  }

  handleActivityToggle = (index, e) => {
    const updatedActivities = [...this.state.activities];
    updatedActivities[index].status = updatedActivities[index].status === "complete" ? "incomplete" : "complete";
    this.setState({ activities: updatedActivities });
    e && e.stopPropagation();
  }

  handleActivityDelete = index => {
    const updatedActivities = [...this.state.activities];
    updatedActivities.splice(index, 1);
    this.setState({ activities: updatedActivities });
  }

  handleActivityEdit = (updatedActivity, index) => {
    const updatedActivities = [...this.state.activities]
    updatedActivities[index] = updatedActivity;
    this.setState({ activities: updatedActivities });
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
                id={index} 
                key={index} 
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