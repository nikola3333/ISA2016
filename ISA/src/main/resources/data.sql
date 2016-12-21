insert into role(name) values ("GUEST");
insert into role(name) values ("WAITER");
insert into role(name) values ("SYSTEM_MANAGER");
insert into role(name) values ("BARTENDER");
insert into role(name) values ("COOK");
insert into role(name) values ("RESTAURAN_MANAGER");
insert into role(name) values ("SELLER");





insert into guest(confirmed_registration, email,first_name,last_name,password,role) values (0, 'danilo@a.com', 'b', 'b', 'b',1);
insert into guest(confirmed_registration,email,first_name,last_name,password,role) values(0,'abc@d.com','janko','jankovic','123',1);

insert into waiter(email,first_name,last_name,password,role)  values('efg@h.com','janko','jankovic','123',2);
insert into waiter(email,first_name,last_name,password,role)  values('122@22.com','marko','markovic','456',2);

insert into system_manager(email,first_name,last_name,password,role) values('sys@man.com','scepan','scekic','123',3);
insert into system_manager(email,first_name,last_name,password,role) values('man@sys.com','Bogoljub','Gagic','456',3);

insert into bartender(email,first_name,last_name,password,role) values('bart1@ender.com','Pera','Peric','789',4);
insert into bartender(email,first_name,last_name,password,role) values('bart2@ender.com','Suma','Suma','000',4);

insert into cook(email,first_name,last_name,password,role) values('cook@1.com','Dzejmi','Oliver','111',5);
insert into cook(email,first_name,last_name,password,role) values('cook@2.com','Petar','Petrovic','222',5);

