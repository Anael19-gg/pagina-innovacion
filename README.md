<img src="assets/icon.svg" width="64" height="64" alt="">

# Portafolio de propuestas de valor y evaluación de la vinculación — Ingeniería Dennis

Portafolio web colaborativo de las **Metas 4.1 y 4.2** de Gestión de la Innovación: organización, grupos de interés, propuestas de valor, innovación organizacional y evaluación de la vinculación con los grupos prioritarios. El caso de estudio es **Ingeniería Dennis**, firma de consultoría de ingeniería civil especializada en proyectos de infraestructura a gran escala en Mexicali.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Anael19-gg/pagina-innovacion)

![Vista previa del portafolio](assets/og-image.png)

## Contenido del portafolio

1. **Organización.** Perfil de la firma, hallazgo principal del diagnóstico y presentación del programa interno de I+D **iDeas**.
2. **Grupos de interés.** Lista de actores internos y externos, revisión de las cinco familias, matriz poder–interés y tres grupos prioritarios.
3. **Propuestas de valor.** Resumen de las tres propuestas y expedientes completos: mapas de empatía para los grupos internos y Value Proposition Canvas para los clientes.
4. **Relación con la innovación.** Cómo iDeas conecta el conocimiento del personal, los recursos de la dirección y la validación de los clientes.
5. **Evaluación de la vinculación.** Evaluación de la relación actual con los mismos tres grupos prioritarios de la semana 9:
   - **5.1** Calificación de 1 a 3 en cuatro dimensiones, con una línea de evidencia por calificación y total por grupo.
   - **5.2** Dos fortalezas y dos áreas de oportunidad, cada una con la dimensión y la calificación de la que sale.
   - **5.3** Una propuesta de mejora por grupo con qué haremos, con quién, primer paso, dimensión de → a y relación con la innovación.

## Revisión de la Meta 4.1

| Criterio | Cobertura |
| --- | --- |
| Identificación y priorización de grupos de interés (30%) | Cinco actores, cinco familias revisadas, matriz poder–interés y tres grupos prioritarios (dos internos y uno externo). |
| Calidad de las propuestas y uso de herramientas (30%) | Tres propuestas de valor; mapas de empatía para los grupos internos y VPC para los clientes. |
| Vinculación con la innovación organizacional (20%) | Sección 04 con el programa iDeas, los roles del ecosistema y el flujo hallazgo → iDeas → propuestas → innovación continua. |
| Trabajo colaborativo y presentación (20%) | Sitio navegable, responsive, accesible, instalable como PWA e imprimible como portafolio PDF. |

## Revisión de la Meta 4.2

| Criterio | Cobertura |
| --- | --- |
| Evaluación fundamentada de la vinculación por grupo de interés (40%) | Tres grupos prioritarios, cuatro dimensiones calificadas de 1 a 3, una línea de evidencia por calificación y total por grupo: 9/12, 6/12 y 7/12. |
| Identificación de fortalezas, áreas de oportunidad y propuestas de mejora (35%) | Dos fortalezas y dos áreas de oportunidad con referencia a la dimensión y calificación; tres propuestas de mejora con qué haremos, con quién, primer paso, dimensión de → a y relación con la innovación. |
| Trabajo colaborativo, presentación y oportunidad (25%) | Sitio navegable, responsive, accesible, instalable como PWA e imprimible como portafolio PDF; método y escala explícitos; enlace listo para el buzón. |

### Datos de la entrega

- **Tamaño:** Pequeña empresa.
- **Integrantes:** Anael Ramos Morales, Pablo Alejandro Prado Pimentel y Melany Tapia Morales.
- **Meta 4.2:** Evaluación de la vinculación con grupos de interés.
- **Valor:** 10%.
- **Fecha límite:** lunes 2 de noviembre, antes de las 23:59 h.
- **Buzón:** Evaluación de la vinculación con grupos de interés. Un enlace por equipo, al sitio publicado.
- **Secciones de la Meta 4.2:** 5.1 Evaluación de cada grupo, 5.2 Fortalezas y áreas de oportunidad, 5.3 Propuestas de mejora.

### Nota sobre la evaluación

- Se evalúa la relación actual, no la que tendrían con las propuestas de mejora.
- Se usan los mismos tres grupos prioritarios de la semana 9 y su propuesta de valor.
- Los totales (9/12, 6/12 y 7/12) solo sirven para comparar grupos.
- El total del Grupo 2 se corrigió a 6/12: la suma de sus cuatro calificaciones (1+1+2+2) da 6, no 8.
- Las propuestas usan puestos, no nombres de personas, y un primer paso ejecutable la próxima semana.
- Las mejoras son de bajo costo y quedan dentro de lo que puede decidir la gerencia.

## Estructura

```
index.html              Portafolio principal
offline.html            Respaldo sin conexión para la PWA
favicon.ico             Icono del navegador
css/styles.css          Diseño, componentes y estilos de impresión
css/fonts.css           Tipografías locales
js/main.js              Revelados, impresión, instalación PWA y estado de conexión
sw.js                   Service worker
manifest.webmanifest    Manifiesto de la aplicación
vercel.json             Encabezados para el despliegue en Vercel
assets/                 Logotipo, iconos, tipografías e imagen para compartir
```

## Desarrollo local

El sitio no requiere compilación. Para probar la PWA y el service worker hace falta servirlo por HTTP en localhost:

```bash
npx serve .
```

También funciona con cualquier servidor estático, por ejemplo:

```bash
python -m http.server 4173
```

## Despliegue en Vercel

1. Importa el repositorio en Vercel.
2. Selecciona la plantilla **Other**.
3. Deja vacío el comando de compilación y usa la raíz del proyecto como directorio de salida.

Vercel servirá `index.html` en la raíz y los encabezados de `vercel.json` se aplicarán automáticamente.

## Instalar la PWA

Los botones **Instalar aplicación** de la portada y del pie abren la instalación nativa cuando el navegador la ofrece. Si no está disponible —por ejemplo, en iPhone o iPad— muestran una guía con los pasos para Chrome, Edge, Android e iOS. La aplicación queda instalada con el nombre **Dennis 4.2**.

## PWA e impresión

- El service worker precarga la página, estilos, tipografías e iconos.
- Las visitas usan red primero y caché como respaldo; los recursos estáticos usan caché con actualización en segundo plano.
- Si se cambian archivos cacheados, actualiza `CACHE_NAME` en `sw.js` para invalidar la versión anterior.
- **Imprimir portafolio** abre una guía rápida y luego el diálogo de impresión. Para guardar el PDF: elige **Guardar como PDF**, desactiva **Encabezados y pies de página**, usa **A4** y escala **100%**. El diseño de impresión ya incluye portada, secciones y datos de entrega; la sección 05 y la escala de evaluación también forman parte del PDF.
