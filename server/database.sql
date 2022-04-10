


create table tutorials_tbl(
   tutorial_id INT NOT NULL AUTO_INCREMENT,
   tutorial_title VARCHAR(100) NOT NULL,
   tutorial_author VARCHAR(40) NOT NULL,
   submission_date DATE,
   PRIMARY KEY ( tutorial_id )
);




CREATE TABLE IF NOT EXISTS USERS (
userId binary (16) not null,
userName varchar (25) not null,
userPass varchar (50) not null,
userLogged boolean not null,
userSocket varChar (50),
primary key (userId),
unique(userName)
);


CREATE TABLE IF NOT EXISTS MESSAGES (
messageId binary(16) not null,
userId binary(16) not null,
messageText varchar(255),
messageTime date,
primary key (messageId),
foreign key (userId) references USERS(userId)
);