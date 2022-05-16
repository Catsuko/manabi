import React, { Component } from 'react';
import './AddTopicForm.scss'

class AddTopicForm extends Component {
  constructor(props) {
    super(props)
    this.state = { topic: '' }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ topic: event.target.value })
  }

  handleSubmit = (event) => {
    this.props.onSubmit(this.state.topic);
    event.preventDefault();
    this.setState({ topic: '' });
  }

  render () {
    const noTopic = this.state.topic.trim().length === 0;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2 className='mt0'>Found something good?</h2>

        <input
          type='text'
          autoFocus
          className='w-100 pa2 br2 dark-gray'
          required={true}
          value={this.state.topic}
          onChange={this.handleChange}
        />

        <input
          type='submit'
          className='dim pointer mt3 bw1 br2 ba b--dark-gray dark-gray bg-transparent pa2 b'
          value='Add it'
          disabled={noTopic}
        />
      </form>
    )
  }
}

export default AddTopicForm;