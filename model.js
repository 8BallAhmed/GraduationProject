require("dotenv").config({ path: __dirname + "/.env" }); // Set running DIR
const { Sequelize, DataTypes } = require("sequelize");

const DBUSER = process.env.DBUSER;
const DBPASSWORD = process.env.DBPASSWORD;

const connection = new Sequelize(
  `postgres://${DBUSER}:${DBPASSWORD}@localhost:5432/glucoguardian`
);

try {
  connection.authenticate().then(() => {
    console.log(`Connection established successfully`);
  });
} catch (error) {
  console.log(`Unable to connect to Database on user: ${DBUSER}`);
}

const Account = connection.define("account", {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  password: DataTypes.STRING,
  address: DataTypes.STRING,
  name: DataTypes.STRING,
  SSN: DataTypes.STRING,
  gender: DataTypes.BOOLEAN,
  city: DataTypes.STRING,
  dob: DataTypes.DATEONLY,
  account_type: DataTypes.STRING,
});

const Patient = connection.define("patient", {
  patient_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bmi: DataTypes.FLOAT,
  diabetes_treatment: DataTypes.STRING,
  diabetes_type: DataTypes.STRING,
  chronic_diseases: DataTypes.STRING,
  A1C_level: DataTypes.STRING,
  glucometer_sensor: DataTypes.STRING,
  glucometer_sensor: DataTypes.STRING,
});

// Adds foreign key FK_EMAIL, no need to explicitly add email as attirbute to patient model
Patient.belongsTo(Account, { foreignKey: "fk_email", targetKey: "email" });

const Doctor = connection.define("doctor", {
  doctor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Doctor.belongsTo(Account, { foreignKey: "fk_email", targetKey: "email" });

Account.sync().then(() => {
  console.log("Account table synced!");
});

Patient.sync().then(() => {
  console.log("Patient table synced!");
});
