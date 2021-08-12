

-- noinspection SqlNoDataSourceInspection,SqlNoDataSourceInspection

CREATE TABLE IF NOT EXISTS USERS (
userId binary (16) not null,
userName varchar (25) not null,
userPass varchar (50) not null,
userLogged boolean not null,
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