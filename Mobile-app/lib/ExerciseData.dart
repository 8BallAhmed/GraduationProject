import 'package:flutter/material.dart';
import 'constants.dart';

class ExerciseData extends StatefulWidget {
  ExerciseData({Key? key}) : super(key: key);

  @override
  State<ExerciseData> createState() => _ExerciseDataState();
}

class _ExerciseDataState extends State<ExerciseData> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Exercise",
          style: TextStyle(fontSize: 25),
        ),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.of(context).pushNamed("RecordForExercise");
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

                ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: activity.length,
                    itemBuilder: ((context, index) {
                      return Column(
                        children: [
                          Row(
                            children: [
                              Flexible(
                                flex: 1,
                                fit: FlexFit.loose,
                                child: Container(
                                  width: 380,
                                  height: 150,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    color: Colors.white,
                                  ),
                                  child: Container(
                                    width: double.infinity,
                                    child: Column(
                                      children: [
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: [
                                            SizedBox(
                                              height: 20,
                                            ),
                                          ],
                                        ),
                                        Text(
                                            "${activity[index]["time"]}"
                                                .substring(0, 10),
                                            style: TextStyle(
                                                fontSize: 20,
                                                color: Colors.black)),
                                        SizedBox(
                                          height: 25,
                                        ),
                                        Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceEvenly,
                                          children: [
                                            Column(
                                              children: [
                                                Text("Training",
                                                    style: TextStyle(
                                                        fontSize: 17,
                                                        color: Colors.black)),
                                                SizedBox(
                                                  height: 10,
                                                ),
                                                Text(
                                                    "${activity[index]["duration"]}"
                                                            .substring(3, 5) +
                                                        "min",
                                                    style: TextStyle(
                                                        fontSize: 17,
                                                        color: Colors.black)),
                                              ],
                                            ),
                                            Column(
                                              children: [
                                                Text("Type of Exercise",
                                                    style: TextStyle(
                                                        fontSize: 17,
                                                        color: Colors.black)),
                                                SizedBox(
                                                  height: 10,
                                                ),
                                                Text(
                                                    "${activity[index]["type"]}",
                                                    style: TextStyle(
                                                        fontSize: 17,
                                                        color: Colors.black))
                                              ],
                                            ),
                                            Column(
                                              children: [
                                                Text("Calories Burnt",
                                                    style: TextStyle(
                                                        fontSize: 17,
                                                        color: Colors.black)),
                                                SizedBox(
                                                  height: 10,
                                                ),
                                                Text(
                                                    "${activity[index]["calories"]}",
                                                    style: TextStyle(
                                                        fontSize: 17,
                                                        color: Colors.black))
                                              ],
                                            ),
                                          ],
                                        ),
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
                            height: 15,
                          ),
                        ],
                      );
                    })),

                // Row(
                //   children: [
                //     Flexible(
                //       flex: 1,
                //       fit: FlexFit.loose,
                //       child: Container(
                //         width: 380,
                //         height: 150,
                //         decoration: BoxDecoration(
                //           boxShadow: [
                //             BoxShadow(
                //                 color: Color(0xFF101E73).withOpacity(0.08),
                //                 spreadRadius: 5,
                //                 blurRadius: 6,
                //                 offset: Offset(1.0, 2.0))
                //           ],
                //           borderRadius: BorderRadius.circular(10),
                //           color: Colors.white,
                //         ),
                //           child: Container(
                //           width: double.infinity,
                //           child: Column(
                //             children: [
                //               Row(
                //                 mainAxisAlignment: MainAxisAlignment.center,
                //                 children: [
                //                   SizedBox(
                //                     height: 20,
                //                   ),
                //                 ],
                //               ),
                //               Text("Mon, Dec 31",
                //                   style: TextStyle(
                //                       fontSize: 20, color: Colors.black)),
                //               SizedBox(
                //                 height: 25,
                //               ),
                //               Row(
                //                 mainAxisAlignment:
                //                     MainAxisAlignment.spaceEvenly,
                //                 children: [
                //                   Column(
                //                     children: [
                //                       Text("Training",
                //                           style: TextStyle(
                //                               fontSize: 17,
                //                               color: Colors.black)),
                //                       SizedBox(
                //                         height: 10,
                //                       ),
                //                       Text("1.5 hours.",
                //                           style: TextStyle(
                //                               fontSize: 17,
                //                               color: Colors.black)),
                //                     ],
                //                   ),
                //                   Column(
                //                     children: [
                //                       Text("Type of Exercise",
                //                           style: TextStyle(
                //                               fontSize: 17,
                //                               color: Colors.black)),
                //                       SizedBox(
                //                         height: 10,
                //                       ),
                //                       Text("Run",
                //                           style: TextStyle(
                //                               fontSize: 17,
                //                               color: Colors.black))
                //                     ],
                //                   ),
                //                   Column(
                //                     children: [
                //                       Text("Calories Burnt",
                //                           style: TextStyle(
                //                               fontSize: 17,
                //                               color: Colors.black)),
                //                       SizedBox(
                //                         height: 10,
                //                       ),
                //                       Text("850",
                //                           style: TextStyle(
                //                               fontSize: 17,
                //                               color: Colors.black))
                //                     ],
                //                   ),
                //                 ],
                //               ),
                //               SizedBox(
                //                 height: 20,
                //               ),
                //             ],
                //           ),
                //         ),
                //       ),
                //     ),
                //   ],
                // ),
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
