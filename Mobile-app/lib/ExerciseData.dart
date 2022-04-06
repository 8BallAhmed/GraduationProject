import 'package:flutter/material.dart';

class ExerciseData extends StatefulWidget {
  ExerciseData({Key? key}) : super(key: key);

  @override
  State<ExerciseData> createState() => _ExerciseDataState();
}

class _ExerciseDataState extends State<ExerciseData> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Exercise",
          style: TextStyle(fontSize: 25),
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: Icon(
              Icons.add_outlined,
            ),
          )
        ],
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
              )),
        ),
      ),
    );
  }
}
