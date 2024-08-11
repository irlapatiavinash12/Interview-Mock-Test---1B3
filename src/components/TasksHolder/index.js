import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class TasksHolder extends Component {
  state = {
    optionTagsList: tagsList.map(eachItem => ({...eachItem, isActive: false})),
    optionValue: tagsList[0].displayText,
    inputValue: '',
    tasksList: [],
    allCategoryList: [],
    activeCategory: '',
  }

  onChangeOption = event => {
    const displayObject = tagsList.find(
      eachItem => eachItem.optionId === event.target.value,
    )
    this.setState({optionValue: displayObject.displayText})
  }

  renderClearInputs = () => {
    const {tasksList} = this.state
    this.setState({
      allCategoryList: tasksList,
      inputValue: '',
      optionValue: tagsList[0].displayText,
    })
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  renderOutput = () => {
    const {optionTagsList, allCategoryList} = this.state
    const result = optionTagsList.every(eachItem => eachItem.isActive === false)
    if (result === true) {
      this.setState({tasksList: allCategoryList})
    } else {
      const activeValue = optionTagsList.find(
        eachItem => eachItem.isActive === true,
      )
      const filteredList = allCategoryList.filter(
        eachItem => eachItem.optionValue === activeValue.displayText,
      )
      this.setState({tasksList: filteredList})
    }
  }

  renderCategory = data => {
    const {optionTagsList} = this.state
    const updatedTagList = optionTagsList.map(eachItem =>
      eachItem.optionId === data.optionId
        ? {...eachItem, isActive: !eachItem.isActive}
        : {...eachItem, isActive: false},
    )
    this.setState({optionTagsList: updatedTagList}, this.renderOutput)
  }

  onSubmission = event => {
    event.preventDefault()
    const {optionValue, inputValue} = this.state
    const objectData = {
      id: uuidv4(),
      optionValue: optionValue,
      inputValue: inputValue,
    }
    this.setState(
      prevState => ({tasksList: [...prevState.tasksList, objectData]}),
      this.renderClearInputs,
    )
  }

  render() {
    const {optionValue, inputValue, tasksList, activeCategory, optionTagsList} =
      this.state
    return (
      <div className='main-bg'>
        <div className='input-section'>
          <h1 className='input-title-element'>Create a task!</h1>
          <form className='form-styling' onSubmit={this.onSubmission}>
            <div className='each-input'>
              <label className='label-styling' htmlFor='task'>
                Task
              </label>
              <input
                className='input-field'
                id='task'
                type='input'
                onChange={this.onChangeInput}
                value={inputValue}
                placeholder='Enter the task here'
              />
            </div>
            <div className='each-input'>
              <label className='label-styling' htmlFor='tag'>
                Tags
              </label>
              <select
                className='input-field'
                id='tag'
                value={
                  tagsList.find(
                    eachItem => eachItem.displayText === optionValue,
                  ).optionId
                }
                onChange={this.onChangeOption}
              >
                {tagsList.map(eachItem => (
                  <option value={eachItem.optionId} key={eachItem.optionId}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type='submit' className='add-task-button'>
              Add Task
            </button>
          </form>
        </div>
        <div className='output-section'>
          <h1 className='output-title'>Tags</h1>
          <ul className='task-specification-unordered-list-styling'>
            {optionTagsList.map(eachItem => (
              <li className='list-item-styling' key={eachItem.optionId}>
                <button
                  type='button'
                  className={
                    eachItem.isActive
                      ? 'specification-active-button'
                      : 'specification-button'
                  }
                  onClick={() => this.renderCategory(eachItem)}
                >
                  {eachItem.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 className='output-title'>Tasks</h1>
          <ul className='tasks-unordered-list'>
            {tasksList.map(eachItem => (
              <li className='list-item-styling' key={eachItem.id}>
                <div className='eachTodo'>
                  <p className='descript'>{eachItem.inputValue}</p>
                  <p className='categorised-button'>{eachItem.optionValue}</p>
                </div>
              </li>
            ))}
          </ul>
          {tasksList.length === 0 && (
            <p className='no-tasks-title'>No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default TasksHolder
