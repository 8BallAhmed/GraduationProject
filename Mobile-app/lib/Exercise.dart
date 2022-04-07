import 'package:flutter/material.dart';

class Exercise extends StatefulWidget {
  Exercise({Key? key}) : super(key: key);

  @override
  State<Exercise> createState() => _ExerciseState();
}

class _ExerciseState extends State<Exercise> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Exercise"),
        centerTitle: true,
        backgroundColor: Color(0xFF4C75D4),
      ),
      body: SafeArea(
        child: Container(
          margin: EdgeInsets.all(15),
          color: Color(0XFFF6F8FB),
          child: Column(
            children: [
              Text(
                "1,250 Steps left to reach today’s goal!",
                style: TextStyle(fontSize: 35),
              ),
              SizedBox(
                height: 15,
              ),
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
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              margin: EdgeInsets.symmetric(vertical: 15),
                              child: Text(
                                "Today’s Exercise",
                                style: TextStyle(fontSize: 24),
                              ),
                            ),
                            SizedBox(
                              height: 30,
                            ),
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Column(
                              children: [
                                Text("Time", style: TextStyle(fontSize: 24)),
                                SizedBox(
                                  height: 10,
                                ),
                                Text("43 Min.", style: TextStyle(fontSize: 24)),
                              ],
                            ),
                            Column(
                              children: [
                                Text("Calories Burnt",
                                    style: TextStyle(fontSize: 24)),
                                SizedBox(
                                  height: 10,
                                ),
                                Text("423", style: TextStyle(fontSize: 24)),
                                SizedBox(
                                  height: 10,
                                ),
                                Text("Steps", style: TextStyle(fontSize: 24)),
                                Text("3,750", style: TextStyle(fontSize: 24))
                              ],
                            ),
                            Column(
                              children: [
                                Text("BPM", style: TextStyle(fontSize: 24)),
                                SizedBox(
                                  height: 10,
                                ),
                                Text("94", style: TextStyle(fontSize: 24))
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),

/////////
              SizedBox(
                height: 15,
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
                      Text("Showcases physical activity over a period of time")
                    ]),
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
