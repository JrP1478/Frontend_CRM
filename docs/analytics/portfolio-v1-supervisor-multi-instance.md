# ETAPA 6 / Avance 3 — Jerarquía supervisor multi-instancia

## Topología confirmada

Analytics:

`PRIVATE_HOST\MSSQLSERVER,51601 / legacy_crm_analytics`

Fuente CRM accesible:

`PRIVATE_HOST\MSSQLSERVER,51601 / legacy_crm_cob`

Existe también `legacy_crm_cob` en `PRIVATE_HOST`, pero el usuario utilizado no
tiene acceso y esa copia no se usa como fuente para este ETL.

## Decisión

No se realiza referencia SQL de tres partes desde `legacy_crm_analytics` a
`legacy_crm_cob`.

La integración se divide en:

1. extracción pequeña de `PRIVATE_HOST / legacy_crm_cob.dbo.av_Usuario`;
2. carga a `legacy_crm_analytics.staging.legacy_crm_usuario_current`;
3. transformación local:
   `etl.usp_load_cliente_a_supervisor_hierarchy`.

La tabla `av_Usuario` tiene un volumen pequeño frente a las tablas
transaccionales masivas, por lo que el snapshot completo de las columnas
necesarias es simple y seguro.

## Seguridad

Las cadenas de conexión no viven en Git.

El loader exige:

- `LEGACY_CRM_COB_CONNECTION_STRING`;
- `LEGACY_CRM_ANALYTICS_CONNECTION_STRING`.

Cada una puede utilizar el mecanismo de autenticación autorizado para su
servidor.

## Semántica

La fuente de jerarquía sigue siendo:

`advisor nId_Usuario -> nid_UsuSuper -> supervisor nId_Usuario`

La staging solo desacopla la conectividad entre instancias; no cambia la
regla de negocio.

Los asesores con `nid_UsuSuper = NULL` permanecen sin supervisor.
