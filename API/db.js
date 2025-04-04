const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const dburl = process.env.DB_URL;
let db;

async function connectDb() {
  const client = new MongoClient(dburl, { useUnifiedTopology: true });
  await client.connect();
  db = client.db();
  console.log('Connected to MongoDB');
}

async function getEmployees(employeeType) {
  // Apply filter
  const filter = employeeType === 'All' ? {} : { employeeType };

  try {
    const employees = await db.collection('Employees').find(filter).toArray();
    return employees;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getEmployeeById(employeeId) {
  // validate object id
  const id = ObjectId.isValid(employeeId) ? new ObjectId(employeeId) : null;

  if (!id) {
    throw new Error('Invalid employeeId format');
  }

  try {
    const employee = await db
      .collection('Employees')
      .find({ _id: id })
      .toArray();

    if (employee.length === 0) {
      throw new Error('No employee found with the given ID');
    }

    return employee[0];
  } catch (error) {
    console.error('Error: ', error);
  }
}

async function removeEmployeeById(employeeId) {
  // validate object id
  const id = ObjectId.isValid(employeeId) ? new ObjectId(employeeId) : null;

  if (!id) {
    throw new Error('Invalid employeeId format');
  }

  try {
    const result = await db.collection('Employees').deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new Error('No employee found with the given ID');
    }

    return { message: 'Employee deleted successfully' };
  } catch (error) {
    console.error(error);
  }

  return null;
}

async function insertEmployee(employee) {
  try {
    return await db.collection('Employees').insertOne(employee);
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
}

async function updateEmployee(employee) {
  try {
    if (!employee._id) {
      throw new Error('Employee ID is required for updating.');
    }

    const id = ObjectId.isValid(employee._id)
      ? new ObjectId(employee._id)
      : null;

    if (!id) {
      throw new Error('Invalid employee ID format.');
    }

    delete employee._id;

    const result = await db
      .collection('Employees')
      .updateOne({ _id: id }, { $set: employee });

    if (!result) {
      throw new Error('No employee found with the given ID.');
    }

    return employee;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

module.exports = {
  connectDb,
  getEmployees,
  insertEmployee,
  getEmployeeById,
  removeEmployeeById,
  updateEmployee,
};
