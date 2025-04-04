import React from 'react';
import { useNavigate } from 'react-router-dom';

const getNavigation = (EmployeeTable) => {
  return (props) => (
    <EmployeeTable
      {...props}
      navigate={useNavigate()}
    />
  );
};

class EmployeeTable extends React.Component {
  constructor() {
    super();
  }

  handleDetailsClick = (id) => {
    this.props.navigate(`/details/${id}`);
  };

  handleEditClick = (id) => {
    this.props.navigate(`/edit/${id}`);
  };

  handleDeleteClick = (id) => {
    this.props.handleDeleteEmployee(id);
  };

  render() {
    const { employees } = this.props;

    if (!employees || employees.length === 0) {
      return <div>No employees to display.</div>;
    }

    return (
      <div className='employeetable'>
        <table
          border='1'
          cellSpacing='0'
          cellPadding='5'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Date of Joining</th>
              <th>Title</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Current Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.age}</td>
                <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
                <td>{employee.title}</td>
                <td>{employee.department}</td>
                <td>{employee.employeeType}</td>
                <td>{employee.currentStatus ? 'Working' : 'Retired'}</td>
                <td>
                  <button
                    className='btn-detail'
                    onClick={() => this.handleDetailsClick(employee._id)}>
                    Detail
                  </button>
                  <button
                    className='btn-edit'
                    onClick={() => this.handleEditClick(employee._id)}>
                    Edit
                  </button>
                  <button
                    className='btn-delete'
                    onClick={() => this.handleDeleteClick(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default getNavigation(EmployeeTable);
