import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'moment';
import { Firebase } from '../../ApiLayer'
import { DateTimePicker } from 'material-ui-pickers';
import { ACTIVITY_CATEGORIES, DEFAULT_ACTIVITY } from '../../constant'

const styles = () => ({
  root: {
    padding: "50px"
  },
  categoryContainer: {
    marginTop: "10px",
    marginBottom: "30px",
  },
  categoryIndividual: {
    marginLeft: "20px",
  },
  submitButton: {
    // margin: "30px 0px",
  },
  inputContainer: {
    marginBottom: "30px",
  }
});

class ActivityForm extends Component {
  state = { ...DEFAULT_ACTIVITY, }

  handleActivityInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleCategoryToggle = category => {
    const currentCategory = this.state.categories;
    if (currentCategory.includes(category)) {
      const updatedCategories = [...currentCategory]
      updatedCategories.splice(currentCategory.indexOf(category), 1)
      this.setState({ categories: updatedCategories})
    } else {
      this.setState({ categories: [...currentCategory, category] })
    }
  }

  handleDateChange = date => {
    this.setState({dueDate: Firebase.firestore.Timestamp.fromMillis(parseInt(date.format("x")))});
  }

  componentDidMount() {
    if (typeof this.props.index !== undefined) {
      this.setState({ ...this.props.activity })
    }
  }
  

  render() {
    const {
      name,
      details,
      categories,
      dueDate,
    } = this.state;

    const { handleSubmit, index, classes} = this.props;

    return (
      <Grid container justify="space-between" alignItems="center" className={classes.root}>
        <Grid item xs={12} className={classes.inputContainer}>
          <TextField 
            id="name"
            variant="outlined"
            fullWidth
            value={name} 
            placeholder="What would you like to do?"
            onChange={this.handleActivityInput} />
        </Grid>
        <Grid item xs={12} className={classes.inputContainer}>
          <TextField 
            id="details"
            variant="outlined"
            fullWidth
            multiline
            rows="4"
            value={details} 
            placeholder="OPTIONAL - add some details"
            onChange={this.handleActivityInput} />
        </Grid>

        <Grid item xs={12} className={classes.categoryContainer}>
          {
            Object.keys(ACTIVITY_CATEGORIES).map(category => 
              <Chip 
              className={classes.categoryIndividual}
              key={category}
              variant={categories.includes(category) ? "default" : "outlined"}
              color={categories.includes(category) ? "secondary" : "default"}
              onClick={() => this.handleCategoryToggle(category)} 
              label={ACTIVITY_CATEGORIES[category]} />
              )
            }
        </Grid>
        <Grid item xs={8}>
          <DateTimePicker label="Due date" onChange={this.handleDateChange} value={Moment.unix(dueDate.seconds)} />
        </Grid>
        <Grid item xs={4} className={classes.submitButton}>
          <Button size="large" variant="contained" color="primary" onClick={() => { handleSubmit({...this.state}, index) }}>Submit</Button>
        </Grid>
      </Grid>
      )
  }
}

export default withStyles(styles)(ActivityForm);
