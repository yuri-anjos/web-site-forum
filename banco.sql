create database forumyuri;
use forumyuri;

create table usuario(
    id bigint unsigned not null auto_increment,
    email varchar(255) not null, 
    senha varchar(255) not null,
    nome varchar(255) not null, 
    bio text, 
    primary key(id)
);

create table tag(
    id bigint unsigned not null auto_increment, 
    tech varchar(255) unique not null, 
    primary key(id)
);

create table tag_usuario(
    id bigint unsigned not null auto_increment,
    nivel enum('Iniciante', 'Intermediário', 'Avançado', 'Boss') not null,
    id_usuario bigint unsigned,
    id_tag bigint unsigned,
    primary key(id),
    foreign key (id_usuario) references usuario(id),
    foreign key (id_tag) references tag(id)
);

create table topico(
    id bigint unsigned not null auto_increment,
    titulo varchar(255) not null, 
    descricao text not null,
    criacao datetime not null,
    finalizado boolean not null,
    id_usuario bigint unsigned,
    id_tag bigint unsigned,
    primary key(id),
    foreign key (id_usuario) references usuario(id),
    foreign key (id_tag) references tag(id)
);

create table comentario(
    id bigint unsigned not null auto_increment,
    descricao text not null,
    criacao datetime not null,
    resposta boolean not null,
    id_usuario bigint unsigned,
    id_topico bigint unsigned,
    primary key(id),
    foreign key (id_usuario) references usuario(id),
    foreign key (id_topico) references topico(id)
);

