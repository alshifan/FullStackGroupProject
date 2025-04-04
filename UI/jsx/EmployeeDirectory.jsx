import React from 'react';
import ReactDOM from 'react-dom/client';
import EmployeeSearch from './EmployeeSearch.jsx';
import EmployeeTable from './EmployeeTable.jsx';

export default class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = { employees: [], employeeType: 'All' };
  }

  componentDidMount() {
    this.loadData(this.state.employeeType);
  }

  async loadData(employeeType) {
    const query = `
              query Query($employeeType: String) {
  employees(employeeType: $employeeType) {
    firstName
    lastName
    age
    dateOfJoining
    title
    department
    employeeType
    _id
    currentStatus
  }
}`;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: {
          employeeType: employeeType,
        },
      }),
    });

    const result = await response.json();
    if (result.data) {
      this.setState({
        employees: result.data.employees,
        filteredEmployees: result.data.employees,
      });
    } else {
      console.log('Error fetching data:', result.errors);
    }
  }

  filterEmployees = (filterCriteria) => {
    const filtered = this.state.employees.filter((employee) => {
      return Object.keys(filterCriteria).every((key) => {
        const filterValue = filterCriteria[key].trim().toLowerCase();
        const employeeValue = employee[key]
          ? employee[key].toString().toLowerCase()
          : '';

        return filterValue === '' || employeeValue.includes(filterValue);
      });
    });

    this.setState({ filteredEmployees: filtered });
  };

  handleEmployeeTypeChange = (event) => {
    const employeeType = event.target.value;
    this.setState({
      employeeType,
    });
    this.loadData(employeeType);
  };

  handleDeleteEmployee = async (id) => {
    const query = `query RemoveEmployee($employeeId: String) {
                    removeEmployee(employeeId: $employeeId) {
                      message
                    }
                  }`;

    await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: {
          employeeId: id,
        },
      }),
    })
      .then(async (res) => await res.json())
      .then(() => {
        this.loadData(this.state.employeeType);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  render() {
    return (
      <div>
        <h1>Employee Management System</h1>
        <EmployeeSearch
          employeeType={this.state.employeeType}
          handleInputChange={this.handleEmployeeTypeChange}
        />
        <EmployeeTable
          employees={this.state.filteredEmployees}
          handleDeleteEmployee={(id) => this.handleDeleteEmployee(id)}
        />
      </div>
    );
  }
}
