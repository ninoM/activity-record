import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    width: "100%",
    margin: "10px",
  },
  trashContainer: {
    display: "inline",
  }
});

class Activity extends Component {
  render() {
    const {
      id,
      name,
      dueDate,
      category,
      status,
      details,
      classes,
      toggle,
      remove,
    } = this.props;
    return (
      <div>
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary>
            <Typography variant="h6">
            {status === "complete" ? <del>{name}</del> : name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="body1">
              { details }
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>

          <Button onClick={() => { remove(id) }}>Remove</Button>
            <Button onClick={() => { toggle(id) }} variant="contained" color="primary">Complete</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>

      </div>
    );
  }
}

export default withStyles(styles)(Activity);