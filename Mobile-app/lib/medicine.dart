import 'package:flutter/material.dart';
import 'constants.dart';

class medicine extends StatefulWidget {
  medicine({Key? key}) : super(key: key);

  @override
  State<medicine> createState() => _medicineState();
}

class _medicineState extends State<medicine> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Medicine",
          style: TextStyle(fontSize: 25),
        ),
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
////
                ListView.builder(
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    itemCount: treatment.length,
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
                                  height: 100,
                                  decoration: BoxDecoration(
                                    boxShadow: [
                                      BoxShadow(
                                          color: Color(0xFF101E73)
                                              .withOpacity(0.08),
                                          spreadRadius: 5,
                                          blurRadius: 6,
                                          offset: Offset(1.0, 2.0))
                                    ],
                                    borderRadius: BorderRadius.circular(10),
                                    color: Colors.white,
                                  ),
                                  child: Container(
                                    margin: EdgeInsets.only(left: 15),
                                    width: double.infinity,
                                    child: Column(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Row(
                                          //  mainAxisAlignment: MainAxisAlignment.spaceAround,
                                          children: [
                                            Image.asset("images/Blister.png",
                                                height: 35, width: 35),
                                            SizedBox(
                                              width: 5,
                                            ),
                                            Text(
                                                "${treatment[index]["medicine_name"]}",
                                                style: TextStyle(
                                                    fontSize: 25,
                                                    color: Colors.black)),
                                            SizedBox(
                                              width: 5,
                                            ),
                                            Container(
                                              margin: EdgeInsets.only(top: 6),
                                              child: Text(
                                                  "${treatment[index]["dosage"]}",
                                                  style: TextStyle(
                                                      fontSize: 14,
                                                      color: Colors.black)),
                                            ),
                                          ],
                                        ),
                                        Container(
                                          margin:
                                              EdgeInsets.only(top: 6, left: 40),
                                          alignment: Alignment.centerLeft,
                                          child: Text(
                                              "${treatment[index]["unit"]}",
                                              style: TextStyle(
                                                  fontSize: 17,
                                                  color: Colors.black)),
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
            ),
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 2,
        onTap: (value) {
          if (value == 1) {
            Navigator.of(context).pushReplacementNamed("Home");
          }
          if (value == 2) {
            Navigator.of(context).pushNamed("medicine");
          }
        },
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
