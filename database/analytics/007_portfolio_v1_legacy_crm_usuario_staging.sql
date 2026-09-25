/*
Portfolio Control Center - ETAPA 6 / Avance 3
Staging de usuarios CRM para jerarquía Supervisor -> Asesor
Motor: SQL Server

EJECUTAR EN:
PRIVATE_HOST\MSSQLSERVER,51601
Base: legacy_crm_analytics

La fuente física real se extrae desde:
PRIVATE_HOST\MSSQLSERVER,51601
Base: legacy_crm_cob

Analytics NO consulta legacy_crm_cob directamente.
*/

SET NOCOUNT ON;
SET XACT_ABORT ON;
GO


IF SCHEMA_ID('staging') IS NULL
    EXEC('CREATE SCHEMA staging');
GO


IF OBJECT_ID('staging.legacy_crm_usuario_current', 'U') IS NULL
BEGIN
    CREATE TABLE staging.legacy_crm_usuario_current
    (
        source_code          VARCHAR(50) NOT NULL,
        source_as_of_at      DATETIME2(3) NOT NULL,

        nId_Usuario          INT NOT NULL,
        cUsr_NroDoc          VARCHAR(30) NULL,
        cUsr_ApePat          VARCHAR(100) NULL,
        cUsr_ApeMat          VARCHAR(100) NULL,
        cUsr_Nombres         VARCHAR(100) NULL,
        bEstado              BIT NOT NULL,
        nid_perfil           INT NULL,
        nid_UsuSuper         INT NULL,

        loaded_at            DATETIME2(3) NOT NULL
            CONSTRAINT DF_staging_legacy_crm_usuario_loaded_at
            DEFAULT (SYSUTCDATETIME()),

        CONSTRAINT PK_staging_legacy_crm_usuario_current
            PRIMARY KEY (source_code, nId_Usuario)
    );

    CREATE INDEX IX_staging_legacy_crm_usuario_supervisor
        ON staging.legacy_crm_usuario_current(source_code, nid_UsuSuper)
        INCLUDE
        (
            cUsr_NroDoc,
            cUsr_ApePat,
            cUsr_ApeMat,
            cUsr_Nombres,
            bEstado,
            nid_perfil,
            source_as_of_at
        );
END;
GO
