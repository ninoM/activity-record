import React, { Component } from 'react';
import Activity from '../../Components/Activity';
import ActivityForm from '../../Components/ActivityForm'
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
        categories: [ACTIVITY_CATEGORIES.personal],
        dueDate: "Next week",
        status: "complete",
        details: "4 tires to buy",
      },
      {
        name: "Get business cards",
        categories: [ACTIVITY_CATEGORIES.business],
        dueDate: "tomorrow",
        status: "incomplete",
        details: "have to pick up all 500 business cards",
      },
      {
        name: "Take a break",
        categories: [ACTIVITY_CATEGORIES.personal, ACTIVITY_CATEGORIES.leisure],
        dueDate: "in an hour",
        status: "incomplete",
        details: "have to take a break and drink water",
      },
    ],
    currentActivity: DEFAULT_ACTIVITY,
  };

  submitActivity = event => {
    event.preventDefault();
    this.setState(({activities, currentActivity}) => ({
      currentActivity: DEFAULT_ACTIVITY,
      activities: [
        ...activities, 
        { 
          name: currentActivity.name,
          categories: currentActivity.categories,
          dueDate: currentActivity.dueDate,
          status: currentActivity.status,
          details: currentActivity.details,
        }
      ]
    }));
  }

  handleActivityInput = event => {
    this.setState({ currentActivity: { ...this.state.currentActivity, [event.target.id]: event.target.value} });
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

  handleCategoryToggle = category => {
    const { currentActivity } = this.state;
    const currentCategory = currentActivity.categories;
    if (currentCategory.includes(category)) {
      const updatedCategories = [...currentCategory]
      updatedCategories.splice(currentCategory.indexOf(category), 1)
      this.setState({currentActivity: {...currentActivity, categories: updatedCategories}})
    } else {
      this.setState({ currentActivity: { ...currentActivity, categories: [...currentCategory, category] } })
    }
  }

  render() {
    const { classes } = this.props;
    const {
      activities,
      currentActivity
    } = this.state;
    
    return (
      <div>
        <ActivityForm 
          handleSubmit={this.submitActivity}
          handleActivityInput={this.handleActivityInput}
          handleCategoryToggle={this.handleCategoryToggle}
          {...currentActivity} />
      <div className={classes.activitiesContainer}>
        {
          activities.map((activity, index) => 
            <Activity 
              {...activity} 
              id={index} 
              key={index} 
              edit={this.handleActivityEdit}
              remove={this.handleActivityDelete} 
              toggle={this.handleActivityToggle} />)
        }
      </div>
        </div>
    );
  }
}

export default withStyles(styles)(Activities);