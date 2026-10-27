<img src="assets/icon.svg" width="64" height="64" alt="">

# Ingeniería Dennis — Programa iDeas

Sitio informativo de una página para **Ingeniería Dennis**, firma de consultoría de ingeniería civil especializada en proyectos de infraestructura a gran escala en Mexicali.

El sitio presenta la firma, su diagnóstico de innovación y el programa interno de Investigación y Desarrollo **iDeas**. Está construido con HTML, CSS y JavaScript estáticos, y funciona como PWA instalable con soporte fuera de línea.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Anael19-gg/pagina-innovacion)

![Vista previa del sitio](assets/og-image.png)

## Estructura

```
index.html              Página principal
offline.html            Respaldo sin conexión para la PWA
favicon.ico             Icono del navegador
css/styles.css          Diseño y composición
css/fonts.css           Tipografías locales
js/main.js              Revelados, instalación PWA y estado de conexión
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

## PWA

- El service worker precarga la página, estilos, tipografías e iconos.
- Las visitas usan red primero y caché como respaldo; los recursos estáticos usan caché con actualización en segundo plano.
- Si se cambian archivos cacheados, actualiza `CACHE_NAME` en `sw.js` para invalidar la versión anterior.
- La instalación desde el navegador aparece en el pie de página cuando el navegador la ofrece.
