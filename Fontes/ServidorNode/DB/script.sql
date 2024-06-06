create database crm
default character set utf8
default collate utf8_general_ci;

/*-------------------------------------------------------------*/

create table tab_usuario(
	id_usuario int not null auto_increment,
	email varchar(100),
    senha varchar(100),
	nome varchar(100),
    
    primary key(id_usuario)
) default charset = utf8;


create table tab_etapa(
	etapa varchar(20) not null,
	ordem int,
    
    primary key(etapa)
) default charset = utf8;


create table tab_negocio(
	id_negocio int not null auto_increment,
	id_usuario int not null,
	etapa varchar(20),
	descricao varchar(100),
	empresa varchar(100),
	contato varchar(100),
	fone varchar(20),
	email varchar(100),
    valor decimal(12,2),
	dt_cadastro datetime,
    
    primary key(id_negocio),
	foreign key(id_usuario) references tab_usuario(id_usuario),
	foreign key(etapa) references tab_etapa(etapa)
) default charset = utf8;


create table tab_negocio_tarefa(
	id_tarefa int not null auto_increment,
	id_negocio int not null,	
	tarefa varchar(20),
	descricao varchar(100),
	dt_tarefa datetime,
	hora  varchar(5),
	ind_concluido char(1),
	    
    primary key(id_tarefa),
	foreign key(id_negocio) references tab_negocio(id_negocio)
) default charset = utf8;



/*--------------------------------------------------------------------------------------------------*/



-- USUARIO
INSERT INTO TAB_USUARIO(NOME, EMAIL, SENHA) 
VALUES('Heber Stein Mazutti', 'heber@99coders.com.br', '12345');

INSERT INTO TAB_USUARIO(NOME, EMAIL, SENHA) 
VALUES('João da Silva', 'joao@99coders.com.br', '12345');


-- ETAPAS
INSERT INTO TAB_ETAPA (ETAPA, ORDEM) VALUES('Prospecção', 1);
INSERT INTO TAB_ETAPA (ETAPA, ORDEM) VALUES('Reunião', 2);
INSERT INTO TAB_ETAPA (ETAPA, ORDEM) VALUES('Proposta', 3);
INSERT INTO TAB_ETAPA (ETAPA, ORDEM) VALUES('Negociação', 4);
INSERT INTO TAB_ETAPA (ETAPA, ORDEM) VALUES('Fechamento', 5);


-- NEGOCIOS
INSERT INTO TAB_NEGOCIO (ID_USUARIO, ETAPA, EMPRESA, CONTATO, FONE, EMAIL, VALOR, DT_CADASTRO, DESCRICAO)
VALUES (1, 'Prospecção', '99 Coders', 'Heber Stein Mazutti', '(11) 5471-5200', 'teste@99coders.com.br', 2500, '2023-01-10 09:40:00', 'Venda de Software');

INSERT INTO TAB_NEGOCIO (ID_USUARIO, ETAPA, EMPRESA, CONTATO, FONE, EMAIL, VALOR, DT_CADASTRO, DESCRICAO)
VALUES (1, 'Prospecção', 'ABC Metalurgica', 'João Moraes', '(11) 3952-4150', 'jj@abc.com.br', 15240, '2023-02-12 09:40:00', 'Venda de Software');

INSERT INTO TAB_NEGOCIO (ID_USUARIO, ETAPA, EMPRESA, CONTATO, FONE, EMAIL, VALOR, DT_CADASTRO, DESCRICAO)
VALUES (1, 'Prospecção', 'Autoposto Brasil', 'Antonio', '(11) 98520-4210', 'antonio@autobrasil.com.br', 6320, '2023-03-20 09:40:00', 'Venda de Software');

INSERT INTO TAB_NEGOCIO (ID_USUARIO, ETAPA, EMPRESA, CONTATO, FONE, EMAIL, VALOR, DT_CADASTRO, DESCRICAO)
VALUES (1, 'Prospecção', 'Mercado Central', 'Mario Santos', '(11) 5213-6300', 'mario@central.com.br', 3500, '2023-04-07 09:40:00', 'Venda de Software');

INSERT INTO TAB_NEGOCIO (ID_USUARIO, ETAPA, EMPRESA, CONTATO, FONE, EMAIL, VALOR, DT_CADASTRO, DESCRICAO)
VALUES (1, 'Prospecção', 'Oficina Car', 'José Roberto', '(19) 4355-3425', 'jose@oficina.com.br', 6000, '2023-04-25 09:40:00', 'Venda de Software');

INSERT INTO TAB_NEGOCIO (ID_USUARIO, ETAPA, EMPRESA, CONTATO, FONE, EMAIL, VALOR, DT_CADASTRO, DESCRICAO)
VALUES (1, 'Prospecção', 'Mega Serviços', 'Ana Maria', '(17) 94520-3654', 'ana@megaservicos.com.br', 4200, '2023-06-03 09:40:00', 'Venda de Software');

INSERT INTO TAB_NEGOCIO (ID_USUARIO, ETAPA, EMPRESA, CONTATO, FONE, EMAIL, VALOR, DT_CADASTRO, DESCRICAO)
VALUES (1, 'Negociação', 'Giga Motors', 'Esteves', '(16) 95210-4250', 'esteves@giga.com.br', 3100, '2023-07-05 09:40:00', 'Venda de Software');

INSERT INTO TAB_NEGOCIO (ID_USUARIO, ETAPA, EMPRESA, CONTATO, FONE, EMAIL, VALOR, DT_CADASTRO, DESCRICAO)
VALUES (2, 'Reunião', 'Vex', 'Marcos Melo', '(11) 97452-1010', 'marcos@vex.com.br', 12200, '2023-07-06 11:00:00', 'Venda de Software');




-- TAREFAS
INSERT INTO TAB_NEGOCIO_TAREFA (ID_NEGOCIO, TAREFA, DESCRICAO, DT_TAREFA, HORA, IND_CONCLUIDO)
VALUES (1, 'Visita', 'Reunião com o cliente', '2023-05-20', '14:00', 'N');

INSERT INTO TAB_NEGOCIO_TAREFA (ID_NEGOCIO, TAREFA, DESCRICAO, DT_TAREFA, HORA, IND_CONCLUIDO)
VALUES (2, 'Ligação', 'Ligar para entender o problema', '2023-05-18', '09:00', 'N');

INSERT INTO TAB_NEGOCIO_TAREFA (ID_NEGOCIO, TAREFA, DESCRICAO, DT_TAREFA, HORA, IND_CONCLUIDO)
VALUES (3, 'Ligação', 'Marcar reunião venda software', '2023-05-18', '10:30', 'S');

INSERT INTO TAB_NEGOCIO_TAREFA (ID_NEGOCIO, TAREFA, DESCRICAO, DT_TAREFA, HORA, IND_CONCLUIDO)
VALUES (3, 'Reunião', 'Apresentar nova versão do software', '2023-05-19', '16:00', 'N');











