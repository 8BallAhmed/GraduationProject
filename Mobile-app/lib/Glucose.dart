import 'package:flutter/material.dart';
import 'constants.dart';

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
            onPressed: () {
              Navigator.of(context).pushNamed("RecordForGlucose");
            },
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
              child: ListView(
                children: [
                  Container(
                    margin: EdgeInsets.fromLTRB(20, 0, 0, 35),
                    alignment: Alignment.centerLeft,
                  ),
                  Row(
                    children: [
                      Flexible(
                        flex: 1,
                        fit: FlexFit.loose,
                        child: Container(
                          width: 380,
                          height: 150,
                          decoration: BoxDecoration(
                            boxShadow: [
                              BoxShadow(
                                  color: Color(0xFF101E73).withOpacity(0.08),
                                  spreadRadius: 5,
                                  blurRadius: 6,
                                  offset: Offset(1.0, 2.0))
                            ],
                            borderRadius: BorderRadius.circular(10),
                            color: Color(0xFF4C75D4),
                          ),
                          child: Container(
                            width: double.infinity,
                            child: Column(
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    SizedBox(
                                      height: 30,
                                    ),
                                  ],
                                ),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceEvenly,
                                  children: [
                                    Column(
                                      children: [
                                        Text("$avgS mg/dL",
                                            style: TextStyle(
                                                fontSize: 20,
                                                color: Colors.white)),
                                        SizedBox(
                                          height: 10,
                                        ),
                                        Text("Avg",
                                            style: TextStyle(
                                                fontSize: 20,
                                                color: Colors.white)),
                                      ],
                                    ),
                                    Column(
                                      children: [
                                        Text("$max mg/dL",
                                            style: TextStyle(
                                                fontSize: 20,
                                                color: Colors.white)),
                                        SizedBox(
                                          height: 10,
                                        ),
                                        Text("Max",
                                            style: TextStyle(
                                                fontSize: 20,
                                                color: Colors.white))
                                      ],
                                    ),
                                    Column(
                                      children: [
                                        Text("$min mg/dL",
                                            style: TextStyle(
                                                fontSize: 20,
                                                color: Colors.white)),
                                        SizedBox(
                                          height: 10,
                                        ),
                                        Text("Min",
                                            style: TextStyle(
                                                fontSize: 20,
                                                color: Colors.white))
                                      ],
                                    ),
                                  ],
                                ),
                                SizedBox(
                                  height: 20,
                                ),
                                Text("est. A1C: $A1C%",
                                    style: TextStyle(
                                        fontSize: 20, color: Colors.white)),
                                SizedBox(
                                  height: 20,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  ListView.builder(
                      shrinkWrap: true,
                      physics: NeverScrollableScrollPhysics(),
                      itemCount: glucose_test.length,
                      itemBuilder: ((context, index) {
                        return Column(
                          children: [
                            Row(
                              children: [
                                Flexible(
                                  flex: 1,
                                  child: Container(
                                    margin: EdgeInsets.symmetric(horizontal: 0),
                                    height: 70,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(10),
                                      color: Colors.white,
                                    ),
                                    child: Container(
                                      margin: EdgeInsets.fromLTRB(15, 15, 0, 0),
                                      alignment: Alignment.centerLeft,
                                      child: Column(
                                        children: [
                                          Row(
                                            children: [
                                              Image.asset("images/Blood.png",
                                                  height: 40, width: 40),
                                              SizedBox(
                                                width: 10,
                                              ),
                                              Text(
                                                "${glucose_test[index]["glucose_level"]}",
                                                style: TextStyle(fontSize: 18),
                                              ),
                                              SizedBox(
                                                width: 170,
                                              ),
                                              Column(
                                                children: [
                                                  Text(
                                                      "${glucose_test[index]["time"]}"
                                                          .substring(0, 10)),
                                                  Text(
                                                    "${glucose_test[index]["time_interval"]}" ==
                                                            "null"
                                                        ? ""
                                                        : "${glucose_test[index]["time_interval"]}",
                                                    style: TextStyle(
                                                        fontSize: 12,
                                                        color: Colors.grey),
                                                  )
                                                ],
                                              )
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(
                              height: 15,
                            ),
                          ],
                        );
                      })),
                ],
              )),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        onTap: (value) {
          if (value == 1) {
            Navigator.of(context).pushReplacementNamed("Home");
          }
          if (value == 2) {
            Navigator.of(context).pushNamed("medicine");
          }
        },
        selectedItemColor: Color(0xFF858585),
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
