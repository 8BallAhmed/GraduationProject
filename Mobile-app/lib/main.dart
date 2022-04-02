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

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Home(),
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
      },
    );
  }
}
