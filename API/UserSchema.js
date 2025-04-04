const { gql } = require('apollo-server-express');

const schema = gql`
  scalar GraphQLDate

  type Employee {
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: GraphQLDate!
    title: String!
    department: String!
    employeeType: String!
    _id: String
    currentStatus: Boolean
  }

  input AddEmployeeInput {
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: GraphQLDate!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean!
  }

  input EditEmployeeInput {
    _id: String
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: GraphQLDate!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean!
  }

  type DeleteEmployeeResponse {
    message: String
  }

  type Query {
    employees(employeeType: String): [Employee!]!
    getEmployee(employeeId: String): Employee!
    removeEmployee(employeeId: String): DeleteEmployeeResponse!
  }

  type Mutation {
    addEmployee(employee: AddEmployeeInput!): Employee
    editEmployee(employee: EditEmployeeInput!): Employee
  }
`;

module.exports = { schema };
