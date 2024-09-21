import 'package:bluecollar/Utils/AppColors.dart';
import 'package:bluecollar/Widgets/BigText.dart';
import 'package:bluecollar/Widgets/Bottom_NavBar.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import '../Widgets/DisplayEmp.dart';
import '../Widgets/RangeSliderWithLabels.dart';

class workerpage2 extends StatefulWidget {
  workerpage2({super.key, required this.category});
  final String category;

  @override
  State<workerpage2> createState() => _workerpage2State();
}

class _workerpage2State extends State<workerpage2> {
  //Filters
  RangeValues _Age = RangeValues(18, 65);
  RangeValues Distance = RangeValues(0, 50);
  RangeValues ExpectedSalary = RangeValues(0, 100000);

  //
  //bool filter
  bool _isAgefilter = false;
  bool _isExpanded = false;
  bool _xyz_ischecked = false;
//
  final CollectionReference Workers =
      FirebaseFirestore.instance.collection('Workers');
// Methods to fetch
  late Stream<QuerySnapshot> workersStream;
//
  @override
  void initState() {
    super.initState();
    fetchWorkers();
  }

  Future<void> fetchWorkers() async {
    setState(() {
      // call setState to update the widget with the new data
      workersStream = Workers.snapshots();
    });
    // QuerySnapshot querySnapshot = await query.get();
    // print('Size of document is :' + querySnapshot.size.toString());
    // for (QueryDocumentSnapshot documentSnapshot in querySnapshot.docs) {
    //   print('${documentSnapshot.id} => ${documentSnapshot.data()}');
    // }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      maintainBottomViewPadding: false,
      child: Scaffold(
          bottomNavigationBar: Bottom_NavBar(indexx: 2),
          appBar: AppBar(
            flexibleSpace: Container(
                decoration: const BoxDecoration(
              // color: AppColors.ThemeBlue2,
              gradient: LinearGradient(
                  colors: [
                    Color(0xFF3366FF),
                    Color(0xFF00CCFF),
                  ],
                  begin: FractionalOffset(0.0, 0.0),
                  end: FractionalOffset(1.0, 0.0),
                  stops: [0.0, 1.0],
                  tileMode: TileMode.clamp),
            )),
            //Right corner filter button
            actions: <Widget>[
              SizedBox(
                child: Container(
                  margin: const EdgeInsets.all(11),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    color: AppColors.white,
                  ),
                  child: IconButton(
                    iconSize: 25,
                    // ignore: prefer_const_constructors
                    onPressed: () {
                      setState(() {
                        _isExpanded = !_isExpanded;
                        print(_isExpanded);
                      });
                    },
                    icon: Icon(Icons.filter_list_outlined),
                    color: Colors.black,
                  ),
                ),
              ),
            ],
            /////////////
            toolbarHeight: 80,
            backgroundColor: Colors.white,
            elevation: 2,
            centerTitle: true,
            title: BigText(
              text: widget.category,
              ff: '',
              size: 40,
              fw: FontWeight.bold,
              colorr: AppColors.font1,
            ),
            leading: SizedBox(
              child: IconButton(
                iconSize: 25,
                // ignore: prefer_const_constructors
                onPressed: () {
                  print("Pressed");
                  Navigator.pushNamed(
                    context,
                    "/",
                  );
                },
                icon: Icon(Icons.arrow_back_ios_new_rounded),
                color: Colors.white,
              ),
            ),
          ),
          ///////////////////////////Body
          body: Stack(
            children: [
              Column(
                children: [
                  Expanded(
                    child: SingleChildScrollView(
                      scrollDirection: Axis.vertical,
                      child: Container(
                        color: Colors.transparent,
                        height: MediaQuery.of(context).size.height - 220,
                        child: StreamBuilder(
                          // stream: Workers.snapshots(),
                          stream: workersStream,
                          builder: (context,
                              AsyncSnapshot<QuerySnapshot> streamSnapshot) {
                            print(streamSnapshot.toString());
                            print(streamSnapshot.hasData.toString() +
                                " BOOLEANS");
                            if (streamSnapshot.hasData) {
                              print("Has Data");
                              return Container(
                                  child: DisplayEMP(
                                      streamSnapshot: streamSnapshot));
                            } else {
                              print("Has not Data");

                              return Container(
                                color: Colors.amber,
                                width: 100,
                                height: 400,
                              );
                            }
                          },
                        ),
                      ),
                    ),
                  ),
                  // Bottom_NavBar(indexx: 2),
                  // const Positioned(
                  //   left: 0,
                  //   right: 0,
                  //   bottom: 0,
                  //   child: Bottom_NavBar(
                  //     indexx: 2,
                  //   ),
                  // ),
                ],
              ),
              ///////////////////////////////////FILTERSSSSSSSSSSSSSSSS///////////////////
              AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                height:
                    _isExpanded ? MediaQuery.of(context).size.height * 0.70 : 0,
                decoration: const BoxDecoration(
                  borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(25),
                      bottomRight: Radius.circular(25)),
                  color: AppColors.white,
                ),
                child: SingleChildScrollView(
                  scrollDirection: Axis.vertical,
                  child: Column(
                    children: [
                      Column(
                        children: [
                          // First Slider
                          Row(
                            children: [
                              Container(
                                margin: EdgeInsets.only(bottom: 25),
                                alignment: Alignment.centerLeft,
                                child: Container(
                                  alignment: Alignment.center,
                                  margin: EdgeInsets.only(top: 10, left: 10),
                                  width: 85,
                                  height: _isExpanded ? 35 : 0,
                                  decoration: const BoxDecoration(
                                    color: Colors.black,
                                    borderRadius: BorderRadius.only(
                                        topRight: Radius.circular(10),
                                        bottomRight: Radius.circular(10)),
                                  ),
                                  child: BigText(
                                    text: "Age:",
                                    size: 18,
                                    colorr: AppColors.font1,
                                    ff: '',
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Container(
                                    height: _isExpanded ? 70 : 0,
                                    margin: const EdgeInsets.only(
                                        left: 10, right: 10),
                                    width: MediaQuery.of(context).size.width,
                                    // ignore: prefer_const_constructors
                                    decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: const BorderRadius.only(
                                            topRight: Radius.circular(10),
                                            bottomRight: Radius.circular(10),
                                            topLeft: Radius.circular(10),
                                            bottomLeft: Radius.circular(10))),
                                    child: _isExpanded
                                        ? Container(
                                            child: RangeSliderWithLabels(
                                              unit: "Yrs",
                                              start: _Age.start,
                                              end: _Age.end,
                                              min: 18,
                                              max: 65,
                                              onChanged: (value) {
                                                setState(() {
                                                  _Age = value;
                                                  _isAgefilter = true;
                                                  // workersStream = Workers.where(
                                                  //         'Age',
                                                  //         isLessThan: 26,
                                                  //         isGreaterThan: 24)
                                                  //     .snapshots();
                                                });
                                                print(_Age.start.toInt());
                                                print(_Age.end.toInt());
                                              },
                                            ),
                                          )
                                        : Container()),
                              ),
                            ],
                          ),
                          // ////////////////////////Second Slider/////////////////////////////
                          Row(
                            children: [
                              Container(
                                margin: EdgeInsets.only(bottom: 25),
                                alignment: Alignment.centerLeft,
                                child: Container(
                                  alignment: Alignment.center,
                                  margin: EdgeInsets.only(top: 10, left: 10),
                                  width: 85,
                                  height: _isExpanded ? 35 : 0,
                                  decoration: const BoxDecoration(
                                    color: Colors.black,
                                    borderRadius: BorderRadius.only(
                                        topRight: Radius.circular(10),
                                        bottomRight: Radius.circular(10)),
                                  ),
                                  child: BigText(
                                    text: "Distance:",
                                    size: 18,
                                    colorr: AppColors.font1,
                                    ff: '',
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Container(
                                    height: _isExpanded ? 70 : 0,
                                    margin: const EdgeInsets.only(
                                        left: 10, right: 10),
                                    width: MediaQuery.of(context).size.width,
                                    // ignore: prefer_const_constructors
                                    decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: const BorderRadius.only(
                                            topRight: Radius.circular(10),
                                            bottomRight: Radius.circular(10),
                                            topLeft: Radius.circular(10),
                                            bottomLeft: Radius.circular(10))),
                                    child: _isExpanded
                                        ? Container(
                                            child: RangeSliderWithLabels(
                                              unit: "KM",
                                              start: 0,
                                              end: 25,
                                              min: 0,
                                              max: 65,
                                              onChanged: (value) {
                                                setState(() {
                                                  _Age = value;
                                                });
                                                print(_Age.start.toInt());
                                                print(_Age.end.toInt());
                                              },
                                            ),
                                          )
                                        : Container()),
                              ),
                            ],
                          ),

//Third Slider
                          Row(
                            children: [
                              Container(
                                margin: EdgeInsets.only(bottom: 25),
                                alignment: Alignment.centerLeft,
                                child: Container(
                                  alignment: Alignment.center,
                                  margin: EdgeInsets.only(top: 10, left: 10),
                                  width: 85,
                                  height: _isExpanded ? 35 : 0,
                                  decoration: const BoxDecoration(
                                    color: Colors.black,
                                    borderRadius: BorderRadius.only(
                                        topRight: Radius.circular(10),
                                        bottomRight: Radius.circular(10)),
                                  ),
                                  child: BigText(
                                    text: "Distance:",
                                    size: 18,
                                    colorr: AppColors.font1,
                                    ff: '',
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Container(
                                    height: _isExpanded ? 70 : 0,
                                    margin: const EdgeInsets.only(
                                        left: 10, right: 10),
                                    width: MediaQuery.of(context).size.width,
                                    // ignore: prefer_const_constructors
                                    decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: const BorderRadius.only(
                                            topRight: Radius.circular(10),
                                            bottomRight: Radius.circular(10),
                                            topLeft: Radius.circular(10),
                                            bottomLeft: Radius.circular(10))),
                                    child: _isExpanded
                                        ? Container(
                                            child: RangeSliderWithLabels(
                                              unit: "KM",
                                              start: 18,
                                              end: 25,
                                              min: 18,
                                              max: 65,
                                              onChanged: (value) {
                                                setState(() {
                                                  _Age = value;
                                                });
                                                print(_Age.start.toInt());
                                                print(_Age.end.toInt());
                                              },
                                            ),
                                          )
                                        : Container()),
                              ),
                            ],
                          ),
//Fourth Slider
                          Row(
                            children: [
                              Container(
                                margin: EdgeInsets.only(bottom: 25),
                                alignment: Alignment.centerLeft,
                                child: Container(
                                  alignment: Alignment.center,
                                  margin: EdgeInsets.only(top: 10, left: 10),
                                  width: 85,
                                  height: _isExpanded ? 35 : 0,
                                  decoration: const BoxDecoration(
                                    color: Colors.black,
                                    borderRadius: BorderRadius.only(
                                        topRight: Radius.circular(10),
                                        bottomRight: Radius.circular(10)),
                                  ),
                                  child: BigText(
                                    text: "Salary:",
                                    size: 18,
                                    colorr: AppColors.font1,
                                    ff: '',
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Container(
                                    height: _isExpanded ? 70 : 0,
                                    margin: const EdgeInsets.only(
                                        left: 10, right: 10),
                                    width: MediaQuery.of(context).size.width,
                                    // ignore: prefer_const_constructors
                                    decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: const BorderRadius.only(
                                            topRight: Radius.circular(10),
                                            bottomRight: Radius.circular(10),
                                            topLeft: Radius.circular(10),
                                            bottomLeft: Radius.circular(10))),
                                    child: _isExpanded
                                        ? Container(
                                            child: RangeSliderWithLabels(
                                              unit: "Rs/ per month)",
                                              start: 1000,
                                              end: 5000,
                                              min: 1000,
                                              max: 50000,
                                              onChanged: (value) {
                                                setState(() {
                                                  _Age = value;
                                                });
                                                print(_Age.start.toInt());
                                                print(_Age.end.toInt());
                                              },
                                            ),
                                          )
                                        : Container()),
                              ),
                            ],
                          ),
                        ],
                      ),

                      ///checkboxesss
                      SingleChildScrollView(
                        scrollDirection: Axis.vertical,
                        child: Container(
                          margin: EdgeInsets.only(left: 10, right: 10, top: 20),
                          decoration: BoxDecoration(
                              color: Colors.amber,
                              borderRadius: BorderRadius.circular(25)),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                margin: EdgeInsets.only(left: 25),
                                child: BigText(
                                  text: "Customize:",
                                  ff: '',
                                  size: 18,
                                ),
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  BigText(
                                    text: "Male:",
                                    ff: '',
                                    size: 18,
                                  ),
                                  Checkbox(
                                    checkColor: Colors.white,
                                    fillColor: MaterialStateProperty.all(
                                        AppColors.ThemeBlue2),
                                    value: _xyz_ischecked,
                                    onChanged: (bool? value) {
                                      setState(() {
                                        _xyz_ischecked = value!;
                                      });
                                    },
                                  ),
                                  BigText(
                                    text: "Female:",
                                    ff: '',
                                    size: 18,
                                  ),
                                  Checkbox(
                                    checkColor: Colors.white,
                                    fillColor: MaterialStateProperty.all(
                                        AppColors.ThemeBlue2),
                                    value: _xyz_ischecked,
                                    onChanged: (bool? value) {
                                      setState(() {
                                        _xyz_ischecked = value!;
                                      });
                                    },
                                  ),
                                ],
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  BigText(
                                    text: "PartTime:",
                                    ff: '',
                                    size: 18,
                                  ),
                                  Checkbox(
                                    checkColor: Colors.white,
                                    fillColor: MaterialStateProperty.all(
                                        AppColors.ThemeBlue2),
                                    value: _xyz_ischecked,
                                    onChanged: (bool? value) {
                                      setState(() {
                                        _xyz_ischecked = value!;
                                      });
                                    },
                                  ),
                                  BigText(
                                    text: "FullTime:",
                                    ff: '',
                                    size: 18,
                                  ),
                                  Checkbox(
                                    checkColor: Colors.white,
                                    fillColor: MaterialStateProperty.all(
                                        AppColors.ThemeBlue2),
                                    value: _xyz_ischecked,
                                    onChanged: (bool? value) {
                                      setState(() {
                                        _xyz_ischecked = value!;
                                      });
                                    },
                                  ),
                                ],
                              )
                            ],
                          ),
                        ),
                      ),

                      ElevatedButton(
                        onPressed: () {
                          print("Tapped on Apply");
                          setState(() {
                            _isExpanded = false;
                            // print(_Age.start.toInt());
                            // print(_Age.end.toInt());
                            workersStream = Workers.where('Age',
                                    isLessThan: _Age.end.toInt(),
                                    isGreaterThan: _Age.start.toInt())
                                .snapshots();
                          });
                        },
                        style: ElevatedButton.styleFrom(
                            elevation: 20.0,
                            backgroundColor: AppColors.white,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(30),
                            )),
                        child: BigText(
                          text: "Apply",
                          ff: '',
                        ),
                      )
                    ],
                  ),
                ),
              ),
            ],
          )),
    );
  }
}
