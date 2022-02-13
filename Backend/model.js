require("dotenv").config({ path: "../.env" }); // Set running DIR
const { Sequelize, DataTypes, DATE, Model } = require("sequelize");

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
    A1C_level: DataTypes.STRING,
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
    duration: DataTypes.FLOAT,
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
    nix_item_id: DataTypes.STRING,
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
    blood_pressure: DataTypes.FLOAT,
    pills: DataTypes.STRING,
    glucose_level: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    meal: DataTypes.STRING,
    time_interval: DataTypes.STRING,
    time: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Supervision = connection.define(
  "supervision",
  {
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

const Medicine = connection.define(
  "medicine",
  {
    medicine_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
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
  Patient.belongsTo(Account, { foreignKey: "fk_email", targetKey: "email" });

  Doctor.belongsTo(Account, { foreignKey: "fk_email", targetKey: "email" });

  Patient.hasMany(Activity, { foreignKey: "fk_patient_id" });

  Patient.hasMany(Food, { foreignKey: "fk_patient_id" });

  Patient.hasMany(GlucoseTest, { foreignKey: "fk_patient_id" });

  Patient.belongsToMany(Doctor, {
    through: Appointment,
    foreignKey: "fk_patient_id",
  });
  Doctor.belongsToMany(Patient, {
    through: Appointment,
    foreignKey: "fk_doctor_id",
  });

  Patient.belongsToMany(Doctor, {
    through: Supervision,
    foreignKey: "fk_patient_id",
  });
  Doctor.belongsToMany(Patient, {
    through: Supervision,
    foreignKey: "fk_doctor_id",
  });

  Patient.belongsToMany(Doctor, {
    through: Treatment,
    foreignKey: "fk_patient_id",
  });
  Doctor.belongsToMany(Patient, {
    through: Treatment,
    foreignKey: "fk_doctor_id",
  });
  Treatment.belongsTo(Medicine, { foreignKey: "fk_medicine_id" });
  console.log("Tables created with referential constraints! (DEV/PROD)");
} else {
  console.log("Tables created with no referential constraints! (TEST)");
}

// --------------------------------------------------------------

// --- Synchronization and validation

connection.sync({}).then(() => {
  console.log("All models were synchronized successfully.");
});

// --- Exporting DB Tables, to be imported in express-app.js

module.exports.Treatment = Treatment;
module.exports.Doctor = Doctor;
module.exports.Patient = Patient;
module.exports.Medicine = Medicine;
module.exports.Food = Food;
module.exports.Activity = Activity;
module.exports.Appointment = Appointment;
module.exports.Supervision = Supervision;
module.exports.GlucoseTest = GlucoseTest;
module.exports.Account = Account;
