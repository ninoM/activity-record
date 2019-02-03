import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import FormModal from '../FormModal';
import Chip from '@material-ui/core/Chip';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'
import { ACTIVITY_CATEGORIES } from '../../constant';
import Moment from "moment";

const styles = () => ({
  category: {
    margin: "5px",
  },
  details: {
    marginBottom: "20px",
  }
});

class Activity extends Component {
  state = {
    editMode: false,
  }

  activateEditMode = () => {
    this.setState({ editMode: true });
  }

  deactivateEditMode = () => {
    this.setState({ editMode: false });
  }

  handleSubmit = (updatedActivity, index) => {
    this.props.edit(updatedActivity, index);
    this.deactivateEditMode();
  }
  
  render() {
    const {
      index,
      id,
      name,
      dueDate,
      categories,
      status,
      details,
      classes,
      toggle,
      remove,
    } = this.props;

    return (
      <React.Fragment>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Grid container justify="space-between">
              <Grid item xs={10}>
                <Typography  variant="h6">
                <IconButton onClick={e => { toggle(index, e) }}>
                  {status === "complete" ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon /> }
                </IconButton>
                { status === "complete" ? <del>{name}</del> : name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1">
                  {
                    Moment.unix(dueDate.seconds).fromNow()
                  }
                </Typography>
                </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container justify="center">
              <Grid item xs={12} className={classes.details}>
                <Typography variant="body1">
                  { details }
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {
                  categories.map(categoryKey => 
                    <Chip 
                    className={classes.category}
                    key={categoryKey}
                    color="secondary"
                    variant="default"
                    label={ACTIVITY_CATEGORIES[categoryKey]} />
                    )
                  }
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
          <Button onClick={() => { remove(index) }} color="secondary">Remove</Button>
            <Button onClick={this.activateEditMode} variant="contained" color="primary">
              Edit activity
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
        <FormModal 
          index={index}
          activity={
            {
              id,
              name,
              details,
              categories,
              dueDate,
              status,
            }
          }
          editMode={this.state.editMode}
          handleClose={this.deactivateEditMode}
          handleSubmit={this.handleSubmit} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Activity);