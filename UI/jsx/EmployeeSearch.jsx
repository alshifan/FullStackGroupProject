import React from 'react';
import ReactDOM from 'react-dom/client';

export default class EmployeeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      department: '',
    };
  }

  render() {
    return (
      <div className='searchinput'>
        <select
          name='employeeType'
          value={this.props.employeeType}
          onChange={this.props.handleInputChange}>
          <option value='All'>All</option>
          <option value='Full-Time'>Full-Time</option>
          <option value='Part-Time'>Part-Time</option>
          <option value='Contract'>Contract</option>
          <option value='Seasonal'>Seasonal</option>
        </select>
      </div>
    );
  }
}
