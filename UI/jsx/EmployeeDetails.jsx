import React from 'react';
import { useParams } from 'react-router-dom';

// Get param values
const getParamsValue = (EmployeeDetails) => {
  return (props) => (
    <EmployeeDetails
      {...props}
      urlParams={useParams()}
    />
  );
};

class EmployeeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeDetails: null,
      isLoading: false,
      isError: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.urlParams;
    this.loadData(id);
  }

  async loadData(id) {
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
        const employeeDetails = data.getEmployee;
        this.setState({ employeeDetails, isLoading: false });
      })
      .catch((error) => {
        console.log('Error', error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { employeeDetails, isLoading } = this.state;

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    return (
      employeeDetails && (
        <div className='employee-details-container'>
          <h1>Employee Details</h1>
          <div className='employee-card'>
            <h2>
              {employeeDetails.firstName} {this.state.employeeDetails.lastName}
            </h2>
            <p>
              <strong>Age:</strong> {employeeDetails.age}
            </p>
            <p>
              <strong>Joining Date:</strong> {employeeDetails.dateOfJoining}
            </p>
            <p>
              <strong>Title:</strong> {employeeDetails.title}
            </p>
            <p>
              <strong>Department:</strong> {employeeDetails.department}
            </p>
            <p>
              <strong>Employment Type:</strong> {employeeDetails.employeeType}
            </p>
          </div>
        </div>
      )
    );
  }
}

export default getParamsValue(EmployeeDetails);
