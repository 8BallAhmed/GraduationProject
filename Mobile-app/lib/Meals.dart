import 'package:flutter/material.dart';

class Meals extends StatefulWidget {
  Meals({Key? key}) : super(key: key);

  @override
  State<Meals> createState() => _MealsState();
}

class _MealsState extends State<Meals> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Your Meals"),
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
                      child: Text(
                        "Today",
                        style: TextStyle(fontSize: 30),
                      )),
                  Flexible(
                    flex: 1,
                    child: InkWell(
                      onTap: () {},
                      child: Container(
                        margin: EdgeInsets.symmetric(horizontal: 20),
                        height: 81,
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                                color: Color(0xFF101E73).withOpacity(0.08),
                                spreadRadius: 5,
                                blurRadius: 6,
                                offset: Offset(1.0, 2.0))
                          ],
                          borderRadius: BorderRadius.circular(10),
                          color: Color(0XFF4C75D4),
                        ),
                        child: Container(
                          margin: EdgeInsets.fromLTRB(15, 20, 20, 0),
                          alignment: Alignment.centerLeft,
                          child: Column(
                            children: [
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Container(
                                    alignment: Alignment.centerLeft,
                                    child: Text(
                                      "Breakfast",
                                      style: TextStyle(
                                          fontSize: 30, color: Colors.white),
                                    ),
                                  ),
                                  Icon(
                                    Icons.free_breakfast,
                                    color: Colors.white,
                                    size: 40,
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 35,
                  ),
                  Flexible(
                    flex: 1,
                    child: InkWell(
                      onTap: () {},
                      child: Container(
                        margin: EdgeInsets.symmetric(horizontal: 20),
                        height: 81,
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                                color: Color(0xFF101E73).withOpacity(0.08),
                                spreadRadius: 5,
                                blurRadius: 6,
                                offset: Offset(1.0, 2.0))
                          ],
                          borderRadius: BorderRadius.circular(10),
                          color: Color(0XFF4C75D4),
                        ),
                        child: Container(
                          margin: EdgeInsets.fromLTRB(15, 20, 20, 0),
                          alignment: Alignment.centerLeft,
                          child: Column(
                            children: [
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Container(
                                    alignment: Alignment.centerLeft,
                                    child: Text(
                                      "Lunch",
                                      style: TextStyle(
                                          fontSize: 30, color: Colors.white),
                                    ),
                                  ),
                                  Icon(
                                    Icons.lunch_dining,
                                    color: Colors.white,
                                    size: 40,
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 35,
                  ),
                  Flexible(
                    flex: 1,
                    child: InkWell(
                      onTap: () {},
                      child: Container(
                        margin: EdgeInsets.symmetric(horizontal: 20),
                        height: 81,
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                                color: Color(0xFF101E73).withOpacity(0.08),
                                spreadRadius: 5,
                                blurRadius: 6,
                                offset: Offset(1.0, 2.0))
                          ],
                          borderRadius: BorderRadius.circular(10),
                          color: Color(0XFF4C75D4),
                        ),
                        child: Container(
                          margin: EdgeInsets.fromLTRB(15, 20, 20, 0),
                          alignment: Alignment.centerLeft,
                          child: Column(
                            children: [
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Container(
                                    alignment: Alignment.centerLeft,
                                    child: Text(
                                      "Dinner",
                                      style: TextStyle(
                                          fontSize: 30, color: Colors.white),
                                    ),
                                  ),
                                  Icon(
                                    Icons.dinner_dining,
                                    color: Colors.white,
                                    size: 40,
                                  ),
                                ],
                              ),
                            ],
                          ),
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
