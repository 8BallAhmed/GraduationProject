import 'package:flutter/material.dart';

class RecordForGlucose extends StatefulWidget {
  RecordForGlucose({Key? key}) : super(key: key);

  @override
  State<RecordForGlucose> createState() => _RecordForGlucoseState();
}

class _RecordForGlucoseState extends State<RecordForGlucose> {
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
              )),
        ),
      ),
    );
  }
}
