-- Insert into account table 
insert into account values('aziz@gmail.com','abdulaziz!@#','jaber ibn sinan st.','abdulaziz alghamdi','1234567891',true,'jeddah','1999-09-17',0);
insert into account values('ahmed@gmail.com','ahmed!@#','rehanat al jazeerah','ahmed alosaimi','2234567891',true,'jeddah','1999-09-2',0);
insert into account values('mubarak@gmail.com','mubarak!@#','60 road','mubarak aloufi','3234567891',true,'jeddah','1999-09-4',0);
insert into account values('Marwan@gmail.com','Marwan!@#','70 road','Marwan Al harbi','4234567891',true,'jeddah','1980-09-4',1);

-- Insert into patient table
insert into patient values(1,19.89,'pills','type 1','High Blood Pressure,High Colestrol Rate',5.6,null,'aziz@gmail.com');
insert into patient values(2,25.44,'pills','type 2','High Blood Pressure,High Colestrol Rate',5.6,null,'ahmed@gmail.com');
insert into patient values(3,30.15,'pills','type 1','High Blood Pressure,High Colestrol Rate',5.6,null,'mubarak@gmail.com');

-- Insert into doctor table
insert into doctor values(1,'Marwan@gmail.com');

 
-- insert into glucose_test
insert into glucose_test values(1,'120/80','glucophage 500mg',130,null,'cornflakes','after breakfast','2022-02-14 09:10',false,1);
insert into glucose_test values(2,'120/80','centrum 1 pills',130,null,'10 pcs Moshhab','after dinner','2022-02-14',false,1);
insert into glucose_test values(3,'120/80','centrum 1 pills',130,null,null,'after breakfast','2022-02-14',false,1);
insert into glucose_test values(4,'120/80','glucophage 500mg',130,null,'cornflakes','after breakfast','2022-02-14 09:10',false,1);
insert into glucose_test values(5,'120/80','centrum 1 pills',130,null,'10 pcs Moshhab','after dinner','2022-02-14',false,1);
insert into glucose_test values(6,'120/80','centrum 1 pills',130,null,null,'after breakfast','2022-02-14',false,1);
insert into glucose_test values(7,'120/80','glucophage 500mg',130,null,'cornflakes','after breakfast','2022-02-14 09:10',false,1);
insert into glucose_test values(8,'120/80','centrum 1 pills',130,null,'10 pcs Moshhab','after dinner','2022-02-14',false,1);
insert into glucose_test values(9,'120/80','centrum 1 pills',130,null,null,'after breakfast','2022-02-14',false,1);
insert into glucose_test values(10,'120/80','glucophage 500mg',130,null,'cornflakes','after breakfast','2022-02-14 09:10',false,1);
insert into glucose_test values(11,'120/80','glucophage 500mg',130,null,'cornflakes','after breakfast','2022-02-14 09:10',false,1);

-- insert into glucose_test
insert into glucose_test values(11,'120/80','glucophage 500mg',130,null,'cornflakes','after breakfast','2022-02-14 09:10',false,2);
insert into glucose_test values(12,'120/80','centrum 1 pills',130,null,'10 pcs Moshhab','after dinner','2022-02-14',false,2);
insert into glucose_test values(13,'120/80','centrum 1 pills',130,null,null,'after breakfast','2022-02-14',false,2);

-- insert into glucose_test
insert into glucose_test values(14,'120/80','glucophage 500mg',130,null,'cornflakes','after breakfast','2022-02-14 09:10',false,3);
insert into glucose_test values(15,'120/80','centrum 1 pills',130,null,'10 pcs Moshhab','after dinner','2022-02-14',false,3);
insert into glucose_test values(16,'120/80','centrum 1 pills',130,null,null,'after breakfast','2022-02-14',false,3);

-- insert into activity
insert into activity values(1,256,'00:30','walking','2022-02-14 09:10',1);
insert into activity values(2,432,'00:50','swimming','2022-02-15 09:10',1);
insert into activity values(3,500,'01:30','weight lifting','2022-02-16 09:10',1);
-- insert into activity
insert into activity values(4,256,'00:30','walking','2022-02-14 09:10',2);
insert into activity values(5,432,'00:50','swimming','2022-02-15 09:10',2);
insert into activity values(6,500,'01:30','weight lifting','2022-02-16 09:10',2);
-- insert into activity
insert into activity values(7,256,'00:30','walking','2022-02-14 09:10',3);
insert into activity values(8,432,'00:50','swimming','2022-02-15 09:10',3);
insert into activity values(9,500,'01:30','weight lifting','2022-02-16 09:10',3);

-- Insert into supervision table
insert into supervision values(1,'need to exercise more',1,1);
insert into supervision values(2,'need to eat healthy food',2,1);
insert into supervision values(3,'need to walk 30 minutes a day',3,1);

insert into treatment values(1,'glucophage',null,'2 pills',500,null,'1','1');
insert into treatment values(2,'insuline injection',null,'after launch',1000,null,'1','1');
insert into treatment values(3,'espereiene',null,'after meal',2.5,null,'1','1')