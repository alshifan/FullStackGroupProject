import React from 'react';

export default class CreateForm extends React.Component {
  render() {
    const { state, onInputChange, onSubmit } = this.props;

    return (
      <div>
        <form
          className='createTable'
          onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='First Name'
            name='firstName'
            value={state.firstName}
            onChange={onInputChange}
            required
            disabled={state.isEditMode}
          />

          <input
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={state.lastName}
            onChange={onInputChange}
            required
            disabled={state.isEditMode}
          />

          <input
            type='number'
            placeholder='Age'
            name='age'
            value={state.age}
            onChange={onInputChange}
            min='20'
            max='70'
            required
            disabled={state.isEditMode}
          />

          <input
            type='date'
            name='dateOfJoining'
            value={state.dateOfJoining}
            onChange={onInputChange}
            required
            disabled={state.isEditMode}
          />

          <select
            name='title'
            value={state.title}
            onChange={onInputChange}>
            <option value='Employee'>Employee</option>
            <option value='Manager'>Manager</option>
            <option value='Director'>Director</option>
          </select>

          <select
            name='department'
            value={state.department}
            onChange={onInputChange}>
            <option value='IT'>IT</option>
            <option value='Marketing'>Marketing</option>
            <option value='HR'>HR</option>
            <option value='Engineering'>Engineering</option>
          </select>

          <select
            name='employeeType'
            value={state.employeeType}
            onChange={onInputChange}
            disabled={state.isEditMode}>
            <option value='Full-Time'>Full-Time</option>
            <option value='Part-Time'>Part-Time</option>
            <option value='Contract'>Contract</option>
            <option value='Seasonal'>Seasonal</option>
          </select>

          <select
            name='currentStatus'
            value={state.currentStatus ? '1' : '0'}
            onChange={onInputChange}>
            <option value='1'>Working</option>
            <option value='0'>Retired</option>
          </select>

          <button type='submit'>
            {!state.isEditMode ? 'Add Employee' : 'Edit Employee'}
          </button>
        </form>
      </div>
    );
  }
}
