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
              margin: EdgeInsets.fromLTRB(15, 0, 15, 15),
              width: double.infinity,
              child: Column(
                children: [
                  Container(
                    margin: EdgeInsets.fromLTRB(20, 0, 0, 35),
                    alignment: Alignment.centerLeft,
                  ),
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
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Column(
                                  children: [
                                    Text("106.4 mg/dL",
                                        style: TextStyle(
                                            fontSize: 20, color: Colors.white)),
                                    SizedBox(
                                      height: 10,
                                    ),
                                    Text("Avg",
                                        style: TextStyle(
                                            fontSize: 20, color: Colors.white)),
                                  ],
                                ),
                                Column(
                                  children: [
                                    Text("136.0 mg/dL",
                                        style: TextStyle(
                                            fontSize: 20, color: Colors.white)),
                                    SizedBox(
                                      height: 10,
                                    ),
                                    Text("Max",
                                        style: TextStyle(
                                            fontSize: 20, color: Colors.white))
                                  ],
                                ),
                                Column(
                                  children: [
                                    Text("66.0 mg/dL",
                                        style: TextStyle(
                                            fontSize: 20, color: Colors.white)),
                                    SizedBox(
                                      height: 10,
                                    ),
                                    Text("Min",
                                        style: TextStyle(
                                            fontSize: 20, color: Colors.white))
                                  ],
                                ),
                              ],
                            ),
                            SizedBox(
                              height: 20,
                            ),
                            Text("est. A1C: 5.34%",
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
                  SizedBox(
                    height: 10,
                  ),
                  Flexible(
                    flex: 1,
                    child: Container(
                      margin: EdgeInsets.symmetric(horizontal: 0),
                      height: 70,
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
                                  "120 mg/dL",
                                  style: TextStyle(fontSize: 18),
                                ),
                                SizedBox(
                                  width: 120,
                                ),
                                Column(
                                  children: [
                                    Text("Mon, Dec 31"),
                                    Text(
                                      "After Snack",
                                      style: TextStyle(
                                          fontSize: 12, color: Colors.grey),
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
              )),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        onTap: (value) {
          if (value == 1) {
            Navigator.of(context).pushReplacementNamed("Home");
          }
        },
        selectedItemColor: Color(0xFF858585),
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
