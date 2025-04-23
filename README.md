# TheCocktailStore

## Descripción
TheCocktailStore es una aplicación web de comercio electrónico desarrollada con JavaScript vanilla que permite a los usuarios explorar y comprar productos tecnológicos como laptops, smartphones y accesorios. La aplicación ofrece una experiencia de compra completa, desde la navegación por el catálogo hasta el proceso de checkout y confirmación de pedido.

## Características

- **Catálogo de productos** con filtrado por categorías y búsqueda
- **Carrito de compra** con gestión completa (añadir, eliminar, actualizar cantidades)
- **Detalles de producto** con información completa y especificaciones técnicas
- **Proceso de checkout** en tres pasos:
- Información de envío
- Método de pago
- Confirmación de pedido
- **Persistencia de datos** mediante localStorage
- **Diseño responsive** adaptado a diferentes dispositivos

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Módulos ES6
- FontAwesome para iconografía

## Tutorial: Cómo utilizar este proyecto para pruebas de analítica

### 1. Hacer un fork del repositorio

Un fork es una copia del repositorio en tu cuenta de GitHub, lo que te permite experimentar sin afectar el proyecto original.

1. Navega al [repositorio](https://github.com/EduardoHernandezGuzman/thecocktailstore) original en GitHub
2. En la esquina superior derecha, haz clic en el botón "Fork"
3. Selecciona tu cuenta de GitHub como destino del fork
4. Espera a que se complete el proceso de fork

### 2. Abrir el proyecto en GitHub Codespaces

Codespaces te permite trabajar con el código directamente en el navegador sin necesidad de configurar un entorno local.

1. Navega a tu fork del repositorio
2. Haz clic en el botón "Code" (botón verde)
3. Selecciona la pestaña "Codespaces"
4. Haz clic en "Create codespace on main"
5. Espera a que se configure el entorno (puede tardar unos minutos)

### 3. Realizar cambios y guardarlos con Git

Una vez que hayas abierto el proyecto en Codespaces y realizado tus modificaciones (como implementar etiquetas de analítica), debes guardar estos cambios en tu repositorio:

1. Abre la terminal en Codespaces:
 - Puedes usar el atajo de teclado `Ctrl+` (o `Cmd+` en Mac)
 - O seleccionar "Terminal" > "New Terminal" en el menú superior

2. Verifica qué archivos has modificado:
 ```bash
 git status
 ```
 Esto mostrará en rojo los archivos que han sido modificados pero no están preparados para commit.

3. Añade todos los cambios al área de preparación:
```bash
git add .
```

El punto `.` significa "todos los archivos". Si solo quieres añadir archivos específicos, puedes usar `git add ruta/al/archivo`.

4. Confirma los cambios con un mensaje descriptivo:
```bash
git commit -m "Implementación de GTM y configuración de eventos"
```

Reemplaza el mensaje entre comillas con una descripción breve pero informativa de tus cambios.

5. Sube los cambios a tu repositorio en GitHub:
```bash
git push origin marter
```

Esto enviará tus cambios a la rama principal de tu fork en GitHub.

### 4. Desplegar en GitHub Pages

GitHub Pages te permite publicar tu sitio web directamente desde tu repositorio:

1. Navega a tu fork del repositorio en GitHub
2. Ve a "Settings" (Configuración)
3. En el menú lateral izquierdo, selecciona "Pages"
4. En "Source", selecciona "Deploy from a branch"
5. En "Branch", selecciona "master" y "/root" y haz clic en "Save"
6. Espera unos minutos mientras GitHub Pages construye y despliega tu sitio
7. Una vez completado, verás un mensaje con la URL de tu sitio (normalmente https://[tu-usuario].github.io/TheCocktailStore/)

## Contribuir

Las contribuciones son bienvenidas. Siéntete libre de abrir issues o pull requests para mejorar este proyecto.

## Contacto

Para cualquier consulta o colaboración, puedes contactar al autor a través de:

- GitHub: [EduardoHernandezGuzman](https://github.com/EduardoHernandezGuzman)
