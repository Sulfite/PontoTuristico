CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET utf8mb4;

START TRANSACTION;

ALTER DATABASE CHARACTER SET utf8mb4;

CREATE TABLE `PontoTuristicos` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `NomePontoTuristico` longtext CHARACTER SET utf8mb4 NULL,
    `DescricaoPontoTuristico` varchar(100) CHARACTER SET utf8mb4 NULL,
    `EnderecoPontoTuristico` longtext CHARACTER SET utf8mb4 NULL,
    `ReferenciaPontoTuristico` longtext CHARACTER SET utf8mb4 NULL,
    `CidadePontoTuristico` longtext CHARACTER SET utf8mb4 NULL,
    `UfPontoTuristico` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_PontoTuristicos` PRIMARY KEY (`Id`)
) CHARACTER SET utf8mb4;

INSERT INTO `PontoTuristicos` (`Id`, `CidadePontoTuristico`, `DescricaoPontoTuristico`, `EnderecoPontoTuristico`, `NomePontoTuristico`, `ReferenciaPontoTuristico`, `UfPontoTuristico`)
VALUES (1, 'Rio de Janeiro', 'Grande', 'Lapa', 'Cristo Reentor', '', 'Rio de Janeiro');

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20210629144733_inicial', '5.0.7');

COMMIT;

