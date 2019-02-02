import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Activity from '../../Components/Activity';
import { withStyles } from '@material-ui/core/styles';

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
        category: "personal",
        dueDate: "Next week",
        status: "complete",
        details: "4 tires to buy",
      },
      {
        name: "Get business cards",
        category: "business",
        dueDate: "tomorrow",
        status: "incomplete",
        details: "have to pick up all 500 business cards",
      },
      {
        name: "Take a break",
        category: "personal",
        dueDate: "in an hour",
        status: "incomplete",
        details: "have to take a break and drink water",
      },
    ],
    currentActivity: "",
  };

  submitActivity = event => {
    event.key === "Enter" &&
    this.setState(({activities, currentActivity}) => ({
      currentActivity: "",
      activities: [
        ...activities, 
        { 
          name: currentActivity,
          category: "personal",
          dueDate: "tomorrow",
          status: "incomplete",
          details: "some details here",
        }
      ]
    }));
  }

  handleActivityInput = event => {
    this.setState({ currentActivity: event.target.value });
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

  render() {
    const { classes } = this.props;
    
    return (
      <div>
      <TextField 
        value={this.state.currentActivity} 
        onKeyPress={this.submitActivity} 
        placeholder="What would you like to do?"
        onChange={this.handleActivityInput} />

      <div className={classes.activitiesContainer}>
        {
          this.state.activities.map((activity, index) => 
            <Activity {...activity} id={index} key={index} remove={this.handleActivityDelete} toggle={this.handleActivityToggle} />)
        }
      </div>
        </div>
    );
  }
}

export default withStyles(styles)(Activities);