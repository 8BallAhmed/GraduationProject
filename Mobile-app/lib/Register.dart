import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:crypto/crypto.dart';
import 'constants.dart';

class Register extends StatefulWidget {
  Register({Key? key}) : super(key: key);

  @override
  State<Register> createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  var email;
  var password;

  List post = [];

  addPost() async {
    var url = "http://10.0.2.2:8090/register";

    var res = await http.post(
      Uri.parse(url),
      body: {
        "email": "$email",
        "password": "$password",
        "address": "null",
        "name": "$name",
        "SSN": "null",
        "gender": "true",
        "city": "null",
        "dob": "null",
        "account_type": "patient"
      },
    );

    var resBody = jsonDecode(res.body);

    setState(() {
      post.add(resBody);
    });
    post[0]["status"];
    print(post[0]);

    return resBody;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          color: Color(0XFFF6F8FB),
          width: double.infinity,
          child: Container(
            margin: EdgeInsets.all(25),
            width: double.infinity,
            child: ListView(
              children: [
                SizedBox(
                  height: 40,
                ),
                Image.asset("images/logo.png", height: 80, width: 200),
                SizedBox(
                  height: 50,
                ),
                Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(30),
                  ),
                  child: Column(
                    children: [
                      SizedBox(
                        height: 50.0,
                      ),
                      SizedBox(
                        height: 5.0,
                      ),
                      Container(
                        margin: EdgeInsets.symmetric(horizontal: 40),
                        child: TextField(
                          onChanged: (value) {
                            //Do something with the user input.

                            setState(() {
                              name = value;
                            });
                          },
                          decoration: InputDecoration(
                            prefixIcon: Icon(
                              Icons.person_sharp,
                              color: Colors.grey,
                            ),
                            hintText: 'Name',
                            contentPadding: EdgeInsets.symmetric(
                                vertical: 10.0, horizontal: 20.0),
                            border: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(32.0)),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderSide:
                                  BorderSide(color: Colors.grey, width: 1.0),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(32.0)),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide:
                                  BorderSide(color: Colors.grey, width: 1.0),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(32.0)),
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        height: 5.0,
                      ),
                      Container(
                        margin: EdgeInsets.symmetric(horizontal: 40),
                        child: TextField(
                          onChanged: (value) {
                            //Do something with the user input.
                            setState(() {
                              email = value;
                            });
                          },
                          decoration: InputDecoration(
                            prefixIcon: Icon(
                              Icons.email_outlined,
                              color: Colors.grey,
                            ),
                            hintText: 'Email',
                            contentPadding: EdgeInsets.symmetric(
                                vertical: 10.0, horizontal: 20.0),
                            border: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(32.0)),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderSide:
                                  BorderSide(color: Colors.grey, width: 1.0),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(32.0)),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide:
                                  BorderSide(color: Colors.grey, width: 1.0),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(32.0)),
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        height: 5.0,
                      ),
                      Container(
                        margin: EdgeInsets.symmetric(horizontal: 40),
                        child: TextField(
                          onChanged: (value) {
                            //Do something with the user input.
                            setState(() {
                              password =
                                  md5.convert(utf8.encode(value)).toString();
                            });
                          },
                          obscureText: true,
                          decoration: InputDecoration(
                            prefixIcon: Icon(
                              Icons.lock_sharp,
                              color: Colors.grey,
                            ),
                            hintText: 'Password',
                            contentPadding: EdgeInsets.symmetric(
                                vertical: 10.0, horizontal: 20.0),
                            border: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(32.0)),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderSide:
                                  BorderSide(color: Colors.grey, width: 1.0),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(32.0)),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide:
                                  BorderSide(color: Colors.grey, width: 1.0),
                              borderRadius:
                                  BorderRadius.all(Radius.circular(32.0)),
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        height: 15,
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 16.0),
                        child: Material(
                          color: Color(0xFF336CFB),
                          borderRadius: BorderRadius.all(Radius.circular(30.0)),
                          elevation: 5.0,
                          child: MaterialButton(
                            onPressed: () async {
                              await addPost();

                              print("asd");
                              if (post[0]["status"] == 200) {
                                showDialog(
                                  context: context,
                                  builder: (context) => AlertDialog(
                                    title: Text("${post[0]['message']}"),
                                  ),
                                );
                                Future.delayed(
                                    const Duration(milliseconds: 3000), () {
                                  setState(() {
                                    Navigator.of(context).pushNamed("login");
                                  });
                                });
                              } else {
                                print(email);
                                showDialog(
                                  context: context,
                                  builder: (context) => AlertDialog(
                                    title: Text("${post[0]['message']}"),
                                    content: Text("${post[0]['error']}"),
                                  ),
                                );
                                Future.delayed(
                                    const Duration(milliseconds: 3000), () {
                                  setState(() {
                                    Navigator.of(context).pushNamed("Register");
                                  });
                                });
                                // SimpleDialog(
                                //   title: Text("${post[0]['title']}"),
                                // );
                              }
                              //    getPost();
                            },
                            minWidth: 100.0,
                            height: 40.0,
                            child: Text(
                              'Register',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ),
                      ),
                      InkWell(
                        onTap: () {
                          Navigator.of(context).pushNamed("login");
                        },
                        child: Text(
                          "Login",
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Color(0Xff336CFB),
                              fontSize: 15),
                        ),
                      ),
                      SizedBox(
                        height: 20,
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
