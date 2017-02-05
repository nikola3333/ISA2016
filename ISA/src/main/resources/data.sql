insert into role(name) values ("GUEST");
insert into role(name) values ("WAITER");
insert into role(name) values ("SYSTEM_MANAGER");
insert into role(name) values ("BARTENDER");
insert into role(name) values ("COOK");
insert into role(name) values ("RESTAURAN_MANAGER");
insert into role(name) values ("SELLER");


insert into user(email,first_name,last_name,password,role) values ('danilo@a.com', 'b', 'b', 'b',1);
insert into guest(confirmed_registration,user_id) values(0,1);
insert into user(email,first_name,last_name,password,role) values('abc@d.com' , 'Branko','Dragas','123',1);
insert into guest(confirmed_registration,user_id) values(0,2);


insert into user(email,first_name,last_name,password,role)  values('efg@h.com','janko','jankovic','123',2);
insert into waiter(user_id) values(3);
insert into user(email,first_name,last_name,password,role)  values('122@22.com','marko','markovic','456',2);
insert into waiter(user_id) values(4);


insert into user(email,first_name,last_name,password,role) values('sys@man.com','scepan','scekic','123',3);
insert into system_manager(user_id) values(5);
insert into user(email,first_name,last_name,password,role) values('man@sys.com','Bogoljub','Gagic','456',3);
insert into system_manager(user_id) values(6);

insert into user(email,first_name,last_name,password,role) values('bart1@ender.com','Pera','Peric','789',4);
insert into bartender(user_id) values(7);
insert into user(email,first_name,last_name,password,role) values('bart2@ender.com','Suma','Suma','000',4);
insert into bartender(user_id) values(8);


insert into user(email,first_name,last_name,password,role) values('cook@1.com','Dzejmi','Oliver','111',5);
insert into cook(user_id) values(9);
insert into user(email,first_name,last_name,password,role) values('cook@2.com','Petar','Petrovic','222',5);
insert into cook(user_id) values(10);


insert into user(email,first_name,last_name,password,role) values('manag1@rest.com','Miljenko','Miljenkovic','123',6);
insert into restauran_manager(user_id) values(11);
insert into user(email,first_name,last_name,password,role) values('manag2@rest.com','Vojislav','Seselj','123',6);
insert into restauran_manager(user_id) values(12);

insert into user(email,first_name,last_name,password,role) values('seller1@rest.com','Nikola','Smiljanic','456',7);
insert into seller(user_id) values(13);
insert into user(email,first_name,last_name,password,role) values('seller2@rest.com','Vojislav','Rakocevic','789',7);
insert into seller(user_id) values(14);
