# Plantilla Invitación Boda (Quasar)

Esta es una plantilla reutilizable para invitaciones de boda. Todo el contenido es dinámico y se configura desde un único archivo JSON.

## 🚀 Cómo empezar

1. **Instalar dependencias:**
   Asegurate de tener Node.js instalado y ejecutá:

   ```bash
   npm install
   # o yarn install / pnpm install
   ```

2. **Servidor de desarrollo:**
   Ejecutá el siguiente comando para ver la plantilla en vivo:
   ```bash
   npm run dev
   # o npx quasar dev
   ```

## ⚙️ Configuración (El único archivo que tenés que editar)

Toda la información (nombre, fechas, links, cuentas bancarias) está centralizada en:
`src/data/config.json`

Solo tenés que abrir ese archivo y modificar los valores. Los cambios se reflejarán automáticamente en el diseño.

## 🖼️ Imágenes y Audio

Los recursos multimedia deben colocarse en la carpeta `public/`:

- **Foto Principal:** Guardala en `public/images/` y actualizá la ruta en `config.json` (ej: `"heroImage": "images/hero.jpg"`).
- **Galería:** Guardá las fotos en `public/images/` y actualizá el array `"images"` en `config.json`.
- **Música:** Guardá tu archivo `.mp3` en `public/audio/` y configuralo en `config.json` (ej: `"musicFile": "audio/background.mp3"`).

## 📝 Integración con Google Sheets (Formularios)

Para que los formularios de Asistencia (RSVP) y Sugerencia de Canciones funcionen sin necesidad de un backend o base de datos, usamos Google Apps Script.

1. Creá una nueva hoja de cálculo en Google Sheets.
2. Andá a **Extensiones > Apps Script**.
3. Pegá el siguiente código:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet()
  var formType = e.parameter.formType

  if (formType === 'rsvp') {
    var rsvpSheet = sheet.getSheetByName('Asistencia') || sheet.insertSheet('Asistencia')
    if (rsvpSheet.getLastRow() === 0) {
      rsvpSheet.appendRow(['Fecha/Hora', 'Nombre', 'Apellido', 'Asiste', 'Menú', 'Tipo'])
    }
    rsvpSheet.appendRow([
      new Date(),
      e.parameter.nombre,
      e.parameter.apellido,
      e.parameter.asiste,
      e.parameter.menu,
      e.parameter.tipo,
    ])
  } else if (formType === 'playlist') {
    var playlistSheet = sheet.getSheetByName('Playlist') || sheet.insertSheet('Playlist')
    if (playlistSheet.getLastRow() === 0) {
      playlistSheet.appendRow(['Fecha/Hora', 'Canción', 'Autor'])
    }
    playlistSheet.appendRow([new Date(), e.parameter.cancion, e.parameter.autor])
  } else if (formType === 'guestbook') {
    var guestbookSheet = sheet.getSheetByName('Mensajes') || sheet.insertSheet('Mensajes')
    if (guestbookSheet.getLastRow() === 0) {
      guestbookSheet.appendRow(['Fecha/Hora', 'Nombre', 'Mensaje'])
    }
    guestbookSheet.appendRow([new Date(), e.parameter.nombre, e.parameter.mensaje])
  }

  return ContentService.createTextOutput('Success').setMimeType(ContentService.MimeType.TEXT)
}

