CREATE SCHEMA IF NOT EXISTS techmentor;
USE techmentor;

CREATE TABLE IF NOT EXISTS empresa (
  cnpj VARCHAR(20) PRIMARY KEY,
  nomeEmpresa VARCHAR(100),
  nomeResponsavel VARCHAR(100),
  emailResponsavel VARCHAR(100),
  senha VARCHAR(100),
  webhook VARCHAR(100),
  imagemPerfil VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS cargo (
  nomeCargo VARCHAR(100) PRIMARY KEY,
  acessos VARCHAR(100),
  fkCnpj VARCHAR(20),
  FOREIGN KEY (fkCnpj) REFERENCES empresa (cnpj)
);

CREATE TABLE IF NOT EXISTS usuario (
  cpf VARCHAR(20) PRIMARY KEY,
  email VARCHAR(100),
  nomeUsuario VARCHAR(100),
  senha VARCHAR(100),
  imagemPerfil VARCHAR(200),
  fkCnpj VARCHAR(20),
  fkNomeCargo VARCHAR(100),
  FOREIGN KEY (fkCnpj) REFERENCES empresa (cnpj),
  FOREIGN KEY (fkNomeCargo) REFERENCES cargo (nomeCargo)
);

CREATE TABLE IF NOT EXISTS historico (
  idHistorico INT AUTO_INCREMENT,
  dataAcesso DATE,
  fkCpf VARCHAR(20),
  PRIMARY KEY (idHistorico, fkCpf),
  FOREIGN KEY (fkCpf) REFERENCES usuario (cpf)
);

CREATE TABLE IF NOT EXISTS estado (
  nomeEstado VARCHAR(100) PRIMARY KEY,
  sigla CHAR(2),
  regiao VARCHAR(25),
  qtdAntenas INT,
  maiorOperadora VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS cidade (
  nomeCidade VARCHAR(100) PRIMARY KEY,
  fkEstado VARCHAR(100),
  FOREIGN KEY (fkEstado) REFERENCES estado (nomeEstado)
);

CREATE TABLE IF NOT EXISTS basecensoibge (
  idCensoIBGE INT PRIMARY KEY AUTO_INCREMENT,
  area DECIMAL(10,2),
  densidadeDemografica DECIMAL(10,2),
  fkCidade VARCHAR(100),
  FOREIGN KEY (fkCidade) REFERENCES cidade (nomeCidade)
);

CREATE TABLE IF NOT EXISTS baseestacoessmp (
  idEstacoesSMP INT PRIMARY KEY AUTO_INCREMENT,
  operadora VARCHAR(25),
  codigoIBGE VARCHAR(25),
  tecnologia VARCHAR(25),
  fkCidade VARCHAR(100),
  FOREIGN KEY (fkCidade) REFERENCES cidade (nomeCidade)
);

CREATE TABLE IF NOT EXISTS basemunicipio (
  idMunicipio INT PRIMARY KEY AUTO_INCREMENT,
  fkCidade VARCHAR(100),
  ano CHAR(4),
  operadora VARCHAR(25),
  domiciliosCobertosPercentual DECIMAL(5,2),
  areaCobertaPercentual DECIMAL(5,2),
  tecnologia VARCHAR(15),
  FOREIGN KEY (fkCidade) REFERENCES cidade (nomeCidade)
);

CREATE TABLE IF NOT EXISTS baseprojecaopopulacional (
  idProjecaoPopulacional INT PRIMARY KEY AUTO_INCREMENT,
  fkEstado VARCHAR(100),
  ano INT,
  projecao INT,
  FOREIGN KEY (fkEstado) REFERENCES estado (nomeEstado)
);

CREATE TABLE IF NOT EXISTS notificacao (
  idNotificacao INT PRIMARY KEY AUTO_INCREMENT,
  texto VARCHAR(150),
  dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  paraEmpresa BOOLEAN,
  statusEnviada BOOLEAN,
  fkCnpj VARCHAR(20),
  FOREIGN KEY (fkCnpj) REFERENCES empresa (cnpj)
);
