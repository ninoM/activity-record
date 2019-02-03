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
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    width: "100%",
  },
});

class Activity extends Component {
  render() {
    const {
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
        <ExpansionPanel className={classes.root}>
          <ExpansionPanelSummary>
            <Typography  variant="h6">
            <IconButton onClick={e => { toggle(id, e) }}>
              {status === "complete" ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon /> }
            </IconButton>
            { status === "complete" ? <del>{name}</del> : name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="body1">
              { details }
            </Typography>
            {
              Object.keys(categories).map(categoryKey => 
                <Chip 
                key={categoryKey}
                color="secondary"
                variant="default"
                label={categories[categoryKey]} />
                )
            }
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
          <Button onClick={() => { remove(id) }} color="secondary">Remove</Button>
            <Button onClick={this.activateEditMode} variant="contained" color="primary">
              Edit activity
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Activity);