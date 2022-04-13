import 'package:flutter/material.dart';
import 'package:graduationproject1/BloodGlucose.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';
import 'constants.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:jiffy/jiffy.dart';

class Home extends StatefulWidget {
  Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  bool vis = false;
  var var1 = "+";
  var check = 2;
  DateTime dateTime = DateTime.now();

  getUserInformation() async {
    var url = "http://10.0.2.2:8000/patient/profile";

    var res = await http.get(Uri.parse(url), headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer $token'
    });

    var resBody = jsonDecode(res.body);

    setState(() {
      Userprofile.add(resBody["patient"]["account"]);
    });
   
  }

  @override
  void initState() {
    // TODO: implement initState

    // getglucosedata();
    getUserInformation();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Userprofile == null || Userprofile.isEmpty
              ? Center(
                  child: CircularProgressIndicator(),
                )
              : Container(
                  margin: EdgeInsets.symmetric(horizontal: 15),
                  color: Color(0XFFF6F8FB),
                  child: Column(
                    children: [
                      Container(
                        margin: EdgeInsets.symmetric(vertical: 10),
                        child: Container(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            "Hello, ${Userprofile[0]["name"]}!\n${Jiffy(dateTime).EEEE}, ${Jiffy(dateTime).format("do")} of ${Jiffy(dateTime).MMMM} ",
                            style: TextStyle(fontSize: 30),
                          ),
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
                                        color:
                                            Color(0xFF101E73).withOpacity(0.08),
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
                                          "$Calories_Burnt Calories Burnt",
                                          style: TextStyle(fontSize: 15),
                                        ),
                                        SizedBox(height: 20),
                                        Image.asset("images/pedestrian.png"),
                                        SizedBox(height: 20),
                                        Text(
                                          "$Steps Steps",
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
                                        color:
                                            Color(0xFF101E73).withOpacity(0.08),
                                        spreadRadius: 5,
                                        blurRadius: 6,
                                        offset: Offset(1.0, 2.0))
                                  ],
                                  borderRadius: BorderRadius.circular(10),
                                  color: Colors.white,
                                ),
                                child: InkWell(
                                  onTap: () {
                                    Navigator.of(context)
                                        .pushNamed("BloodGlucose");
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
                                        Text(
                                            glucose_test.isEmpty
                                                ? "0 mg/dL"
                                                : "$avgS mg/dL",
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
                                        margin:
                                            EdgeInsets.symmetric(vertical: 15),
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
                                          Text("$Fat G",
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
                                          Text("$Carbs G",
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
                                          Text("$Protein G",
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
                                  onPressed: () {
                                    Navigator.of(context)
                                        .pushNamed("ExerciseData");
                                  },
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
                                        Navigator.of(context)
                                            .pushNamed("Glucose");
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
        onTap: (value) {
          if (value == 1) {
            Navigator.of(context).pushReplacementNamed("Home");
          }
          if (value == 2) {
            Navigator.of(context).pushNamed("medicine");
          }
        },
        items: [
          BottomNavigationBarItem(
            icon: Icon(
              Icons.settings_outlined,
            ),
            label: "Settings",
          ),
          BottomNavigationBarItem(
            icon: new Icon(
              Icons.home_outlined,
            ),
            label: "Home",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.medical_services_outlined),
            label: "Medicine",
          )
        ],
      ),
    );
  }
}
