require("dotenv").config({ path: "./.env" }); // Set running DIR
const { Sequelize, DataTypes, DATE, Model } = require("sequelize");

const DBUSER = process.env.DBUSER;
const DBPASSWORD = process.env.DBPASSWORD;
console.log(DBUSER);
console.log(DBPASSWORD);

const connection = new Sequelize(
  `postgres://${DBUSER}:${DBPASSWORD}@localhost:5432/glucoguardian`,
  {
    logging: false,
  }
);

try {
  connection.authenticate().then(() => {
    console.log(`Connection established successfully`);
  });
} catch (error) {
  console.log(`Unable to connect to Database on user: ${DBUSER}`);
}

const Account = connection.define(
  "account",
  {
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
  },
  {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps: false,
  }
);

// Adds foreign key FK_EMAIL, no need to explicitly add email as attirbute to patient model
const Patient = connection.define(
  "patient",
  {
    patient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    bmi: DataTypes.FLOAT,
    diabetes_treatment: DataTypes.STRING,
    diabetes_type: DataTypes.STRING,
    chronic_diseases: DataTypes.STRING,
    A1C_level: DataTypes.DOUBLE,
    glucometer_sensor: DataTypes.STRING,
  },
  {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps: false,
  }
);

// Adds foreign key FK_EMAIL, no need to explicitly add email as attirbute to Doctor model
const Doctor = connection.define(
  "doctor",
  {
    doctor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps: false,
  }
);

const Activity = connection.define(
  "activity",
  {
    activity_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    calories: DataTypes.FLOAT,
    duration: DataTypes.TIME,
    type: DataTypes.STRING,
    time: DataTypes.DATE,
  },
  {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps: false,
  }
);

const Food = connection.define(
  "food",
  {
    food_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    food_item: DataTypes.JSON,
  },
  {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps: false,
  }
);

const GlucoseTest = connection.define(
  "glucose_test",
  {
    test_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blood_pressure: DataTypes.STRING,
    pills: DataTypes.STRING,
    glucose_level: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    meal: DataTypes.STRING,
    time_interval: DataTypes.STRING,
    time: DataTypes.DATE,
    anamoly: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Supervision = connection.define(
  "supervision",
  {
    supervision_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comments: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Appointment = connection.define(
  "appointment",
  {
    appointment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    visit_time: DataTypes.DATE,
    date: DataTypes.DATEONLY,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Treatment = connection.define(
  "treatment",
  {
    treatment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    medicine_name: DataTypes.STRING,
    description: DataTypes.STRING,
    unit: DataTypes.STRING,
    dosage: DataTypes.INTEGER,
    date_of_prescription: DataTypes.DATEONLY,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// --- Refrential Constratins

if (
  process.env.NODE_ENV == "development" ||
  process.env.NODE_ENV == "production"
) {
  //relationships

  // one to one realtioship with account FK is not null and unique
  Patient.belongsTo(Account, {
    foreignKey: { name: "fk_email", allowNull: false, unique: true },
    targetKey: "email",
  });

  // one to one realtioship with account FK is not null and unique
  Doctor.belongsTo(Account, {
    foreignKey: { name: "fk_email", allowNull: false, unique: true },
    targetKey: "email",
  });

  // one to many realtioship with Activity table FK is not null
  Patient.hasMany(Activity, {
    foreignKey: { name: "patient_id", allowNull: false },
  });

  // one to many realtioship with Food table FK is not null
  Patient.hasMany(Food, {
    foreignKey: { name: "patient_id", allowNull: false },
  });

  // one to many realtioship with glucose_test table FK is not null
  Patient.hasMany(GlucoseTest, {
    foreignKey: { name: "patient_id", allowNull: false },
  });

  // -- many to many relationship between doctor and patient in appoitment table
  // bellow code was commented out because it has been an issue for sequlize to allow n:m with nonunique composite key since 2015
  // check the issue below
  // https://github.com/sequelize/sequelize/issues/5077
  // i had to do it manually using belongsto
  // Patient.belongsToMany(Doctor, {
  //   through: { model: Supervision, unique: false }, constraints: false,// to remove composite primary-key
  //   foreignKey: { name: "fk_patient_id", allowNull: false },
  // });
  // Doctor.belongsToMany(Patient, {
  //   through: { model: Supervision, unique: false }, constraints: false, // to remove composite primary-key
  //   foreignKey: { name: "fk_doctor_id", allowNull: false },
  // });

  // i had to do it manually using belongsTo to fix the problem
  Supervision.belongsTo(Patient, {
    foreignKey: { name: "fk_patient_id", allowNull: false },
    targetKey: "patient_id",
  });
  Supervision.belongsTo(Doctor, {
    foreignKey: { name: "fk_doctor_id", allowNull: false },
    targetKey: "doctor_id",
  });

  Appointment.belongsTo(Patient, {
    foreignKey: { name: "fk_patient_id", allowNull: false },
    targetKey: "patient_id",
  });
  Appointment.belongsTo(Doctor, {
    foreignKey: { name: "fk_doctor_id", allowNull: false },
    targetKey: "doctor_id",
  });

  Treatment.belongsTo(Patient, {
    foreignKey: { name: "fk_patient_id", allowNull: false },
    targetKey: "patient_id",
  });
  Treatment.belongsTo(Doctor, {
    foreignKey: { name: "fk_doctor_id", allowNull: false },
    targetKey: "doctor_id",
  });
  console.log("Tables created with referential constraints! (DEV/PROD)");
} else {
  console.log("Tables created with no referential constraints! (TEST)");
}

// --------------------------------------------------------------

// --- Synchronization and validation
// force : true drop and recreate the tables everytime you start the app
connection.sync({force:false}).then(() => {
  console.log("All models were synchronized successfully.");
});

// --- Exporting DB Tables, to be imported in express-app.js

module.exports.Treatment = Treatment;
module.exports.Doctor = Doctor;
module.exports.Patient = Patient;
module.exports.Food = Food;
module.exports.Activity = Activity;
module.exports.Appointment = Appointment;
module.exports.Supervision = Supervision;
module.exports.GlucoseTest = GlucoseTest;
module.exports.Account = Account;
