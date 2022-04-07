import 'package:flutter/material.dart';

class BloodGlucose extends StatefulWidget {
  BloodGlucose({Key? key}) : super(key: key);

  @override
  State<BloodGlucose> createState() => _BloodGlucoseState();
}

class _BloodGlucoseState extends State<BloodGlucose> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Blood Glucose"),
        centerTitle: true,
        backgroundColor: Color(0xFF4C75D4),
      ),
      body: SafeArea(
        child: Container(
          margin: EdgeInsets.all(15),
          color: Color(0XFFF6F8FB),
          child: Column(
            children: [
              Flexible(
                flex: 1,
                fit: FlexFit.loose,
                child: Container(
                  width: 380,
                  height: 220,
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
                  child: Container(
                    width: double.infinity,
                    child: Column(children: [
                      Container(
                        margin: EdgeInsets.symmetric(vertical: 15),
                        child: Text(
                          "Graph",
                          style: TextStyle(fontSize: 27),
                        ),
                      ),
                      SizedBox(
                        height: 30,
                      ),
                      Text(
                          "Showcases Blood Glucose Levels over a\n period of time")
                    ]),
                  ),
                ),
              ),

/////////
              SizedBox(
                height: 15,
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
                              Text("123 mg/dL", style: TextStyle(fontSize: 30))
                            ],
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      width: 10,
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
                        child: Container(
                          padding: EdgeInsets.only(top: 60),
                          child: Column(
                            children: [
                              Text(
                                "A1c Level",
                                style: TextStyle(fontSize: 17),
                              ),
                              SizedBox(
                                height: 20,
                              ),
                              Text("5.3%", style: TextStyle(fontSize: 30))
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              ///
              ///
              ///
              ///

              SizedBox(
                height: 15,
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
                                "Biometrics",
                                style: TextStyle(fontSize: 27),
                              ),
                            ),
                            SizedBox(
                              height: 30,
                            ),
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            Column(
                              children: [
                                Text("Weight", style: TextStyle(fontSize: 27)),
                                SizedBox(
                                  height: 10,
                                ),
                                Text("102 KG", style: TextStyle(fontSize: 27))
                              ],
                            ),
                            Column(
                              children: [
                                Text("Height", style: TextStyle(fontSize: 27)),
                                SizedBox(
                                  height: 10,
                                ),
                                Text("182cm", style: TextStyle(fontSize: 27))
                              ],
                            ),
                            Column(
                              children: [
                                Text("BMI", style: TextStyle(fontSize: 27)),
                                SizedBox(
                                  height: 10,
                                ),
                                Text("31.7", style: TextStyle(fontSize: 27))
                              ],
                            ),
                          ],
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
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
