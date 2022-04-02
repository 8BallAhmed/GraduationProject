import 'package:flutter/material.dart';

class Glucose extends StatefulWidget {
  Glucose({Key? key}) : super(key: key);

  @override
  State<Glucose> createState() => _GlucoseState();
}

class _GlucoseState extends State<Glucose> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Glucose",
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
              margin: EdgeInsets.all(15),
              width: double.infinity,
              child: Column(
                children: [
                  Container(
                    margin: EdgeInsets.fromLTRB(20, 20, 0, 35),
                    alignment: Alignment.centerLeft,
                  )
                ],
              )),
        ),
      ),
    );
  }
}
