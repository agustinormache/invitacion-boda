import * as ftp from "basic-ftp"
import 'dotenv/config'
import path from 'path'

async function deploy() {
  const branchName = process.argv[2]
  
  if (!branchName) {
    console.error("❌ Error: Debes especificar el nombre de la rama/subdominio. Ejemplo: node deploy.js nahiara")
    process.exit(1)
  }

  const client = new ftp.Client()
  client.ftp.verbose = true

  let host = process.env.FTP_HOST
  if (host && host.includes('://')) {
    host = host.split('://')[1]
  }
  const user = process.env.FTP_USER
  const password = process.env.FTP_PASSWORD
  const domain = process.env.FTP_DOMAIN

  if (!host || !user || !password || !domain) {
    console.error("❌ Error: Faltan credenciales FTP en tu archivo .env")
    console.log("Asegurate de tener FTP_HOST, FTP_USER, FTP_PASSWORD y FTP_DOMAIN en tu .env")
    process.exit(1)
  }

  const remoteDir = process.env.FTP_PATH 
    ? `${process.env.FTP_PATH}/${branchName}`
    : `/domains/${domain}/public_html/${branchName}`

  try {
    console.log(`\n🚀 Conectando a ${host}...`)
    await client.access({
      host: host,
      user: user,
      password: password,
      secure: false
    })
    
    // Mostramos la ruta raíz real del FTP para ayudar a debuggear
    const rootPath = await client.pwd()
    console.log(`📍 Carpeta raíz del FTP: ${rootPath}`)

    // Hostinger a veces atrapa al usuario FTP dentro de public_html.
    // Si rootPath ya es public_html o similar, ensureDir creará carpetas anidadas raras.
    // Usaremos la ruta que definiste o la por defecto.
    console.log(`\n📂 Entrando a: ${remoteDir}`)
    
    // Create directory if it doesn't exist
    await client.ensureDir(remoteDir)
    
    // Clear the directory completely before uploading the new build
    await client.clearWorkingDir()
    
    // Path absoluto local
    const localDir = path.resolve(process.cwd(), 'dist/spa')
    console.log(`\n⬆️ Subiendo archivos desde: ${localDir}`)

    // Upload the dist/spa folder
    await client.uploadFromDir(localDir)
    
    // Listamos qué quedó en el servidor para comprobar
    const files = await client.list()
    console.log(`\n📄 Archivos subidos exitosamente: ${files.length} archivos/carpetas.`)
    if (files.length === 0) {
      console.log("⚠️ ATENCIÓN: No se subió ningún archivo. Revisá si la carpeta dist/spa tiene contenido localmente.")
    }
    
    console.log("\n✅ ¡Despliegue finalizado con éxito!")
  } catch (err) {
    console.error("\n❌ Error durante el despliegue:")
    console.error(err)
  }
  client.close()
}

deploy()
