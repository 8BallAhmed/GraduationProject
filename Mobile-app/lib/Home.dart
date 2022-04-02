import 'package:flutter/material.dart';
import 'package:graduationproject1/BloodGlucose.dart';
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
                              onTap: () {
                                Navigator.of(context).pushNamed("Exercise");
                              },
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
                              onTap: () {
                                Navigator.of(context).pushNamed("BloodGlucose");
                              },
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
                  Flexible(
                    flex: 1,
                    fit: FlexFit.loose,
                    child: Container(
                      width: 380,
                      height: 151,
                      decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                                color: Color(0xFF101E73).withOpacity(0.08),
                                spreadRadius: 5,
                                blurRadius: 6,
                                offset: Offset(1.0, 2.0))
                          ],
                          borderRadius: BorderRadius.circular(10),
                          color: Colors.white),
                      child: InkWell(
                        onTap: () {
                          Navigator.of(context).pushNamed("FoodIntake");
                        },
                        child: Container(
                          width: double.infinity,
                          child: Column(
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Container(
                                    margin: EdgeInsets.symmetric(vertical: 15),
                                    child: Text(
                                      "1092 Calories",
                                      style: TextStyle(fontSize: 27),
                                    ),
                                  ),
                                  SizedBox(
                                    height: 30,
                                  ),
                                ],
                              ),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceAround,
                                children: [
                                  Column(
                                    children: [
                                      Text("Fat",
                                          style: TextStyle(fontSize: 27)),
                                      SizedBox(
                                        height: 10,
                                      ),
                                      Text("13G",
                                          style: TextStyle(fontSize: 27))
                                    ],
                                  ),
                                  Column(
                                    children: [
                                      Text("Carbs",
                                          style: TextStyle(fontSize: 27)),
                                      SizedBox(
                                        height: 10,
                                      ),
                                      Text("67G",
                                          style: TextStyle(fontSize: 27))
                                    ],
                                  ),
                                  Column(
                                    children: [
                                      Text("Protein",
                                          style: TextStyle(fontSize: 27)),
                                      SizedBox(
                                        height: 10,
                                      ),
                                      Text("45G",
                                          style: TextStyle(fontSize: 27))
                                    ],
                                  ),
                                ],
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Container(
                    margin: check == 1 ? active : notActive,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Visibility(
                            visible: vis,
                            child: RawMaterialButton(
                              onPressed: () {},
                              elevation: 2.0,
                              fillColor: Colors.white,
                              child: Image.asset("images/gym.png",
                                  height: 50, width: 50),
                              padding: EdgeInsets.all(15.0),
                              shape: CircleBorder(),
                            )),
                        Column(
                          children: [
                            Visibility(
                                visible: vis,
                                child: RawMaterialButton(
                                  onPressed: () {
                                    Navigator.of(context).pushNamed("Glucose");
                                  },
                                  elevation: 2.0,
                                  fillColor: Colors.white,
                                  child: Image.asset("images/Blood.png",
                                      height: 50, width: 50),
                                  padding: EdgeInsets.all(15.0),
                                  shape: CircleBorder(),
                                )),
                            SizedBox(
                              height: 20,
                            ),
                            RawMaterialButton(
                              onPressed: () {
                                setState(() {
                                  if (vis == true) {
                                    vis = false;
                                    var1 = "+";
                                    check = 2;
                                  } else {
                                    vis = true;
                                    var1 = "-";
                                    check = 1;
                                  }
                                });
                              },
                              elevation: 2.0,
                              fillColor: Colors.white,
                              child: Text(
                                "$var1",
                                style: TextStyle(
                                    fontSize: 35, color: Color(0XFF4C75D4)),
                              ),
                              padding: EdgeInsets.all(15.0),
                              shape: CircleBorder(),
                            ),
                          ],
                        ),
                        Visibility(
                            visible: vis,
                            child: RawMaterialButton(
                              onPressed: () {
                                Navigator.of(context).pushNamed("Meals");
                              },
                              elevation: 2.0,
                              fillColor: Colors.white,
                              child: Image.asset("images/pizza.png",
                                  height: 50, width: 50),
                              padding: EdgeInsets.all(15.0),
                              shape: CircleBorder(),
                            ))
                      ],
                    ),
                  ),
                ],
              ))),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 1,
        selectedItemColor: Color(0xFF4C75D4),
        items: [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.settings_outlined,
            ),
            title: Text('Settings'),
          ),
          BottomNavigationBarItem(
            icon: new Icon(
              Icons.home_outlined,
            ),
            title: new Text(
              'Home',
              style: TextStyle(color: Color(0xFF4C75D4)),
            ),
          ),
          BottomNavigationBarItem(
              icon: Icon(Icons.medical_services_outlined),
              title: Text('Medicine'))
        ],
      ),
    );
  }
}
