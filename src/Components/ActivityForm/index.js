import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { ACTIVITY_CATEGORIES, DEFAULT_ACTIVITY } from '../../constant'

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
    } = this.state;

    const { handleSubmit, index} = this.props;

    return (
      <div>
        <TextField 
          id="name"
          fullWidth
          value={name} 
          placeholder="What would you like to do?"
          onChange={this.handleActivityInput} />
        <TextField 
          id="details"
          multiline
          rows="4"
          value={details} 
          placeholder="OPTIONAL - add some details"
          onChange={this.handleActivityInput} />

        <Button variant="contained" color="primary" onClick={() => { handleSubmit({...this.state}, index) }}>Submit</Button>
        {
          Object.keys(ACTIVITY_CATEGORIES).map(category => 
            <Chip 
              key={category}
              variant={categories.includes(category) ? "default" : "outlined"}
              color={categories.includes(category) ? "secondary" : "default"}
              onClick={() => this.handleCategoryToggle(category)} 
              label={ACTIVITY_CATEGORIES[category]} />
          )
        }
      </div>
      )
  }
}

export default ActivityForm;
