document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DATA STRUCTURE ---
    const courseData = [
        {
            module: 1,
            title: "Fundamentos de Direccionamiento",
            summary: "Introduce los sistemas numéricos usados en redes (binario, hexadecimal), la diferencia fundamental entre direcciones físicas (MAC) y lógicas (IP), y la estructura básica de las direcciones IPv4 e IPv6.",
            questions: [
                { type: "short_answer", text: "Escriba en binario el siguiente hexteto 2AF7?", answer: "0010101011110111", justification: "Cada dígito hexadecimal se representa con 4 bits: 2=0010, A=1010, F=1111, 7=0111." },
                { type: "true_false", text: "El protocolo ARP hace las conversiones de direcciones físicas a IP?", answer: "falso", justification: "ARP (Address Resolution Protocol) hace lo contrario: convierte direcciones IP a direcciones físicas (MAC)." },
                { type: "short_answer", text: "Determine la ID de la interfaz de la siguiente dirección IPv6 2AF::1/64, escríbala de forma completa?", answer: "0000:0000:0000:0001", justification: "La ID de interfaz es la parte final de la dirección. En este caso, '::1' se expande a ceros hasta el último bloque, que es 1." },
                { type: "true_false", text: "Una dirección MAC tiene 48 bytes?", answer: "falso", justification: "Una dirección MAC tiene 48 bits (6 bytes), no 48 bytes." },
                { type: "short_answer", text: "¿Cuántos hextetos tiene una dirección IPv6?", answer: "8", justification: "Una dirección IPv6 se compone de 128 bits, divididos en 8 hextetos (grupos de 16 bits)." },
                { type: "short_answer", text: "De la siguiente dirección IPv6 determine el prefijo de red 2AF2:58::2AF3:8:1/48 y escríbala completa?", answer: "2af2:0058:0000", justification: "Un prefijo /48 significa que los primeros 48 bits (3 hextetos) corresponden a la red. El resto se hace cero." },
                { type: "short_answer", text: "En RARP, direcciones MAC, direcciones IP, se almacenan en un servidor?", answer: "verdadero", justification: "RARP (Reverse ARP) permite a un host descubrir su propia dirección IP consultando a un servidor con su dirección MAC." },
                { type: "short_answer", text: "¿Qué direccionamiento trabaja la trama LLC?", answer: "logico", justification: "La subcapa LLC (Logical Link Control) se ocupa del direccionamiento lógico para identificar protocolos de capa superior." },
                { type: "short_answer", text: "¿Cuántos bits define el prefijo de Red en una IPv6?", answer: "64", justification: "Por estándar, los primeros 64 bits de una dirección IPv6 se usan para el prefijo de red y los últimos 64 para la ID de interfaz." },
                { type: "short_answer", text: "¿IPv6 en la ID de la interfaz cuántos bits posee?", answer: "64", justification: "La ID de Interfaz en IPv6 siempre posee 64 bits, permitiendo un espacio de direcciones de host masivo." },
                { type: "ip_address", text: "¿Escriba de forma extendida la siguiente dirección IP FE80::A:B0B:C:123?", answer: "fe80:0000:0000:0000:000a:0b0b:000c:0123", justification: "El '::' expande todos los grupos de ceros necesarios entre FE80 y el resto de la dirección." },
                { type: "ip_address", text: "Escriba en forma reducida la dirección de loopback en IPv6 (incluida la máscara):", answer: "::1/128", justification: "La dirección de loopback 0:0:0:0:0:0:0:1 se abrevia como ::1. La máscara /128 indica que es una única dirección." },
                { type: "true_false", text: "En una dirección MAC, ¿la dirección de broadcast es 255.255.255.255?", answer: "falso", justification: "La dirección de broadcast MAC es FF:FF:FF:FF:FF:FF. La dirección 255.255.255.255 es un broadcast de capa de Red (IP)." },
                { type: "true_false", text: "¿La trama de la subcapa MAC se encapsula en una subcapa LLC?", answer: "falso", justification: "Es al revés. La información de la subcapa LLC es encapsulada por la cabecera y tráiler de la subcapa MAC." }
            ]
        },
        {
            module: 2,
            title: "Subnetting y Redes IP",
            summary: "Este módulo se centra en la técnica de subnetting para dividir redes grandes en subredes más manejables, optimizando el espacio de direcciones IP. Se cubren máscaras, rangos, hosts y broadcasts.",
            questions: [
                { type: "ip_address", text: "De la siguiente dirección IP de red, obtenga 7 sub redes 120.0.0.0/16 y señale la sub red 3 y la mascara?", answer: "120.0.96.0;255.255.224.0", justification: "Para 7 subredes se necesitan 3 bits (2^3=8). La máscara se convierte en /19 (255.255.224.0). La tercera subred es 120.0.(32*2).0 = 120.0.96.0." },
                { type: "short_answer", text: "Un host tiene la siguiente dirección IP 18.1.45.5 y mascara 255.255.224.0, determine cuántos bits se utilizan para red y cuantos para host?", answer: "19;13", justification: "La máscara 255.255.224.0 en binario tiene 19 unos (bits de red) y por lo tanto 13 ceros (32-19=13 bits de host)." },
                { type: "ip_address", text: "Una clase C maneja redes privadas, determine la quinta red privada de esta clase?", answer: "192.168.4.0", justification: "Las redes privadas clase C van de 192.168.0.0 a 192.168.255.0. La quinta red es 192.168.4.0 (empezando desde la cero)." },
                { type: "short_answer", text: "¿Se tiene una máscara fija para varias subredes de distintos bits, /22, cuántas direcciones IP maneja cada subred?", answer: "1022", justification: "Una máscara /22 deja 10 bits para hosts (32-22=10). El número de hosts es 2^10 - 2 = 1024 - 2 = 1022 (se restan la dirección de red y de broadcast)." },
                { type: "ip_address", text: "A partir de la dirección 10.12.0.0/12, determine broadcast y la máscara?", answer: "10.15.255.255;255.240.0.0", justification: "Una máscara /12 deja 20 bits para host. El broadcast se calcula poniendo todos los bits de host en 1. La máscara /12 es 255.240.0.0." },
                { type: "ip_address", text: "Determine el rango y la máscara de la siguiente dirección: 50.80.31.32/18", answer: "50.80.0.0;50.80.63.255;255.255.192.0", justification: "Una máscara /18 es 255.255.192.0. El rango de red va desde 50.80.0.0 hasta 50.80.63.255." },
                { type: "short_answer", text: "Una dirección con máscara /28, ¿cuántos hosts posee?", answer: "14", justification: "Una máscara /28 deja 4 bits para hosts (32-28=4). El número de hosts es 2^4 - 2 = 16 - 2 = 14." },
                { type: "short_answer", text: "Si en una red clase B se asignan 5 bits para subred, indique la cantidad de host por subred que se obtendría", answer: "2046", justification: "Una red clase B tiene 16 bits de host. Si se usan 5 para subred, quedan 11 para hosts (16-5=11). Hosts = 2^11 - 2 = 2048 - 2 = 2046." },
                { type: "short_answer", text: "¿Cuál es la máscara en decimal de /17?", answer: "255.255.128.0", justification: "Una máscara /17 significa 17 bits en 1, lo que corresponde a 255.255.128.0." },
                { type: "short_answer", text: "Si se tiene una máscara de /20 que inicialmente era de clase B, ¿cuántas Dir IP tiene?", answer: "4094", justification: "Una máscara /20 deja 12 bits para hosts (32-20=12). El número de direcciones totales es 2^12 = 4096. Se le restan 2 (red y broadcast) para hosts usables." },
                { type: "ip_address", text: "Dada la dirección de broadcast 10.20.30.20/27, ¿cuál es su dirección de broadcast y máscara?", answer: "10.20.30.31;255.255.255.224", justification: "La pregunta parece tener un error. Si 10.20.30.20/27 es la dirección de red, el broadcast es 10.20.30.31 y la máscara /27 es 255.255.255.224." },
                { type: "short_answer", text: "¿Cuál es la máscara de red de 13 bits?", answer: "255.248.0.0", justification: "Una máscara de 13 bits en 1 corresponde a 255.248.0.0." },
                { type: "ip_address", text: "Dada la dirección IP de red 120.0.0.16/16, obtenga 7 subredes. ¿Cuál es la tercera subred y su máscara?", answer: "120.0.96.0;255.255.224.0", justification: "Es la misma pregunta #2. Se necesitan 3 bits para 7 subredes (2^3=8). Máscara /19. Tercera subred: 120.0.(32*2).0 -> 120.0.96.0." },
                { type: "short_answer", text: "Para la subred 20.20.0.0/16, ¿a cuántas subredes pertenece?", answer: "256", justification: "Una subred /16 dentro de una red más grande (ej. /8) pertenece a un grupo de 2^(16-8) = 2^8 = 256 subredes." }
            ]
        },
        {
            module: 3,
            title: "Protocolos de Red",
            summary: "Explora el funcionamiento de protocolos clave como ARP, SMTP, DHCP, y protocolos de enrutamiento (Vector Distancia, Estado del Enlace, RIP, EIGRP, OSPF) que gestionan la comunicación en la red.",
            questions: [
                { type: "true_false", text: "Los protocolos de enrutamiento dinámico facilitan el intercambio de información de enrutamiento entre redes?", answer: "falso", justification: "Los protocolos de enrutamiento dinámico facilitan el intercambio de información de enrutamiento entre ROUTERS, no entre redes como concepto abstracto." },
                { type: "short_answer", text: "El protocolo que utiliza el usuario para llegar del medio a su servidor de correo es?", answer: "smtp", justification: "SMTP (Simple Mail Transfer Protocol) es el protocolo estándar para el envío de correo electrónico." },
                { type: "true_false", text: "Los protocolos vector distancia se caracterizan por ser periódicos con el intercambio de información de enrutamiento?", answer: "verdadero", justification: "Los protocolos de vector distancia, como RIP, envían actualizaciones de enrutamiento completas a intervalos periódicos." },
                { type: "true_false", text: "El protocolo IP es un protocolo de enrutamiento?", answer: "falso", justification: "IP (Internet Protocol) es un protocolo enrutable, pero no de enrutamiento. Los protocolos de enrutamiento (RIP, OSPF) deciden la ruta que los paquetes IP tomarán." },
                { type: "true_false", text: "¿Solo los protocolos vector distancia generan un trigger update cuando hay un cambio de topología?", answer: "falso", justification: "Tanto los protocolos de vector distancia como los de estado de enlace pueden generar actualizaciones por eventos (triggered updates) cuando detectan un cambio." },
                { type: "true_false", text: "El protocolo DHCP se utiliza para facilitar que todo dispositivo de red obtenga dinámicamente una dirección IP y pueda tener acceso a la red?", answer: "verdadero", justification: "DHCP (Dynamic Host Configuration Protocol) automatiza la asignación de direcciones IP y otros parámetros de red." },
                { type: "true_false", text: "Los protocolos vector distancia se caracterizan por conocer la topología de la red mediante la dirección y la distancia por el número de saltos?", answer: "verdadero", justification: "Esta es la definición clásica de un protocolo de vector distancia: conocen la dirección y la distancia (métrica, como saltos) pero no la topología completa." },
                { type: "short_answer", text: "¿Cuáles son los puertos para FTP?", answer: "20;21", justification: "FTP (File Transfer Protocol) utiliza el puerto 21 para control y el puerto 20 para la transferencia de datos." },
                { type: "short_answer", text: "¿Qué distancia administrativa maneja RIPV2?", answer: "120", justification: "La distancia administrativa es una medida de confiabilidad. Para RIPv2, su valor por defecto es 120." },
                { type: "true_false", text: "¿El enrutamiento estático utiliza menos recursos de red?", answer: "verdadero", justification: "El enrutamiento estático no requiere intercambio de mensajes entre routers, consumiendo menos CPU, memoria y ancho de banda." },
                { type: "true_false", text: "IPv6 maneja cifrado en sus paquetes con IPsec?", answer: "verdadero", justification: "IPsec es un componente integral del estándar IPv6, aunque su uso no es obligatorio, está incorporado en el protocolo." },
                { type: "short_answer", text: "¿Cuál es el valor de distancia administrativa de una ruta estática?", answer: "1", justification: "Una ruta estática tiene una distancia administrativa de 1, haciéndola preferible a las rutas aprendidas dinámicamente (a excepción de las directamente conectadas, que es 0)." },
                { type: "true_false", text: "¿Los protocolos de estado del enlace intercambian periódicamente LSPs (Link-State Packets)?", answer: "falso", justification: "Los protocolos de estado de enlace (como OSPF) envían LSPs solo cuando ocurre un cambio en la topología, no periódicamente." },
                { type: "multiple_answer", text: "Escoja los protocolos que hay en el gateway interior principalmente (escoja 3)", answer: "ripv2;eigrp;ospf", justification: "RIPv2, EIGRP y OSPF son los protocolos de gateway interior (IGP) más comunes y representativos." }
            ]
        },
        {
            module: 4,
            title: "Modelo OSI y Arquitectura de Red",
            summary: "Aprende sobre el modelo conceptual OSI, que estandariza las funciones de una red en capas, facilitando la interoperabilidad. Se cubre el encapsulamiento, las PDUs y la arquitectura TCP/IP.",
            questions: [
                { type: "true_false", text: "La PDU de la capa de red es el paquete?", answer: "verdadero", justification: "La Unidad de Datos de Protocolo (PDU) de la Capa de Red (Capa 3) se denomina 'paquete'." },
                { type: "short_answer", text: "¿Cuáles son los procesos que se ejecutan cada vez que un paquete se conmuta desde una interfaz a otra?", answer: "encapsulamiento;desencapsulamiento", justification: "Al pasar por un router, el paquete se desencapsula hasta la capa de red y se vuelve a encapsular para la nueva interfaz de salida." },
                { type: "true_false", text: "La codificación y encriptación se ejecuta en la capa de presentación de la arquitectura TCP/IP?", answer: "falso", justification: "La arquitectura TCP/IP no tiene una capa de Presentación como el modelo OSI. Estas funciones se integran en la capa de Aplicación." },
                { type: "true_false", text: "¿Los servicios que ofrece una capa a otra los hace entre capas correspondientes?", answer: "falso", justification: "Una capa ofrece servicios a la capa inmediatamente superior, no a su capa correspondiente en otro dispositivo." },
                { type: "short_answer", text: "¿Qué capa del modelo OSI se encarga de encriptar los datos?", answer: "presentacion", justification: "La capa de Presentación (Capa 6) es responsable de la encriptación, compresión y formato de los datos." },
                { type: "true_false", text: "En la máquina origen y destino, ¿la aplicación utiliza distintos tipos de puerto?", answer: "verdadero", justification: "Sí, se usa un puerto de origen (generalmente efímero) y un puerto de destino (generalmente bien conocido) para establecer la comunicación." },
                { type: "short_answer", text: "¿De acuerdo al modelo OSI, qué capa se ocupa del establecimiento y liberación de conexiones a través de la subred?", answer: "transporte", justification: "La capa de Transporte (Capa 4) gestiona la conexión de extremo a extremo, incluyendo su establecimiento y liberación (ej. TCP)." },
                { type: "multiple_answer", text: "Señale en orden descendente las capas del modelo OSI en las que opera un router (En minúsculas separadas por punto y coma):", answer: "red;enlace;fisica", justification: "Un router opera en las capas 3 (Red), 2 (Enlace de Datos) y 1 (Física) para tomar decisiones de enrutamiento." },
                { type: "short_answer", text: "¿Qué capa del modelo OSI suministra servicios que permiten al usuario actuar en la red?", answer: "aplicacion", justification: "La capa de Aplicación (Capa 7) proporciona la interfaz y los servicios para que las aplicaciones de usuario interactúen con la red." },
                { type: "true_false", text: "¿La interfaz de cada capa ofrece el servicio a la capa superior?", answer: "falso", justification: "La capa en sí misma ofrece el servicio a la capa superior. La interfaz es solo el punto de conexión o SAP (Service Access Point)." }
            ]
        },
        {
            module: 5,
            title: "Infraestructura y Servicios de Red",
            summary: "Cubre los componentes físicos de la red, cómo se gestiona el acceso al medio (difusión, colisiones), y estrategias para garantizar un rendimiento de red eficiente y seguro como la Calidad de Servicio (QoS).",
            questions: [
                { type: "true_false", text: "Un sistema portátil de computación puede formar parte de una red LAN inalámbrica?", answer: "verdadero", justification: "Sí, es el propósito principal de tecnologías como Wi-Fi." },
                { type: "true_false", text: "Las PCs que intervienen en una red de difusión al ser susceptibles a colisión deben pasar por el algoritmo de backoff para garantizar el éxito en la transmisión?", answer: "falso", justification: "El algoritmo de backoff lo usan los dispositivos después de detectar una colisión, no antes. Es un mecanismo de recuperación." },
                { type: "true_false", text: "En las redes de difusión todos los usuarios pueden acceder a transmitir simultáneamente?", answer: "verdadero", justification: "Pueden intentar transmitir simultáneamente, pero si lo hacen, ocurrirá una colisión. Que puedan 'acceder' es verdadero, que tengan 'éxito' es improbable." },
                { type: "short_answer", text: "¿Hasta cuántas estaciones pueden meter en un cuarto de telecomunicaciones?", answer: "200", justification: "Aunque no es una regla estricta, los estándares de cableado a menudo sugieren límites prácticos para la densidad de puertos en un espacio." },
                { type: "short_answer", text: "¿Cuál es el metraje que se deja como reserva una vez que se cumplen los metros necesarios para el cableado horizontal?", answer: "10", justification: "Es una práctica común en cableado estructurado dejar un 'service loop' o bucle de servicio de varios metros para futuras reparaciones o modificaciones." },
                { type: "true_false", text: "Cuando una red prioriza el tipo de tráfico, ¿esa red qué maneja?", answer: "calidad de servicio", justification: "La priorización del tráfico (ej. voz sobre datos) es el concepto central de la Calidad de Servicio (QoS)." },
                { type: "true_false", text: "Para enviar información de un Host A a un Host B que se encuentran en redes distintas, ¿el Host A debe conocer la dirección MAC de B?", answer: "falso", justification: "El Host A solo necesita conocer la MAC de su gateway (router). El router se encargará de llevar el paquete a la red de destino." },
                { type: "true_false", text: "¿Ni servidores ni equipos de cómputo no define un cableado estructurado?", answer: "verdadero", justification: "El cableado estructurado es un sistema de infraestructura de cables y hardware que es independiente de los equipos que se conectarán a él." },
                { type: "true_false", text: "En el backbone se utilizan fibras de 8 y 11 fibras multimodo o monomodo?", answer: "falso", justification: "Los diámetros comunes para los núcleos de fibra óptica son 9 µm (monomodo) y 50 o 62.5 µm (multimodo), no 8 y 11." },
                { type: "true_false", text: "¿La selección de medio de transmisión de una red está determinada por los requerimientos del cliente?", answer: "verdadero", justification: "Sí, factores como el costo, la distancia, el ancho de banda y el entorno, dictados por el cliente, determinan el medio a usar (cobre, fibra, etc.)." },
                { type: "true_false", text: "¿Los requerimientos están dados por los estándares, porque se debe hacer un estudio?", answer: "verdadero", justification: "Los estándares definen cómo implementar una solución, pero el estudio de requerimientos del cliente define qué solución se necesita." },
                { type: "true_false", text: "¿Cuando se aplica calidad de servicio a una red se garantiza que los paquetes lleguen a tiempo y en orden correcto?", answer: "falso", justification: "QoS intenta priorizar el tráfico para que llegue a tiempo y en orden, pero no lo garantiza. La congestión extrema aún puede causar problemas." },
                { type: "true_false", text: "¿Las redes de conmutación de circuitos, a pesar de disponer de muchos circuitos, pueden denegar el servicio en hora pico?", answer: "verdadero", justification: "Sí, si todas las líneas (circuitos) están ocupadas, el sistema denegará nuevas conexiones, como en las antiguas redes telefónicas." },
                { type: "true_false", text: "¿La dirección MAC es utilizada para enviar un paquete dentro de cada red local, permitiendo que el paquete avance físicamente hacia su destino en cada salto?", answer: "verdadero", justification: "Exactamente, la dirección MAC se usa para el direccionamiento en la capa 2 en cada salto individual dentro de una red local." },
                { type: "true_false", text: "¿Una red punto a punto puede conectarse a un destino utilizando múltiples rutas?", answer: "verdadero", justification: "Sí, se pueden tener múltiples enlaces físicos o lógicos entre dos puntos para redundancia o balanceo de carga." },
                { type: "true_false", text: "¿La convergencia de los routers está establecida cuando todos tienen las mismas tablas de enrutamiento y métricas?", answer: "verdadero", justification: "La convergencia es el estado en el que todos los routers de una red tienen una visión consistente y actualizada de la topología." },
                { type: "true_false", text: "¿El modelo peer-to-peer maneja servidores independientes para descargar las aplicaciones?", answer: "falso", justification: "En un modelo peer-to-peer (P2P) puro, los propios clientes (peers) actúan como servidores, compartiendo recursos sin un servidor central." }
            ]
        }
    ];

    // --- 2. STATE MANAGEMENT ---
    let currentUserState = {
        moduleScores: {},
        currentModuleId: null,
        currentQuizAnswers: []
    };

    // --- 3. DOM ELEMENTS ---
    const globalProgress = document.getElementById('global-progress');
    const moduleSelectionContainer = document.getElementById('module-selection-container');
    const moduleViewContainer = document.getElementById('module-view-container');
    const moduleTitle = document.getElementById('module-title');
    const moduleProgress = document.getElementById('module-progress');
    const moduleSummary = document.getElementById('module-summary');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const reviewModuleBtn = document.getElementById('review-module-btn');
    const moduleIntroContainer = document.getElementById('module-intro-container');
    const quizContainer = document.getElementById('quiz-container');
    const resultsContainer = document.getElementById('results-container');
    const resultScore = document.getElementById('result-score');
    const resultMessage = document.getElementById('result-message');
    const correctAnswersContainer = document.getElementById('correct-answers-container');
    const retryModuleBtn = document.getElementById('retry-module-btn');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');

    // --- 4. CORE LOGIC ---

    function saveState() {
        localStorage.setItem('interactiveCourseState', JSON.stringify(currentUserState));
    }

    function loadState() {
        const savedState = localStorage.getItem('interactiveCourseState');
        if (savedState) {
            currentUserState = JSON.parse(savedState);
        }
    }

    function normalizeAnswer(answer) {
        if (typeof answer !== 'string') return '';
        return answer.toLowerCase().trim().normalize("NFD").replace(/[̀-ͯ]/g, "");
    }

    function renderModuleMenu() {
        moduleSelectionContainer.innerHTML = '<h2>Selecciona un Módulo</h2>';
        courseData.forEach(module => {
            const score = currentUserState.moduleScores[module.module];
            const button = document.createElement('button');
            button.innerText = `Módulo ${module.module}: ${module.title} ${score !== undefined ? `(Última nota: ${score}%)` : ''}`;
            button.dataset.moduleId = module.module;
            
            if (score !== undefined) {
                button.classList.add(score >= 70 ? 'completed-passed' : 'completed-failed');
            }

            moduleSelectionContainer.appendChild(button);
        });
        moduleSelectionContainer.classList.remove('hidden');
        moduleViewContainer.classList.add('hidden');
        updateGlobalProgress();
    }

    function updateGlobalProgress() {
        const completedModules = Object.keys(currentUserState.moduleScores).length;
        const totalModules = courseData.length;
        globalProgress.value = (completedModules / totalModules) * 100;
    }

    function selectModule(moduleId) {
        currentUserState.currentModuleId = moduleId;
        const moduleData = courseData.find(m => m.module === moduleId);

        moduleTitle.innerText = `Módulo ${moduleData.module}: ${moduleData.title}`;
        moduleSummary.innerText = moduleData.summary;

        moduleSelectionContainer.classList.add('hidden');
        moduleViewContainer.classList.remove('hidden');
        moduleIntroContainer.classList.remove('hidden');
        quizContainer.classList.add('hidden');
        resultsContainer.classList.add('hidden');
    }

    function startQuiz() {
        moduleIntroContainer.classList.add('hidden');
        quizContainer.innerHTML = '';
        quizContainer.classList.remove('hidden');
        
        const moduleData = courseData.find(m => m.module === currentUserState.currentModuleId);
        moduleData.questions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'quiz-question';
            let inputHtml = '';

            if (q.type === 'true_false') {
                inputHtml = `
                    <div class="radio-option">
                        <input type="radio" id="q${index}_true" name="q${index}" value="verdadero">
                        <label for="q${index}_true">Verdadero</label>
                    </div>
                    <div class="radio-option">
                        <input type="radio" id="q${index}_false" name="q${index}" value="falso">
                        <label for="q${index}_false">Falso</label>
                    </div>`;
            } else { // short_answer, ip_address, multiple_answer
                inputHtml = `<input type="text" id="q${index}" name="q${index}" placeholder="Escribe tu respuesta aquí">`;
            }

            questionElement.innerHTML = `
                <p><b>${index + 1}.</b> ${q.text}</p>
                ${inputHtml}
            `;
            quizContainer.appendChild(questionElement);
        });

        const submitButton = document.createElement('button');
        submitButton.innerText = 'Evaluar Respuestas';
        submitButton.id = 'submit-quiz-btn';
        quizContainer.appendChild(submitButton);
    }

    function submitQuiz() {
        const moduleData = courseData.find(m => m.module === currentUserState.currentModuleId);
        let correctCount = 0;
        currentUserState.currentQuizAnswers = [];

        moduleData.questions.forEach((q, index) => {
            const input = document.querySelector(`[name="q${index}"]:checked`) || document.getElementById(`q${index}`);
            const userAnswer = normalizeAnswer(input.value);
            
            let isCorrect = false;
            const correctAnswer = normalizeAnswer(q.answer);

            if (q.type === 'multiple_answer' || q.type === 'ip_address' && correctAnswer.includes(';')) {
                 const userParts = userAnswer.split(';').map(p => p.trim()).sort();
                 const correctParts = correctAnswer.split(';').map(p => p.trim()).sort();
                 isCorrect = JSON.stringify(userParts) === JSON.stringify(correctParts);
            } else if (q.type === 'true_false') {
                isCorrect = userAnswer.charAt(0) === correctAnswer.charAt(0);
            }
            else {
                isCorrect = userAnswer === correctAnswer;
            }

            if (isCorrect) {
                correctCount++;
            }
            currentUserState.currentQuizAnswers.push({
                userAnswer: input.value,
                isCorrect
            });
        });

        const score = Math.round((correctCount / moduleData.questions.length) * 100);
        showResults(score);
    }

    function showResults(score) {
        quizContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');

        const moduleId = currentUserState.currentModuleId;
        currentUserState.moduleScores[moduleId] = score;
        
        resultScore.innerText = `Tu Puntuación: ${score}%`;
        resultScore.className = score >= 70 ? 'correct' : 'incorrect';
        resultScore.classList.remove('hidden');

        correctAnswersContainer.innerHTML = '';
        const moduleData = courseData.find(m => m.module === moduleId);
        moduleData.questions.forEach((q, index) => {
            const answerInfo = currentUserState.currentQuizAnswers[index];
            const item = document.createElement('div');
            item.className = 'correct-answer-item';
            item.innerHTML = `
                <p>${index + 1}. ${q.text}</p>
                <p class="user-answer ${answerInfo.isCorrect ? 'correct' : 'incorrect'}">Tu respuesta: ${answerInfo.userAnswer || 'No respondida'}</p>
                <p class="correct">Respuesta correcta: ${q.answer}</p>
                <p class="justification">Justificación: ${q.justification}</p>
            `;
            correctAnswersContainer.appendChild(item);
        });

        if (score >= 70) {
            resultMessage.innerText = "¡Felicidades! Has APROBADO el módulo.";
            resultMessage.className = 'correct';
        } else {
            resultMessage.innerText = "REPROBADO. No has alcanzado el 70%. ¡Estudia las respuestas correctas y vuelve a intentarlo!";
            resultMessage.className = 'incorrect';
        }
        resultMessage.classList.remove('hidden');
        retryModuleBtn.classList.remove('hidden');

        saveState();
        updateGlobalProgress();
    }

    function showReview() {
        moduleIntroContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        resultScore.classList.add('hidden');
        resultMessage.classList.add('hidden');
        retryModuleBtn.classList.add('hidden');

        correctAnswersContainer.innerHTML = '<h3>Corrección del Módulo</h3>';
        const moduleId = currentUserState.currentModuleId;
        const moduleData = courseData.find(m => m.module === moduleId);

        moduleData.questions.forEach((q, index) => {
            const item = document.createElement('div');
            item.className = 'correct-answer-item';
            item.innerHTML = `
                <p>${index + 1}. ${q.text}</p>
                <p class="correct">Respuesta correcta: ${q.answer}</p>
                <p class="justification">Justificación: ${q.justification}</p>
            `;
            correctAnswersContainer.appendChild(item);
        });
    }

    // --- 5. EVENT LISTENERS ---
    moduleSelectionContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const moduleId = parseInt(e.target.dataset.moduleId, 10);
            selectModule(moduleId);
        }
    });

    startQuizBtn.addEventListener('click', startQuiz);
    reviewModuleBtn.addEventListener('click', showReview);

    quizContainer.addEventListener('click', (e) => {
        if (e.target.id === 'submit-quiz-btn') {
            submitQuiz();
        }
    });

    retryModuleBtn.addEventListener('click', () => {
        selectModule(currentUserState.currentModuleId);
    });

    backToMenuBtn.addEventListener('click', renderModuleMenu);

    // --- 6. INITIALIZATION ---
    function init() {
        loadState();
        renderModuleMenu();
        const nextBtn = document.getElementById('next-module-btn');
        if(nextBtn) nextBtn.parentNode.removeChild(nextBtn);
    }

    init();
});