import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';

class FoodIntake extends StatefulWidget {
  FoodIntake({Key? key}) : super(key: key);

  @override
  State<FoodIntake> createState() => _FoodIntakeState();
}

class _FoodIntakeState extends State<FoodIntake> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Food Intake"),
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
            child: ListView(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      margin: EdgeInsets.symmetric(vertical: 15),
                      child: Text(
                        "Today’s Intake",
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
                        CircularPercentIndicator(
                          radius: 45.0,
                          lineWidth: 10.0,
                          percent: 0.74,
                          center: new Text(
                            "74%",
                            style: TextStyle(
                              fontSize: 20,
                            ),
                          ),
                          progressColor: Color(0xFF4C75D4),
                        ),
                        SizedBox(
                          height: 7,
                        ),
                        Text(
                          "Carbs",
                          style: TextStyle(
                              fontSize: 25, fontWeight: FontWeight.w500),
                        ),
                        Text(
                          "74g / 100g",
                          style: TextStyle(
                              fontSize: 15, fontWeight: FontWeight.w400),
                        )
                      ],
                    ),
                    Column(
                      children: [
                        CircularPercentIndicator(
                          radius: 45.0,
                          lineWidth: 10.0,
                          percent: 0.46,
                          center: new Text(
                            "46%",
                            style: TextStyle(
                              fontSize: 20,
                            ),
                          ),
                          progressColor: Color(0xFF4C75D4),
                        ),
                        SizedBox(
                          height: 7,
                        ),
                        Text(
                          "Protein",
                          style: TextStyle(
                              fontSize: 25, fontWeight: FontWeight.w500),
                        ),
                        Text(
                          "23g / 50g",
                          style: TextStyle(
                              fontSize: 15, fontWeight: FontWeight.w400),
                        )
                      ],
                    ),
                    Column(
                      children: [
                        CircularPercentIndicator(
                          radius: 45.0,
                          lineWidth: 10.0,
                          percent: 0.64,
                          center: new Text(
                            "64%",
                            style: TextStyle(
                              fontSize: 20,
                            ),
                          ),
                          progressColor: Color(0xFF4C75D4),
                        ),
                        SizedBox(
                          height: 7,
                        ),
                        Text(
                          "Fat",
                          style: TextStyle(
                              fontSize: 25, fontWeight: FontWeight.w500),
                        ),
                        Text(
                          "16g / 25g",
                          style: TextStyle(
                              fontSize: 15, fontWeight: FontWeight.w400),
                        )
                      ],
                    ),
                  ],
                ),
                SizedBox(
                  height: 15,
                ),
                Row(
                  children: [
                    Text(
                      "Breakfast",
                      style: TextStyle(fontSize: 20),
                    ),
                    IconButton(
                      onPressed: () {
                        Navigator.of(context).pushNamed("Breakfast");
                      },
                      icon: Padding(
                        padding: const EdgeInsets.fromLTRB(0, 4.5, 40, 0),
                        child: Icon(
                          Icons.arrow_forward_ios_outlined,
                          size: 15,
                          color: Color(0xFF4C75D4),
                        ),
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Flexible(
                      flex: 1,
                      fit: FlexFit.tight,
                      child: Container(
                        margin: EdgeInsets.symmetric(horizontal: 20),
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
                              Container(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  "Fried eggs",
                                  style: TextStyle(
                                    fontSize: 17,
                                  ),
                                ),
                              ),
                              Container(
                                  alignment: Alignment.centerLeft,
                                  child: Text("2 Eggs",
                                      style: TextStyle(fontSize: 15)))
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Text(
                      "Lunch",
                      style: TextStyle(fontSize: 20),
                    ),
                    IconButton(
                      onPressed: () {
                        Navigator.of(context).pushNamed("Lunch");
                      },
                      icon: Padding(
                        padding: const EdgeInsets.fromLTRB(0, 4.5, 40, 0),
                        child: Icon(
                          Icons.arrow_forward_ios_outlined,
                          size: 15,
                          color: Color(0xFF4C75D4),
                        ),
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Flexible(
                      flex: 1,
                      fit: FlexFit.tight,
                      child: Container(
                        margin: EdgeInsets.symmetric(horizontal: 20),
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
                              Container(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  "Cooked Salmon",
                                  style: TextStyle(
                                    fontSize: 17,
                                  ),
                                ),
                              ),
                              Container(
                                  alignment: Alignment.centerLeft,
                                  child: Text("125g",
                                      style: TextStyle(fontSize: 15)))
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Text(
                      "Dinner",
                      style: TextStyle(fontSize: 20),
                    ),
                    IconButton(
                      onPressed: () {
                        Navigator.of(context).pushNamed("Dinner");
                      },
                      icon: Padding(
                        padding: const EdgeInsets.fromLTRB(0, 4.5, 40, 0),
                        child: Icon(
                          Icons.arrow_forward_ios_outlined,
                          size: 15,
                          color: Color(0xFF4C75D4),
                        ),
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Flexible(
                      flex: 1,
                      fit: FlexFit.tight,
                      child: Container(
                        margin: EdgeInsets.symmetric(horizontal: 20),
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
                              Container(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  "Cooked Rice",
                                  style: TextStyle(
                                    fontSize: 17,
                                  ),
                                ),
                              ),
                              Container(
                                  alignment: Alignment.centerLeft,
                                  child: Text("150g",
                                      style: TextStyle(fontSize: 15)))
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
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
