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
          margin: EdgeInsets.all(15),
          color: Color(0XFFF6F8FB),
          width: double.infinity,
          child: Column(
            children: [
              Container(
                width: double.infinity,
                child: Column(
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
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
