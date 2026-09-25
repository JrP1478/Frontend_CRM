export interface PowerBiImageDefinition {
  readonly id: string;
  readonly label: string;
  readonly src: string;
}

/**
 * Logos migrados desde el portal de Reportería.
 *
 * La opción persiste únicamente `src` en sImagenOpcion. El catálogo sirve
 * para que administración pueda reutilizar los logos existentes sin conocer
 * rutas de archivos ni modificar código al registrar los BI actuales.
 *
 * Algunas rutas históricas se conservan porque ya pueden estar persistidas en
 * `sImagenOpcion`; su archivo WebP se reemplaza con el arte vigente para no
 * invalidar módulos existentes.
 */
export const POWER_BI_IMAGE_CATALOG:
  readonly PowerBiImageDefinition[] = [
    {
      id: 'americatel',
      label: 'AMERICATEL',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'backus-cobranza',
      label: 'CLIENTE_F COBRANZA',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'backus-credito',
      label: 'CLIENTE_F CRÉDITO',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'elede',
      label: 'CLIENTE_J',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'cientifica',
      label: 'CIENTÍFICA',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'dupree',
      label: 'DUPREE',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'yanbal',
      label: 'CLIENTE_S',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'verisure-cobranzas',
      label: 'CLIENTE_Q COBRANZAS',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'derrama',
      label: 'CLIENTE_R',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'openpay',
      label: 'CLIENTE_N',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'pucp',
      label: 'CLIENTE_P',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'adex',
      label: 'CLIENTE_C',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'cliente_a-corporativo',
      label: 'CLIENTE_A CORPORATIVO',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'cliente_a-gobierno',
      label: 'CLIENTE_A GOBIERNO',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'natura',
      label: 'CLIENTE_L',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'gestion-integral-cobranza',
      label: 'GESTION INTEGRAL DE COBRANZA',
      src: '/imgs_webp/gestion-integral.webp',
    },
    {
      id: 'asesor-gestion-campo',
      label: 'ASESOR DE GESTIÓN DE CAMPO',
      src: '/imgs_webp/campo.webp',
    },
    {
      id: 'call-produccion',
      label: 'CALL PRODUCCION',
      src: '/imgs_webp/call-production.webp',
    },
    {
      id: 'indicadores-operativos',
      label: 'INDICADORES OPERATIVOS DE CARTERAS',
      src: '/imgs_webp/analisis.webp',
    },
    {
      id: 'eficiencia-operativa',
      label: 'EFICIENCIA OPERATIVA',
      src: '/imgs_webp/kpi-eficiencia-operativa.webp',
    },
    {
      id: 'alfin',
      label: 'CLIENTE_D',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'certus',
      label: 'CLIENTE_G',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'directv',
      label: 'CLIENTE_I',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'cliente_b',
      label: 'CLIENTE_B',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'niubiz',
      label: 'CLIENTE_M',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
    {
      id: 'oriflame',
      label: 'CLIENTE_O',
      src: '/imgs_webp/client-logo-placeholder.svg',
    },
  ];

export const findPowerBiImageDefinition = (
  value: string
): PowerBiImageDefinition | null => {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  return (
    POWER_BI_IMAGE_CATALOG.find(
      (image) =>
        image.src === normalizedValue
    ) ?? null
  );
};
