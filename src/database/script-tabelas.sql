CREATE DATABASE IF NOT EXISTS techmentor;
USE techmentor;

CREATE TABLE IF NOT EXISTS estado (
    nomeEstado VARCHAR(100) PRIMARY KEY,
    sigla CHAR(2),
    regiao VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS cidade (
    nomeCidade VARCHAR(100) PRIMARY KEY,
    fkEstado VARCHAR(100),
    FOREIGN KEY (fkEstado) REFERENCES estado(nomeEstado)
);

CREATE TABLE IF NOT EXISTS baseMunicipio (
    idMunicipio INT AUTO_INCREMENT PRIMARY KEY,
    fkCidade VARCHAR(100),
    ano CHAR(4),
    operadora VARCHAR(100),
    domiciliosCobertosPercentual DECIMAL(5,2),
    areaCobertaPercentual DECIMAL(5,2),
    tecnologia VARCHAR(50),
    FOREIGN KEY (fkCidade) REFERENCES cidade(nomeCidade)
);

CREATE TABLE IF NOT EXISTS baseEstacoesSMP (
    idEstacoesSMP INT AUTO_INCREMENT PRIMARY KEY,
    fkCidade VARCHAR(255),
    operadora VARCHAR(255),
    codigoIBGE VARCHAR(255),
    tecnologia VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS baseCensoIBGE (
    idCensoIBGE INT AUTO_INCREMENT PRIMARY KEY,
    fkCidade VARCHAR(100),
    area DECIMAL(10,2),
    densidadeDemografica DECIMAL(10,2),
    FOREIGN KEY (fkCidade) REFERENCES cidade(nomeCidade)
);

CREATE TABLE IF NOT EXISTS baseProjecaoPopulacional (
    idProjecaoPopulacional INT AUTO_INCREMENT PRIMARY KEY,
    fkEstado VARCHAR(100),
    ano INT,
    projecao INT,
    FOREIGN KEY (fkEstado) REFERENCES estado(nomeEstado)
);

CREATE TABLE IF NOT EXISTS empresa (
    cnpj VARCHAR(20) PRIMARY KEY NOT NULL UNIQUE,
    nomeEmpresa VARCHAR(100) NOT NULL,
    nomeResponsavel VARCHAR(100),
    emailResponsavel VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS cargo (
    nomeCargo VARCHAR(100) PRIMARY KEY NOT NULL,
    acessos VARCHAR(100),
    fkCnpj VARCHAR(20),
    FOREIGN KEY (fkCnpj) REFERENCES empresa(cnpj)
);

CREATE TABLE IF NOT EXISTS usuario (
    cpf VARCHAR(20) PRIMARY KEY,
    email VARCHAR(100),
    nomeUsuario VARCHAR(100),
    senha VARCHAR(100),
    fkCnpj VARCHAR(20),
    fkNomeCargo VARCHAR(100),
    FOREIGN KEY (fkCnpj) REFERENCES empresa(cnpj),
    FOREIGN KEY (fkNomeCargo) REFERENCES cargo(nomeCargo)
);

CREATE TABLE IF NOT EXISTS notificacao (
    texto VARCHAR(150),
    dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    enviado BOOL,
    paraEmpresa BOOL,
    fkCnpj VARCHAR(20),
    FOREIGN KEY (fkCnpj) REFERENCES empresa(cnpj)
);