CREATE DATABASE techmentor;
USE techmentor;

CREATE TABLE estado (
    idEstado INT AUTO_INCREMENT PRIMARY KEY,
    regiao VARCHAR(100),
    UF CHAR(2)
);

CREATE TABLE municipio (
    idMunicipio INT AUTO_INCREMENT PRIMARY KEY,
    ano char(4),
    cidade VARCHAR(100),
    operadora VARCHAR(100),
    domiciliosCobertosPercent DECIMAL(10,2),
    areaCobertaPercent DECIMAL(5,2),
    tecnologia VARCHAR(50)
);


CREATE TABLE estacoesSMP (
    idEstacoesSMP INT AUTO_INCREMENT PRIMARY KEY,
    cidade VARCHAR(255),
    operadora VARCHAR(255),
    latitude BIGINT,
    longitude BIGINT,
    codigoIBGE VARCHAR(255),
    tecnologia VARCHAR(255)
);


CREATE TABLE censoIBGE (
    idCensoIBGE INT AUTO_INCREMENT PRIMARY KEY,
    cidade VARCHAR(100),
    area DECIMAL(10,2),
    densidadeDemografica DECIMAL(10,2)
);


CREATE TABLE projecaoPopulacional (
    idProjecaoPopulacional INT AUTO_INCREMENT PRIMARY KEY,
    estado varchar(100),
    ano INT,
    projecao INT
);

CREATE TABLE empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    nomeEmpresa VARCHAR(100) NOT NULL,
    nomeResponsavel VARCHAR(100),
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    emailResponsavel VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);


CREATE TABLE cargo (
    idCargo INT AUTO_INCREMENT PRIMARY KEY,
    nomeCargo VARCHAR(100) NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    idEmpresa INT,
    FOREIGN KEY (idEmpresa) REFERENCES empresa(idEmpresa)
);


CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    nomeUsuario VARCHAR(100),
    cpf VARCHAR(20),
    senha VARCHAR(100),
    imagemPerfil varchar(255),
    idEmpresa INT,
    idCargo INT,
    FOREIGN KEY (idEmpresa) REFERENCES empresa(idEmpresa),
    FOREIGN KEY (idCargo) REFERENCES cargo(idCargo)
);