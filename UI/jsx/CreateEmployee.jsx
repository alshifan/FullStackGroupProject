import React from 'react';
import CreateForm from './CreateForm.jsx';
import { useNavigate, useParams } from 'react-router-dom';

// Get param values
const getParamsValue = (CreateEmployee) => {
  return (props) => (
    <CreateEmployee
      {...props}
      urlParams={useParams()}
      navigate={useNavigate()}
    />
  );
};

class CreateEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      dateOfJoining: '',
      title: 'Employee',
      department: 'IT',
      employeeType: 'Full-Time',
      currentStatus: true,
      isEditMode: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.urlParams;
    if (id) {
      this.setState({ isEditMode: true });
      this.loadEmployeeDetail(id);
    } else {
      this.setState({ isEditMode: false });
    }
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.urlParams;

    if (!id && prevProps.urlParams.id) {
      this.resetForm();
      this.setState({ isEditMode: false });
    }
  }

  async loadEmployeeDetail(id) {
    const query = `query GetEmployee($employeeId: String) {
                        getEmployee(employeeId: $employeeId) {
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
      .then(({ data }) => {
        const {
          firstName,
          lastName,
          age,
          dateOfJoining,
          title,
          department,
          employeeType,
          currentStatus,
        } = data.getEmployee;
        this.setState({
          firstName,
          lastName,
          age,
          dateOfJoining,
          title,
          department,
          employeeType,
          currentStatus,
        });
      })
      .catch((error) => {
        console.log('Error', error);
        this.setState({ isLoading: false });
      });
  }

  handleInputChange = (event) => {
    let { name, value } = event.target;
    if (name === 'age') value = parseInt(value) || '';
    if (name === 'currentStatus') value = event.target.value === '1';
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      age,
      dateOfJoining,
      title,
      department,
      employeeType,
    } = this.state;

    // Basic validation
    if (!firstName || !lastName || age < 20 || age > 70 || !dateOfJoining) {
      alert('Please provide valid inputs.');
      return;
    }

    let employee = {
      firstName,
      lastName,
      age,
      dateOfJoining,
      title,
      department,
      employeeType,
      currentStatus: this.state.currentStatus,
    };

    if (!this.state.isEditMode) {
      const query = `
          mutation addEmployee($employee: AddEmployeeInput!) {
              addEmployee(employee: $employee) {
                  _id
                  firstName 
                  lastName 
                  age 
                  dateOfJoining 
                  title 
                  department 
                  employeeType 
                  currentStatus
              }
          }`;

      const variables = { employee };

      await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      })
        .then(() => {
          this.resetForm();
        })
        .catch((error) => {
          console.error('Error: ', error);
        });
    } else {
      const query = `
      mutation EditEmployee($employee: EditEmployeeInput!) {
        editEmployee(employee: $employee) {
          _id
        }
      }`;

      employee._id = this.props.urlParams.id;
      const variables = { employee };

      await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
      })
        .then(() => {
          this.props.navigate('/');
        })
        .catch((error) => {
          console.error('Error: ', error);
        });
    }
  };

  resetForm() {
    // Reset form
    this.setState({
      firstName: '',
      lastName: '',
      age: '',
      dateOfJoining: '',
      title: 'Employee',
      department: 'IT',
      employeeType: 'Full-Time',
      currentStatus: true,
    });
  }

  render() {
    return (
      <>
        <CreateForm
          state={this.state}
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default getParamsValue(CreateEmployee);
