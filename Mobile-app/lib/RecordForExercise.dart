import 'package:flutter/material.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'constants.dart';

class RecordForExercise extends StatefulWidget {
  RecordForExercise({Key? key}) : super(key: key);

  @override
  State<RecordForExercise> createState() => _RecordForExerciseState();
}

class _RecordForExerciseState extends State<RecordForExercise> {
  DateTime dateTime = DateTime.now();
  String? selectedValue;
  String? now = "Now";
  double nowint = 140;

  var cal;
  var duration;
  var type;

  List<String> items = [
    'Walk',
    'Run',
    'Other',
  ];


  addPost() async {
  
    var url = "http://10.0.2.2:8000/activity";
   

    var res = await http.post(Uri.parse(url), body: {
      "calories": "$cal",
      "duration": "00:$duration:00",
      "type": "$type",
      "time": "${dateTime.year}-${dateTime.month}-${dateTime.day}"
    }, headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer $token'
    });

    var resBody = jsonDecode(res.body);
    setState(() {
      activity_con.add(resBody);
    });
  }

  Exercise() async {
    var url = "http://10.0.2.2:8000/activity";

    var res = await http.get(Uri.parse(url), headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer $token'
    });

    var resBody = jsonDecode(res.body);

    if (resBody["status"] == 200) {
      setState(() {
        activity.clear();
        activity.addAll(resBody["activites"]);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Create Record",
          style: TextStyle(fontSize: 25),
        ),
        centerTitle: true,
        backgroundColor: Color(0xFF4C75D4),
      ),
      body: SafeArea(
        child: ListView(
          children: [
            Container(
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
                    Container(
                      child: Column(
                        children: [
                          InkWell(
                            onTap: () async {
                              DateTime? newDate = await showDatePicker(
                                context: context,
                                initialDate: dateTime,
                                firstDate: DateTime(2021),
                                lastDate: DateTime(2222),
                              );
                              if (newDate != null) {
                                setState(() {
                                  dateTime = newDate;
                                  now = "";
                                  nowint = 100;
                                });
                              }
                            },
                            child: Container(
                              margin: EdgeInsets.symmetric(horizontal: 2),
                              padding: EdgeInsets.fromLTRB(10, 13, 10, 13),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Row(
                                children: [
                                  Image.asset("images/Date.png",
                                      height: 40, width: 40),
                                  Text(
                                    "Date & time",
                                    style: TextStyle(fontSize: 20),
                                  ),
                                  SizedBox(
                                    width: nowint,
                                  ),
                                  Text(
                                    now == "Now"
                                        ? "Now"
                                        : "${dateTime.day}-${dateTime.month}-${dateTime.year}",
                                    style: TextStyle(
                                        fontSize: 20, color: Colors.grey),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    Container(
                      margin: EdgeInsets.symmetric(horizontal: 0),
                      padding: EdgeInsets.fromLTRB(0, 10, 10, 10),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton2(
                          isExpanded: true,
                          hint: Row(
                            children: [
                              Image.asset("images/Bottle.png",
                                  height: 35, width: 35),
                              SizedBox(
                                width: 4,
                              ),
                              Expanded(
                                child: Text(
                                  'Type of Exercise',
                                  style: TextStyle(
                                    fontSize: 20,
                                    color: Colors.black,
                                  ),
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ],
                          ),
                          items: items
                              .map((item) => DropdownMenuItem<String>(
                                    value: item,
                                    onTap: () {
                                      setState(() {
                                        type = item;
                                      });
                                    },
                                    child: Row(
                                      children: [
                                        Image.asset("images/Bottle.png",
                                            height: 35, width: 35),
                                        Text(
                                          item,
                                          style: const TextStyle(
                                            fontSize: 20,
                                            color: Colors.black,
                                          ),
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ],
                                    ),
                                  ))
                              .toList(),
                          value: selectedValue,
                          onChanged: (value) {
                            setState(() {
                              selectedValue = value as String;
                            });
                          },
                          buttonHeight: 50,
                          buttonWidth: 450,
                          buttonPadding:
                              const EdgeInsets.only(left: 14, right: 14),
                          buttonElevation: 2,
                          itemHeight: 40,
                          itemPadding:
                              const EdgeInsets.only(left: 14, right: 14),
                          dropdownMaxHeight: 200,
                          dropdownWidth: 300,
                          dropdownPadding: null,
                          dropdownDecoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(20),
                            color: Colors.white,
                          ),
                          dropdownElevation: 8,
                          scrollbarRadius: const Radius.circular(20),
                          scrollbarAlwaysShow: true,
                          offset: const Offset(20, -3),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    TextFormField(
                      onChanged: ((value) {
                        setState(() {
                          duration = value;
                        });
                      }),
                      cursorColor: Color(0xFF4C75D4),
                      keyboardType: TextInputType.number,
                      style: TextStyle(fontSize: 20),
                      decoration: InputDecoration(
                        fillColor: Colors.white,
                        filled: true,
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: BorderSide(color: Color(0XFFF6F8FB)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: BorderSide(color: Color(0XFFF6F8FB)),
                        ),
                        contentPadding: EdgeInsets.only(top: 45),
                        focusColor: Colors.white,
                        hintText: "Minutes",
                        labelText: "Time",
                        labelStyle: TextStyle(color: Colors.black),
                        prefixIcon: Padding(
                          padding: EdgeInsets.fromLTRB(10, 5, 0, 0),
                          child: Image.asset("images/Time.png",
                              height: 40, width: 40),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    TextFormField(
                      onChanged: (value) {
                        setState(() {
                          cal = value;
                        });
                      },
                      cursorColor: Color(0xFF4C75D4),
                      keyboardType: TextInputType.number,
                      style: TextStyle(fontSize: 20),
                      decoration: InputDecoration(
                        fillColor: Colors.white,
                        filled: true,
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: BorderSide(color: Color(0XFFF6F8FB)),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(20),
                          borderSide: BorderSide(color: Color(0XFFF6F8FB)),
                        ),
                        contentPadding: EdgeInsets.only(top: 45),
                        focusColor: Colors.white,
                        hintText: "Calories Burnt",
                        labelText: "Calories Burnt",
                        labelStyle: TextStyle(color: Colors.black),
                        prefixIcon: Padding(
                          padding: EdgeInsets.fromLTRB(10, 5, 0, 0),
                          child: Image.asset("images/Apple.png",
                              height: 40, width: 40),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                 
                    SizedBox(
                      height: 70,
                    ),
                    InkWell(
                      onTap: () async {
                       
                        await addPost();
                        print(activity_con[0]["status"]);
                        if (activity_con[0]["status"] == 200) {
                          await Exercise();
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: Text("${activity_con[0]['message']}"),
                            ),
                          );
                          Future.delayed(const Duration(milliseconds: 3000),
                              () {
                            setState(() {
                              activity_con.clear();
                              Navigator.of(context).pushNamed("ExerciseData");
                            });
                          });
                        } else {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: Text("${activity_con[0]['message']}"),
                            ),
                          );
                          Future.delayed(const Duration(milliseconds: 3000),
                              () {
                            setState(() {
                              activity_con.clear();
                              Navigator.of(context)
                                  .pushNamed("RecordForExercise");
                            });
                          });
                        }
                      },
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
                          margin: EdgeInsets.fromLTRB(15, 5, 20, 0),
                          alignment: Alignment.centerLeft,
                          child: Column(
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Container(
                                    alignment: Alignment.center,
                                    child: Text(
                                      "+",
                                      style: TextStyle(
                                          fontSize: 60, color: Colors.white),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
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
