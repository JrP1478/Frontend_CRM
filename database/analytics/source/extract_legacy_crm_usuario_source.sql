/*
Portfolio Control Center - ETAPA 6 / Avance 3
Consulta fuente de av_Usuario

EJECUTAR EN:
PRIVATE_HOST\MSSQLSERVER,51601
Base: legacy_crm_cob

SOLO LECTURA.
Esta es la consulta que utiliza el loader Python.
*/

USE legacy_crm_cob;
GO

SET NOCOUNT ON;

SELECT
    nId_Usuario,
    NULLIF(LTRIM(RTRIM(cUsr_NroDoc)), '') AS cUsr_NroDoc,
    cUsr_ApePat,
    cUsr_ApeMat,
    cUsr_Nombres,
    bEstado,
    nid_perfil,
    nid_UsuSuper
FROM dbo.av_Usuario WITH (READUNCOMMITTED)
ORDER BY nId_Usuario;
