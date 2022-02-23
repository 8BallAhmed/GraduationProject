import 'package:flutter/material.dart';
import 'constants.dart';

class Home extends StatefulWidget {
  Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  var name = "Robert Fox";
  bool vis = false;
  var var1 = "+";
  var check = 2;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Container(
              margin: EdgeInsets.symmetric(horizontal: 15),
              color: Color(0XFFF6F8FB),
              child: Column(
                children: [
                  Container(
                    margin: EdgeInsets.symmetric(vertical: 10),
                    child: Text(
                      "Hello, $name!\nTuesday, 19th of October",
                      style: TextStyle(fontSize: 30),
                    ),
                  ),
                  Container(
                    child: Row(
                      children: [
                        Flexible(
                          flex: 1,
                          fit: FlexFit.tight,
                          child: Container(
                            height: 175,
                            decoration: BoxDecoration(
                              boxShadow: [
                                BoxShadow(
                                    color: Color(0xFF101E73).withOpacity(0.08),
                                    spreadRadius: 5,
                                    blurRadius: 6,
                                    offset: Offset(1.0, 2.0))
                              ],
                              borderRadius: BorderRadius.circular(10),
                              color: Colors.white,
                            ),
                            child: InkWell(
                              onTap: () {},
                              child: Container(
                                padding: EdgeInsets.all(10),
                                child: Column(
                                  children: [
                                    Text(
                                      "486 Calories Burnt",
                                      style: TextStyle(fontSize: 15),
                                    ),
                                    SizedBox(height: 20),
                                    Image.asset("images/pedestrian.png"),
                                    SizedBox(height: 20),
                                    Text(
                                      "3500 Steps",
                                      style: TextStyle(fontSize: 18),
                                    )
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(
                          width: 20,
                        ),
                        Flexible(
                          flex: 1,
                          fit: FlexFit.tight,
                          child: Container(
                            height: 175,
                            decoration: BoxDecoration(
                              boxShadow: [
                                BoxShadow(
                                    color: Color(0xFF101E73).withOpacity(0.08),
                                    spreadRadius: 5,
                                    blurRadius: 6,
                                    offset: Offset(1.0, 2.0))
                              ],
                              borderRadius: BorderRadius.circular(10),
                              color: Colors.white,
                            ),
                            child: InkWell(
                              onTap: () {},
                              child: Container(
                                padding: EdgeInsets.only(top: 60),
                                child: Column(
                                  children: [
                                    Text(
                                      "Avg. Blood Glucose",
                                      style: TextStyle(fontSize: 17),
                                    ),
                                    SizedBox(
                                      height: 20,
                                    ),
                                    Text("123 mg/dL",
                                        style: TextStyle(fontSize: 30))
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                ],
              ))),
    );
  }
}
