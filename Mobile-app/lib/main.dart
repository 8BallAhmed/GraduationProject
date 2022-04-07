import 'package:flutter/material.dart';
import 'package:graduationproject1/BloodGlucose.dart';
import 'package:graduationproject1/Exercise.dart';
import 'Home.dart';
import 'BloodGlucose.dart';
import 'FoodIntake.dart';
import 'Meals.dart';
import 'Breakfast.dart';
import 'Lunch.dart';
import 'Dinner.dart';
import 'Glucose.dart';
import 'RecordForGlucose.dart';
import 'ExerciseData.dart';
import 'RecordForExercise.dart';
import 'medicine.dart';
import 'login.dart';
import 'Register.dart';
import 'ResetPassword.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: ResetPassword(),
      routes: {
        "BloodGlucose": (context) => BloodGlucose(),
        "Home": (context) => Home(),
        "Exercise": (context) => Exercise(),
        "FoodIntake": (context) => FoodIntake(),
        "Meals": (context) => Meals(),
        "Breakfast": (context) => Breakfast(),
        "Lunch": (context) => Lunch(),
        "Dinner": (context) => Dinner(),
        "Glucose": (context) => Glucose(),
        "RecordForGlucose": (context) => RecordForGlucose(),
        "ExerciseData": (context) => ExerciseData(),
        "RecordForExercise": (context) => RecordForExercise(),
        "medicine": (context) => medicine(),
        "login": (context) => login(),
        "Register": (context) => Register(),
        "ResetPassword": (context) => ResetPassword(),
      },
    );
  }
}
