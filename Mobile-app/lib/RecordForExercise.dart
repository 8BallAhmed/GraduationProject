import 'package:flutter/material.dart';

class RecordForExercise extends StatefulWidget {
  RecordForExercise({Key? key}) : super(key: key);

  @override
  State<RecordForExercise> createState() => _RecordForExerciseState();
}

class _RecordForExerciseState extends State<RecordForExercise> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Create Record",
          style: TextStyle(fontSize: 25),
        ),
        centerTitle: true,
        backgroundColor: Color(0xFF4C75D4),
      ),
      body: SafeArea(
        child: Container(
          color: Color(0XFFF6F8FB),
          width: double.infinity,
          child: Container(
            margin: EdgeInsets.fromLTRB(15, 0, 15, 15),
            width: double.infinity,
            child: Column(
              children: [
                Container(
                  margin: EdgeInsets.fromLTRB(20, 0, 0, 35),
                  alignment: Alignment.centerLeft,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
