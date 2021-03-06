import 'package:flutter/material.dart';

class Dinner extends StatefulWidget {
  Dinner({Key? key}) : super(key: key);

  @override
  State<Dinner> createState() => _DinnerState();
}

class _DinnerState extends State<Dinner> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Dinner",
          style: TextStyle(fontSize: 30),
        ),
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
                  SizedBox(
                    height: 20,
                  ),
                  TextFormField(
                    cursorColor: Color(0xFF4C75D4),
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
                      contentPadding: EdgeInsets.only(top: 20),
                      focusColor: Colors.white,
                      hintText: "Search...",
                      prefixIcon: Padding(
                        padding: EdgeInsets.only(top: 5),
                        child: Icon(
                          Icons.search,
                          size: 25,
                          color: Colors.grey,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 40,
                  ),
                  Container(
                    margin: EdgeInsets.symmetric(horizontal: 5),
                    child: Row(
                      children: [
                        Icon(
                          Icons.cancel_outlined,
                          color: Color(0xFF4C75D4),
                          size: 25,
                        ),
                        Flexible(
                          flex: 1,
                          fit: FlexFit.tight,
                          child: Container(
                            margin: EdgeInsets.only(left: 20),
                            height: 70,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                              color: Color(0xFF4C75D4),
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
                                          fontSize: 20, color: Colors.white),
                                    ),
                                  ),
                                  Container(
                                      alignment: Alignment.centerLeft,
                                      child: Text("150g",
                                          style: TextStyle(
                                              fontSize: 17,
                                              color: Colors.white)))
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  )
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