function doGet(e) {
  if (e.parameter.action === 'getMessages') {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Mensajes')
    if (!sheet)
      return ContentService.createTextOutput('[]').setMimeType(ContentService.MimeType.JSON)

    var data = sheet.getDataRange().getValues()
    var messages = []

    // Omitir fila de encabezados
    for (var i = 1; i < data.length; i++) {
      if (data[i][1] && data[i][2]) {
        messages.push({
          nombre: data[i][1],
          mensaje: data[i][2],
        })
      }
    }

    // Habilitar CORS es automático en Web Apps, retornamos JSON
    return ContentService.createTextOutput(JSON.stringify(messages)).setMimeType(
      ContentService.MimeType.JSON,
    )
  }
  return ContentService.createTextOutput('OK')
}
```

4. Hacé clic en **Implementar > Nueva implementación**.
5. Seleccioná tipo **Aplicación web**.
6. En "Acceso", elegí **"Cualquier persona"**.
7. Copiá la URL web generada y pegala en `src/data/config.json` en el campo `"googleScriptUrl"`.

## 📦 Despliegue a Producción

Para compilar la aplicación para producción:

# Plantilla Invitación 15 Años (Quasar)

Esta es una plantilla reutilizable para invitaciones de cumpleaños de 15 años. Todo el contenido es dinámico y se configura desde un único archivo JSON.

## 🚀 Cómo empezar

1. **Instalar dependencias:**
   Asegurate de tener Node.js instalado y ejecutá:

   ```bash
   npm install
   # o yarn install / pnpm install
   ```

2. **Servidor de desarrollo:**
   Ejecutá el siguiente comando para ver la plantilla en vivo:
   ```bash
   npm run dev
   # o npx quasar dev
   ```

## ⚙️ Configuración (El único archivo que tenés que editar)

Toda la información (nombre, fechas, links, cuentas bancarias) está centralizada en:
`src/data/config.json`

Solo tenés que abrir ese archivo y modificar los valores. Los cambios se reflejarán automáticamente en el diseño.

## 🖼️ Imágenes y Audio

Los recursos multimedia deben colocarse en la carpeta `public/`:

- **Foto Principal:** Guardala en `public/images/` y actualizá la ruta en `config.json` (ej: `"heroImage": "images/hero.jpg"`).
- **Galería:** Guardá las fotos en `public/images/` y actualizá el array `"images"` en `config.json`.
- **Música:** Guardá tu archivo `.mp3` en `public/audio/` y configuralo en `config.json` (ej: `"musicFile": "audio/background.mp3"`).

## 📝 Integración con Google Sheets (Formularios)

Para que los formularios de Asistencia (RSVP) y Sugerencia de Canciones funcionen sin necesidad de un backend o base de datos, usamos Google Apps Script.

1. Creá una nueva hoja de cálculo en Google Sheets.
2. Andá a **Extensiones > Apps Script**.
3. Pegá el siguiente código:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet()
  var formType = e.parameter.formType

  if (formType === 'rsvp') {
    var rsvpSheet = sheet.getSheetByName('Asistencia') || sheet.insertSheet('Asistencia')
    if (rsvpSheet.getLastRow() === 0) {
      rsvpSheet.appendRow(['Fecha/Hora', 'Nombre', 'Apellido', 'Asiste', 'Menú', 'Tipo'])
    }
    rsvpSheet.appendRow([
      new Date(),
      e.parameter.nombre,
      e.parameter.apellido,
      e.parameter.asiste,
      e.parameter.menu,
      e.parameter.tipo,
    ])
  } else if (formType === 'playlist') {
    var playlistSheet = sheet.getSheetByName('Playlist') || sheet.insertSheet('Playlist')
    if (playlistSheet.getLastRow() === 0) {
      playlistSheet.appendRow(['Fecha/Hora', 'Canción', 'Autor'])
    }
    playlistSheet.appendRow([new Date(), e.parameter.cancion, e.parameter.autor])
  } else if (formType === 'guestbook') {
    var guestbookSheet = sheet.getSheetByName('Mensajes') || sheet.insertSheet('Mensajes')
    if (guestbookSheet.getLastRow() === 0) {
      guestbookSheet.appendRow(['Fecha/Hora', 'Nombre', 'Mensaje'])
    }
    guestbookSheet.appendRow([new Date(), e.parameter.nombre, e.parameter.mensaje])
  }

  return ContentService.createTextOutput('Success').setMimeType(ContentService.MimeType.TEXT)
}

function doGet(e) {
  if (e.parameter.action === 'getMessages') {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Mensajes')
    if (!sheet)
      return ContentService.createTextOutput('[]').setMimeType(ContentService.MimeType.JSON)

    var data = sheet.getDataRange().getValues()
    var messages = []

    // Omitir fila de encabezados
    for (var i = 1; i < data.length; i++) {
      if (data[i][1] && data[i][2]) {
        messages.push({
          nombre: data[i][1],
          mensaje: data[i][2],
        })
      }
    }

    // Habilitar CORS es automático en Web Apps, retornamos JSON
    return ContentService.createTextOutput(JSON.stringify(messages)).setMimeType(
      ContentService.MimeType.JSON,
    )
  }
  return ContentService.createTextOutput('OK')
}
```

4. Hacé clic en **Implementar > Nueva implementación**.
5. Seleccioná tipo **Aplicación web**.
6. En "Acceso", elegí **"Cualquier persona"**.
7. Copiá la URL web generada y pegala en `src/data/config.json` en el campo `"googleScriptUrl"`.

## 📦 Despliegue a Producción

Para compilar la aplicación para producción:

```bash
npm run build
```

Esto generará una carpeta `dist/spa` que contiene los archivos estáticos listos para subir a cualquier hosting (Vercel, Netlify, GitHub Pages, Hostinger, etc).

### 🚀 Despliegue Automático con GitHub Actions (Recomendado)

Configuramos el repositorio para que trabaje por vos usando **GitHub Actions**. De esta manera, no tenés que correr comandos raros ni preocuparte por el FTP en tu computadora local.

**¿Cómo funciona?**
Cada vez que hagas un `git push` a una rama de un cliente (ejemplo: `nahiara`, `martina`), los servidores de GitHub van a compilar automáticamente la web y la van a subir por FTP a Hostinger, creando una carpeta con el nombre de esa rama.

**1. Configuración por ÚNICA VEZ en GitHub:**
Como GitHub necesita permisos para entrar a tu Hostinger, tenés que pasarle los datos de acceso FTP pero de forma segura (para que no queden públicos en tu código).

1. Entrá a tu repositorio en GitHub desde el navegador.
2. Andá a **Settings** (Configuración) > **Secrets and variables** > **Actions**.
3. Tocá el botón verde **"New repository secret"** y creá estos 4 secretos, uno por uno:
   - Nombre: `FTP_SERVER` | Valor: tu IP (ej: `82.197.80.161` o `ftp.tudominio.com`)
   - Nombre: `FTP_USERNAME` | Valor: tu usuario FTP (ej: `u123456789`)
   - Nombre: `FTP_PASSWORD` | Valor: tu contraseña de Hostinger

**2. ¿Cómo subir un evento ahora?**
¡Fácil! Cuando termines de trabajar en la invitación de un cliente (suponiendo que estás en la rama `nahiara`), simplemente guardá tus cambios en GitHub como hacés siempre:

```bash
git add .
git commit -m "Actualizando datos de nombre-de-la-quinceañera"
git push
```

¡Listo! Al hacer `git push`, si vas a la pestaña **"Actions"** en tu repositorio de GitHub, vas a ver una bolita girando que dice "Deploy to Hostinger FTP". Cuando termine de cargar, tu web ya estará subida a `tudominio.com/paula`.
