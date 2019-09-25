# Hands-on Blockchain - UCU

En este repositorio encontrará los pasos para el Hands-on de Blockchain! Podremos llevar a la práctica varios de los conceptos que vimos en la introducción teorica al comienzo del hands-on.


<p align="center">
  <img src="assets/images/IBP-logo.jpg" width="300">
</p>

## Prerrequisitos

Estos prerrequisitos deben ser cumplidos antes del hands-on, durante el mismo no dedicaremos tiempo a la instalación y configuración del software. 

  ### 1 - Visual Studio Code

  Utilizaremos Visual Studio Code como nuestro editor de código y además, instalaremos allí la extensión de IBM Blockchain para generar nuestro smart contract (chaincode) y configurar y desplegar nuestra red a través de una interfaz gráfica. 

  Link de descarga [aqui](https://code.visualstudio.com/Download)

  ### 2 - IBM Blockchain Platform - Extención para VS Code 

  Una vez que tengamos instalado Visual Studio Code, descargaremos la extensión IBM Blockchain Platform. Para descargarla, debemos dirigirnos a la pestaña "extensiones" en el menú lateral izquierdo de Visual Studio Code, y luego en el buscado escribir "IBM Blockchain Platform". Por ultimo abrimos la primera opción y hacemos clic en *install*.

  <p align="center">
    <img src="assets/images/IBP-vscode.png" width="750">
  </p>


  ### 3 - Nodejs y NPM 

  Descarguemos Nodejs y NPM desde [aqui](https://nodejs.org/es/download/)

  ### 4 - Docker y Docker-Compose

  Hyperledger Fabric local funciona gracias a que se despliega dentro de contenedores Docker y es orquestada usando Docker compose. Por esto es necesario tener ambos instalados.

  * 1 - Docker: Desde [Aquí](https://docs.docker.com/install/) pueden instalar Docker.
  * 2 - Docker Compose: [Aquí](https://docs.docker.com/compose/install/) la documentación con los pasos para instalar Docker Compose. 


## Introducción 


En este hands-on  comprenderemos las bases de una red blockchain y los componentes que la integran, veremos cómo funciona y cuales son las ventajas de IBM Blockchain Platform y llevaremos a cabo 3 laboratorios: 
* Generar una red simple usando Hyperledger Fabric local e IBP.
* Desplegar localmente una red de blockchain para un programa de fidelización de clientes.
* Utilizar IBP en la nube para desplegar una red de blockchain para simular una plataforma electoral de votación electrónica para las elecciones nacionales de octubre.




## ¿Que es Blockchain? 


Blockchain es una base de datos distribuída que funciona como un "ledger" (libro contable en inglés), en el cual se registran todas las transacciones que los miembros de la red ejecutan entre si. En Blockchain todos los miembros cuentan con una copia de los datos.
Los participantes de la red son los que gobiernan y acuerdan los cambios a registrar a través de un mecanismo de consenso. No hay terceros involucrados, todo es entre peers.

<p align="center">
  <img src="assets/images/blockchain1.png" width="350">
</p>


### Smart Contract 

Un Smart Contract es la manera digital de representar los contratos por los que se rigen las transacciones de la red. A la hora de realizar una transacción en una red de blockchain, se realiza una petición al Smart Contract y este es el que se encarga de la modificación del ledger. 
La lógica del Smart Contract se puede escribir en varios lenguajes de programación y se trabaja de una forma muy similar a POO (programación orientada a objetos), llevaremos esto a la práctica en el lab1 donde generamos nuestro primero smart contract. En el caso de HyperLedger Fabric, el código resultante se le denomina chaincode. El chaincode es el código que define los activos en la red de negocios y las instrucciones de las transacciones que modifican los mismos.


*Nota:* **Activo (Asset)**: Es cualquier cosa que podemos apropiar o controlar y que nos genera valor.


### Channel

Un canal es una subnet privada de comunicación entre dos o más miembros de la red. Cada transacción en la red se ejecuta sobre un canal, dónde cada participante debe estar autenticado y autorizado para ejecutar la misma.


### Hyperledger Fabric 


Hyperledger Fabric es una implementación open source de un ledger distribuido **permisionado**. El ledger distribuido es una base de datos distribuída que es replicada y sincronizada con los participantes de la red en la que se registran las transacciones entre los participantes. 


Hyperledger es un esfuerzo open-source y colaborativo de la Linux Foundation que tiene como objetivo avanzar las tecnologías blockchain en las distintas ramas de las industrias. Fue fundado en 2015 por treinta empresas, dentro de las cuales se encuentra IBM, quien aportó el proyecto OpenBlockcahin el cual brindó conocimiento para Hyperledger Fabric. Actualmente Hyperledger Fabric es uno de los proyectos de Hyperledger más conocidos,con más de 120 empresas que lo apoyan siendo una de ellas IBM como premier sponsor y un contribuyente de código. 


**A lo largo del hands-on iremos aprendiendo nuevos conceptos y reforzando algunos de los vistos**

## Lab 1

### Objectivos 

* Crear un nuevo proyecto
* Generar un smart contract
* Ejecutar Hyperledger Fabric local (preconfigurado)
* Desplegar el smart contract en _local_fabric_
* Realizar transacciones con el smart contrar 

### Crear un nuevo proyecto

La extensión de IBP puede generar un esqueleto de smart contract en alguno de los lenguaje de programación compatible con Hyperledger Fabric. Con esto podremos comenzar nuestro smart contract utilizando una base y no un documento en blanco!!

1. En la barra lateral izquierda, haga clic en el icono __IBM Blockchain Platform__ (se ve como un cuadrado, y probablemente estará en la parte inferior del conjunto de iconos si esta fue la última extensión que instaló).

2. Pase el mouse sobre el panel 'Smart Contracts', haga clic en el menú '...' y seleccione 'Create New Project' en el menú desplegable.

3. Elija un lenguaje del smart contract. JavaScript, TypeScript, Java y Go son los disponibles. A los efectos de este tutorial, elija `TypeScript`.

4. La extensión le preguntará si desea nombrar el assets en el contrato generado. Esto se configurará de manera predeterminada en `MyAsset`, pero puede utilizar el que quiera, yo lo llamare **Diamond** ya que quiero una red para la trazabilidad de diamantes. 

5. Elija una ubicación para guardar el proyecto. Haga clic en `Examinar`, luego haga clic en` Nueva carpeta` y asigne al proyecto el nombre que desee, yo usare `demo_codeday`.

6. Haga clic en `Crear` y luego seleccione la nueva carpeta que acaba de crear y haga clic en` Guardar`.

7. Finalmente, seleccione `Add to workspace`.

La extensión le generará un contrato basado en el idioma seleccionado y el nombre del asset (activo). Una vez hecho esto, puede ir a la pestaña __Explorer__ (muy probablemente el ícono superior en la barra lateral izquierda, que parece un ícono de "documento") y abrir el archivo `src / my-asset-contract.ts` para ver la estructura de código de contrato inteligente. 

### Exploremos el smart contract generado

La plantilla de código del smartcontract generado proporciona un buen ejemplo de algunas operaciones comunes para interactuar con datos en un ledger de blockchain. 
Observe las líneas que comienzan con `@Transaction`: estas son funciones que definen las transacciones de su contrato, es decir, las cosas que le permite hacer para interactuar con el ledger.

Veamos la función` createDiamond`:

```
@Transaction()
    public async createDiamond(ctx: Context,DiamondId: string, value: string): Promise<void> {
        const exists = await this.myAssetExists(ctx, DiamondId);
        if (exists) {
            throw new Error(`The my asset ${DiamondId} already exists`);
        }
        const Diamond = new Diamond();
        Diamond.value = value;
        const buffer = Buffer.from(JSON.stringify(Diamond));
        await ctx.stub.putState(DiamondId, buffer);
    }
```

Los corchetes vacíos en `@Transaction ()` indican que esta función está destinada a cambiar el contenido del ledger.La función se llama `createDiamonds` y toma` DiamondsId` y un `value`, los cuales son string. Cuando se envíe esta transacción, se creará un nuevo activo, con la clave `DiamondsId` y el valor` value`. Por ejemplo, si tuviéramos que crear "001", "Diamond x", entonces, cuando luego leamos el valor de la clave `001`, aprenderemos que el valor de ese estado particular es` Diamond x`.

Ahora, veamos la próxima transacción:

```

    @Transaction(false)
    @Returns('Diamond')
    public async readDiamond(ctx: Context, DiamondId: string): Promise<Diamond> {
        const exists = await this.DiamondExists(ctx, DiamondId);
        if (!exists) {
            throw new Error(`The my asset ${DiamondId} does not exist`);
        }
        const buffer = await ctx.stub.getState(DiamondId);
        const Diamond = JSON.parse(buffer.toString()) as Diamond;
        return Diamond;
    }

```
Esta funcion comienza con `@Transaction (false)` - el "falso" significa que esta función no está destinada a cambiar el contenido del ledger. Como puede ver, esta función solo toma `DiamondId`, y devuelve el valor del estado al que apunta la clave.

### Empaquetar el Smart Contract

Ahora que tenemos creado nuestro contrato inteligente y conocemos las transacciones en él, podemos proceder a empaquetarlo. Los proyectos de smart contract se empaquetan en archivos `.CDS`, un tipo especial de archivo que se puede instalar en los peers de Hyperledger Fabric.

1. En la barra lateral izquierda, haga clic en el icono __IBM Blockchain Platform__.

2. Pase el mouse sobre el panel 'Smart Contracts', haga clic en el menú '...' y seleccione 'Package Open Project' en el menú desplegable.

3. Veremos un nuevo paquete en la lista, `demo_codeday @ 0.0.1` (o el nombre que le a la carpeta).

El paquete que acabamos de crear se puede instalar en cualquier peer de Hyperledger Fabric. Por ejemplo, puede hacer clic con el botón derecho y elegir "Exportar paquete", luego implementarlo en un entorno de nube utilizando la consola de herramientas operativas de IBM Blockchain Platform. Nosotros no vamos a exportarlos porque desplegaremos la red localmente en el runtime que viene preconfigurado con la extensión VS Code.

### Operaciones locales

El panel `Local Fabric OPS` (en la vista de IBM Blockchain Platform) le permite ejecutar un runtime simple de Hyperledger Fabric usando Docker en su máquina local. Inicialmente veremos que dice:

```
Local Fabric runtime is stopped. Click to start.
```
Haga clic en ese mensaje y la extensión comenzará a ejecutar contenedores Docker. Aparecerá el mensaje "Se está iniciando el tiempo de ejecución de Local Fabric ...", y cuando la tarea est.é completa, verá un conjunto de secciones expandibles etiquetadas como `Smart Contracts`,` Channels`, `Nodes` y `Organizations.`.

No entraremos en demasiados detalles en este tutorial, pero aquí hay algunos datos útiles para saber:

* La sección 'Smart Contracts' muestra los contratos 'Instanciados' e 'Instalados' en esta red. Los siguientes pasos en este hans-on seran __instalar__  y luego __instanciar__ el smart contract que hemos empaquetado.

* En `channels` hay un solo canal llamado` mychannel`. Para poder utilizar un smart contract, debe estar __instanciado__ en un canal. Esto lo veremos en el siguiente paso. 

* La sección `Nodes` contiene un solo   "peer"(` peer0.org1.example.com`). La denominación sigue las convenciones de Hyperledger Fabric, y podemos ver en la parte "org1" que este par es propiedad de `Org1`. 

* También hay una sola Autoridad de certificación (CA) `ca.org1.example.com`, y un solo nodo de orden` orderer.example.com`. 

* Hay una sola organización en esta sencilla red de blockchain llamada `Org1`. Recuerde que `Org1` posee el par que vimos en la sección` Nodos`. Una red con una sola organización no es muy realista para el uso en el mundo real, ya que el objetivo es compartir un libro de contabilidad entre varias organizaciones, ¡pero es suficiente para fines de desarrollo local! En `Organizaciones` verá` Org1MSP`: esta es la `ID de MSP` de Org1. 

* Los siguientes contenedores de docker se inician en su máquina local: Orderer, Certificate Authority, CouchDB y Peer.

Ahora que ha iniciado el runtime de Fabric local, es hora de instalar e instanciar su smart contract!

### Instalar el smart contract

En una red real, cada una de las organizaciones que respaldarán transacciones instalarán el smart contract en sus peers, luego el contrato se instanciará en el canal. Nuestro runtime local básico de Fabric solo tiene una única organización (`Org1`) con un solo par (` peer0.org1.example.com`) y un solo canal (`mychannel`).
Por lo tanto, solo tenemos que instalar el contrato en ese único peer, luego podremos instanciarlo en `mychannel`.

1. En el panel `Local Fabric OPS`, busque` + Install` (está debajo de Smart Contracts> Installed) y haga clic en él.

2. Se le pedirá que elija un paquete para instalar. Elija `demo_codeday@0.0.1`.

Debería ver "demo_codeday@0.0.1" en la lista de Smart Contracts> Installed.

### Instanciar el smart contract

Los smart contracts instalados aún no están listos para ser invocados por las aplicaciones del cliente: necesitamos una instancia compartida del contrato que todas las organizaciones de la red puedan usar. ¡En nuestra red de desarrollo local simplificada con una sola organización, este es un punto discutible! Sin embargo cuando tenemos varias organizaciones, deben __instalar__ el mismo contrato en sus respectivos __peers__.

1. En el panel `Local Fabric OPS`, busque` + Instantiate` (está en Smart Contracts> Instantiate) y haga clic en él.

2. Se le pedirá que elija un contrato inteligente para crear una instancia. Elija `demo_codeday@0.0.1`.

3. Se le preguntará a qué función llamar. Si desea utilizar una función específica como parte de su instancia, puede ingresarlo aquí.En nuestro caso solo presione 'Enter' para omitir este paso.

4. Se le preguntará si desea proporcionar un archivo de configuración de datos privados. Para este tutorial simplemente haga clic en `No`.

La creación de instancias puede demorar un poco más que la instalación. Luego `demo_codeday@0.0.1` aparecera en la lista de contratos inteligentes > Instantiare.

### Realizar operaciones en nuestra red

Los Fabric Gateway son conexiones a peers que participan en las redes de Hyperledger Fabric, que pueden ser utilizadas por las aplicaciones del cliente para enviar transacciones. Cuando inició el runtime local en `Local Fabric  OPS`, también se creó automáticamente un gateway. Lo encontrará debajo de `Fabric Gateways`, y se llama` local_fabric`.

Para _usar_ un gateway es necesaria una identidad válida para realizar transacciones en la red. Como en otros casos, para el runtime de Local Fabric, esto ya esta configurado automaticamente. Observe que debajo de `Fabric Wallets` hay una billetera llamada` local_fabric_wallet `, que contiene una ID llamada` admin`. Si pasa el mouse sobre `local_fabric` en el panel` Fabric Gateways`, verá que dice "Associated wallet: local_fabric_wallet".

Entonces, tenemos un gateway y una wallet asociada con una sola identidad, por lo tanto podemos hacer uso del gateway!

1. Haga clic en `local_fabric` (en`Fabric Gateways`) para conectarse a través de este gateway. Ahora verá`Connected via gateway: local_fabric, Using ID: admin` y una sección contraída llamada` Channels`.

2. Expanda `Channels`, luego expanda` mychannel` y `demo_codeday@0.0.1`. Verá una lista de todas las transacciones que se definieron en el smart contract.

3. Primero, crearemos un assets. Haga clic derecho en createMyAsset y seleccione `Submit Transaction`. Se le pedirá que proporcione argumentos para la transacción: Ejemplo `[" 001 ","Refractive index: from 2,417 to 2,419 (monorefringent)"]` (o cualquier clave y valor que desee).

4. Luego se le pedirá que configure los datos transitorios para la transacción. No configuremos ninguno, solo precionemos Enter par omitirlo.

5. Ahora, seleccionemos updateMyAsset. Esta vez, para los argumento proporcione la misma clave y un valor diferente, por ejemplo`[" 001 ","Refractive index: 2,50 "]`. Entonces, ahora el valor de la clave 001 en nuestro ledger debería ser "Refractive index: 2,50". Vamos a comprobar eso en el siguiente paso

6. Usemos ahora `readMyAsset` para leer en vez de escribir el ledger, por lo que esta vez seleccionaremos` Evaluete transacción`. Ingrese `[" 001 "]` (o la clave que haya establecido al crear su assets) como argumento. Debería ver lo siguiente en la consola de salida:
```
[SUCCESS] Returned value from readDiamond: {"value":"Refractive index: from 2,417 to 2,419 (monorefringent)"}
```


Hasta aqui el Lab1, hemos creado nuestro propio smart contract y generado nuestra propia red de Blockchain local!

## Lab 2


En el lab anterior generamos nuestra red de Blockchain partiendo desde cero, ahora lo que haremos será generar un smart contract a partir de un código ya elaborado y más complejo.


En la carpeta *code* de este repositorio encontrara dos carpetas, *web-app* y *contract*. Dentro de la primera se encuentra una estructura de front-end y otra de back-end para poder operar nuestra red utilizando una webapp. Dentro de la segunda carpeta, *contract*, se encuentra el código para generar nuestro smartcontrar. 


### Caso de aplicación


Los programas de fidelización de clientes permiten a las empresas recompensar a los clientes que realizan compras con frecuencia. Los miembros del programa ganan puntos en compras, que se traducen en algún tipo de recompensa, como un descuento, un obsequio,etc. Los miembros trabajan para obtener una cierta cantidad de puntos para canjear recompensas. Estos programas pueden tener múltiples empresas como partners para atender a una base de clientes. Sin embargo, los sistemas actuales del programa de fidelización restringen las relaciones entre los partner y pueden dificultar la visibilidad de los miembros. Estas restricciones se pueden eliminar creando el programa de fidelización del cliente en una red blockchain. Este modelo de blockchain para un programa de fidelización de clientes mejora el valor de los puntos para los miembros del programa de fidelización y brinda un nuevo valor a los partners con transacciones confiables.


La aplicación permite a los miembros registrarse en la red para que estos creen sus cuentas. Se identifican en la red con sus números de cuenta y crean una clave de acceso, la cual utilizan para iniciar sesión. Esta clave de acceso se utiliza como ID de tarjeta para realizar transacciones y consultar registros. Un miembro, una vez que haya iniciado sesión, puede realizar transacciones para ganar y canjear puntos de los socios en la red. Pueden ver sus transacciones como parte del ledger de blockchain. 


De manera similar para los partner, se registran creando su id en la red y obtienen claves de acceso para ver sus registros. Los socios pueden ver solo las transacciones de las que formaron parte y así puedan realizar un seguimiento de todas sus transacciones donde asignaron o canjearon puntos.


### Flujo




<p align="center">
  <img src="assets/images/flow-2.png" width="750">
</p>


### Objetivos


* Empaquetar el Smart Contract
* Configurar la red local y desplegar el Smart Contract
* Correr la aplicación


### Empaquetar el Smart Contract


Ingresamos Visual Studio Code y abrimos la carpeta **contract** que se encuentra en el directorio _code/lab2_.


Una vez que tenemos abierta la carpeta, haga clic en el icono **IBM Blockchain Platform** en la barra lateral izquierda. 


En la sección de _Smart Contracts_ presionamos el botón con tres puntos para obtener opciones. Luego, seleccionamos **Package Open Project**.\
Se creará un nuevo Smart Contract bajo el nombre de _customerloyalty@1.0.0_.\
Ahora que tenemos ese recurso, hacemos click derecho sobre el mismo y seleccionamos la opción **Export Package**. Elegimos el directorio de nuestra preferencia y exportamos el contrato. (Importante acordarse de este directorio, ya que se utilizará luego)


### Configurar la red local y desplegar el Smart Contract


Para poder configurar la red local, hacemos click en el botón con tres puntos en la sección _Local Fabric Ops_ y seleccionamos la opción **Start Fabric Runtime**. Cuando termine de correr, podremos ver diferentes elementos en la sección. Dentro de la misma, hacemos click en el botón **+ Install**, que se encuentra dentro de _Local Fabric Ops >> Smart Contracts >> Installed_, y seleccionamos el contrato **customerloyalty@1.0.0**.\
Luego, hacemos click en el botón **+ Instantiate**, que se encuentra dentro de _Local Fabric Ops >> Smart Contracts >> Instantiated_, y seleccionamos el contrato **customerloyalty@1.0.0**. Ingresamos como nombre _instantiate_ como función y presionamos **Enter**. Estos pasos instalarán e instanciarán el Smart Contract dentro de nuestra red.


### Correr la aplicación


Ahora que tenemos el Smart Contract desplegado en nuestra red, lo único que falta es correr la aplicación.\
Abrimos un terminal nueva y nos movemos hasta la carpeta web-app, que se encuentra en _code/lab2_. Luego ejecutamos el siguiente comando para instalar las dependencias:


```
npm install
```


Luego, en la misma terminal, ejecutamos el archivo enrollAdmin.js que nos permite acceder con nuestras credenciales a la red:


```
node enrollAdmin.js
```


Nos tendría que aparecer el mensaje: _msg: Successfully enrolled admin user admin and imported it into the wallet_.\
Por último, para correr la aplicación ejecutamos:


```
npm start
```


La aplicación quedará corriendo en [http://localhost:8000](http://localhost:8000)




## Lab 3


<p align="center">
  <img src="assets/images/lab3-1.png" width="650">
</p>




En esta ultima oportunidad lo que haremos sera simular una plataforma de voto electrónico para las elecciones nacionales de octubre. Para generar la red usamos IBM Blockchain Platform en la nube y luego desde cada pc se podrá acceder a la red por medio de una webapp (*/code/lab3*) que ya contiene la configuración y las credenciales para dicha conexión. Esto permitirá que cada uno pueda usar la app para registrarse como votante, emitir votos, ver las transacciones de otros usuarios y los resultados de la votación.


### Flujo


<p align="center">
  <img src="assets/images/flow-3.png" width="600">
</p>


### IBP 


-----


### Ejecutar la aplicación


Tenemos que ejecutar el backend y el frontend por separado, por lo tanto abarcamos dos terminales, en la primera vayamos a la carpeta  */code/lab3/server* e instalamos las librerías de node:


```
npm install
```


Luego ejecutamos el archivo *enrollAdmin.js* para conectarnos en la red. Este archivo ya cuenta con las credenciales para acceder a la red:


```
node enrollAdmin.js
```


Deberemos de recibir un mensaje como el siguiente:


```
msg: Successfully enrolled admin user app-admin and imported it into the wallet
```


Ahora podemos iniciar el servidor:


```
npm start
```


En la otra terminal (y sin cerrar esta), vayamos a la carpeta */code/lab3/client*


Alli ejecutamos:


```
npm install
```
 Y luego :


 ```
npm run serve
 ```


 Ya podemos ingresar a [https://localhost:8080](https://localhost:8080) para acceder a la plataforma de votación electrónica. 


 ### Registrarse en la red


 Primero, necesitamos registrarnos como votantes y crear nuestro id con el cual enviaremos nuestro voto. Para hacer esto, necesitaremos ingresar un ID único (cedula de identidad) junto con nuestra credencial y nuestros nombres y apellidos (Para el propósito de esta demo cualquier valor ingresado es valido).


Si todo va bien, debería ver 
```
voter with voterId {} is updated in the world state. Use voterId to login above. 
```
**Nota:** en el primer intento, la aplicación puede tardar un segundo en iniciarse. Si hace clic en registrase y no sucede nada, vuelva a intentar completar el formulario y haga clic en registrarse nuevamente.


Note ahora que dentro de */code/lab3/server/* tendrá una carpeta nueva llamada *wallet* donde allí se almacenan las credenciales de su billetera, debería tener la de admin y también la del usuario que acaba de registrar. Esto significa que el usuario está registrado en la red y que solo usted puede acceder a emitir un voto ya que es quien posee las credenciales del mismo. En caso que le envié esas credenciales a alguien y esta persona las coloque en su *wallet*, esta persona podrá acceder a la plataforma con su usuario. 


### Realizar un voto


A continuación, podemos iniciar sesión en la aplicación con nuestra cédula de identidad. 


Una vez que iniciamos sesión, podemos emitir nuestro voto. Utilizaremos nuestro cedula de votacion como id para emitir nuestro voto. Como estamos votando por las elecciones presidenciales para octubre de 2019, podemos elegir el candidato que querramos. Una vez que hayamos terminado, podemos hacer clic en *votar*, y luego se emite nuestro voto. 


### Ver resultados y Transacciones


En la pestaña *Resultados* podemos consultar por el total de los votos obtenidos por cada candidato. Desde la pestaña *Ver Transacciones* Podemos ver todas las las transacciones de que realizaron cambios en nuestro ledger. 






