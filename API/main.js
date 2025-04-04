const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const { schema } = require('./UserSchema');
const {
  connectDb,
  getEmployees,
  insertEmployee,
  getEmployeeById,
  removeEmployeeById,
  updateEmployee,
} = require('./db.js');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index.html');
});

const port = process.env.API;

const resolvers = {
  Query: {
    // Fetch employees based on employee type
    employees: async (_, { employeeType }) => {
      try {
        const employees = await getEmployees(employeeType);
        return employees || []; // Return an empty array if no employees are found
      } catch (error) {
        console.error('Error fetching employees:', error);
        return [];
      }
    },

    // Fetch a single employee by ID
    getEmployee: async (_, { employeeId }) => {
      try {
        const employee = await getEmployeeById(employeeId);
        return employee || null;
      } catch (error) {
        console.error('Error fetching employee by ID:', error);
        return null;
      }
    },

    // Remove a single employee by ID
    removeEmployee: async (_, { employeeId }) => {
      try {
        const response = await removeEmployeeById(employeeId);
        return response;
      } catch (error) {
        console.error('Error removing employee by ID:', error);
        return null;
      }
    },
  },
  Mutation: {
    addEmployee,
    editEmployee,
  },
};

async function addEmployee(_, { employee }) {
  await insertEmployee(employee);
  return employee;
}

async function editEmployee(_, { employee }) {
  await updateEmployee(employee);
  return employee;
}

const server = new ApolloServer({ typeDefs: schema, resolvers });

server.start().then(async () => {
  server.applyMiddleware({ app, path: '/graphql' });
  await connectDb();
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
});
