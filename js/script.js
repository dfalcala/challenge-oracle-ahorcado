var btnIniciar = document.querySelector('#btnIniciar');
const cssBtnIniciar = document.querySelector("#botones-inicio");

const cssDivJuego = document.querySelector("#divJuego");
var btnDesistir = document.querySelector('#btnDesistir');
var btnNuevo = document.querySelector('#btnNuevo');
const entrada = document.querySelector('input');
var pantalla = document.querySelector("#canvasDibujo");
var pincel = pantalla.getContext("2d");
var areaPalabra = document.querySelector("#canvasPalabra");
var palabra = areaPalabra.getContext("2d");

var cssAgregar = document.querySelector('#agregar');
var inputAgregar = document.querySelector('#inputAgregar');
var btnGuardar = document.querySelector('#btnGuardar');
var btnCancelar = document.querySelector('#btnCancelar');

var diccionario = ["ALURA","AHORCADO","ORACLE","HTML","CSS","BASES", "DATOS", "OBJETOS",  "PERSONA",  "USUARIO",  "GRAFICAS", "EQUIPOS",  "MATRIZ",   "SISTEMA",  "LENGUAJE", "TEXTOS",   "ARCHIVO",  "VIRUS",    "PROGRAMA","APPLE", "COMPRESOR",    "FICHERO",  "ARRANQUE", "COPIAR",   "PEGAR",    "FORMATO",  "CODIGO",   "BINARIOS", "BITS", "MODEM",    "JAVA", "DIGITO",   "DECIMAL",  "OUTPUT", "ATRIBUTO"];

var palabraElegida = '';
var palabraFinal = [];
var acumulado = '';
var letrasMalas = [];
var contador = 0;
var jugar = 0;

//Recibe el bóton oprimido y lo envía a letras buenas
entrada.onkeyup = buenasKey;

//Ocultar botones de inicio */
function iniciar(){
    document.getElementById(cssBtnIniciar.classList).style.display = "none";
    document.getElementById(cssDivJuego.classList).style.display = "block";
    letrasMalas = [];
    contador = 0;
    document.getElementById("malas").innerHTML = letrasMalas
    document.getElementById("entrada").value = "";
    clearCanvas();
    seleccionarPalabra()
};
//Ocultar botones de inicio */
function desistir(){
    letrasMalas = [];
    contador = 0;
    jugar = 0;
    document.getElementById("malas").innerHTML = letrasMalas
    document.getElementById("entrada").value = "";
    document.getElementById(cssBtnIniciar.classList).style.display = "flex";
    document.getElementById(cssDivJuego.classList).style.display = "none";
};
//Nuevo Juego
function nuevo(){
    letrasMalas = [];
    contador = 0;
    jugar = 0;
    document.getElementById("malas").innerHTML = letrasMalas
    document.getElementById("entrada").value = "";
    clearCanvas();
    seleccionarPalabra()
};
//Limpiar Canvas
function clearCanvas(){
    pincel.clearRect(0,0, pantalla.width, pantalla.height);
    palabra.clearRect(0,0, areaPalabra.width, areaPalabra.height);
};
//selecciona una palabra del array
function seleccionarPalabra(){
    let indiceAleatorio = Math.floor(Math.random() * diccionario.length);
    palabraElegida = diccionario[indiceAleatorio];
    //console.log(palabraElegida);
    for(var i = 0; i < palabraElegida.length; i++){
        var x = i * (300/palabraElegida.length);
        dibujarLinea(x);
    };
    return palabraElegida;
}
//Dibuja las líneas en el canvas para las palabras
function dibujarLinea(x){
    palabra.fillStyle = "#0A3871";
    palabra.fillRect((x-7),50,30,3);
}
//Recibe los datos del botón oprimido y lo envía a buscar línea
function buenasKey(e) {
    buenas.textContent += ` ${e.key}`;
    buscarLetra(e);
    //console.log(e.key)
};
//Recibe el código de la letra, valida la letra y emite un mensaje o llama a pintar letra
function buscarLetra(codLetra){
    if(jugar == 0){
        //Obtiene el código de la letra
        var codigo = codLetra.keyCode;
        //Si el codigo es de una letra -> true
        if(codigo > 64 && codigo < 91){
            //Obtiene la letra correspondiente al código
            let letra = String.fromCharCode(codigo);
                //Si la letra se encuentra dentro de la palabra -> true
            if(palabraElegida.indexOf(letra) > -1){
                var cuenta = 0;
                var posicion = 0;
                var arrPosicion = [];
                //Mientras cuenta sea menor a la longitud de la palabra
                while (cuenta < palabraElegida.length) {
                    cuenta++;
                    //Obtenemos las posiciones de la letra en la palabra
                    posicion = palabraElegida.indexOf(letra,posicion);
                    //Si posición es menor que 1 deténgase
                    if(posicion == -1){
                        break
                    }
                    else{
                        //Obteniendo las posiciones para imprimir las letras
                        arrPosicion.push(posicion);
                        //Obteniendo una array con las letras adivinadas
                        palabraFinal[posicion] = letra;
                        //Convirtiendo a palabra las letras adivinadas
                        var texto = palabraFinal.join('');
                        console.log(texto);
                        console.log(palabraFinal);
                        posicion++
                        if(texto.length == palabraElegida.length){
                            texto = '';
                            palabraFinal = [];
                            tipo = 1;
                            pintarMensaje(tipo)
                        }
                    }
                };
                for(i = 0; i < arrPosicion.length; i++){
                    var x = arrPosicion[i] * (300/palabraElegida.length);
                    pintarLetra(letra,x)
                }
            }
            else{
                if(letrasMalas.indexOf(letra) < 0){
                    letrasMalas [contador] = letra;
                    contador++;
                    if(contador == 1){
                        pincel.fillStyle = "#0A3871";
                        pincel.fillRect(0,390,300,10);
                    }
                    if(contador == 2){
                        pincel.fillStyle = "#0A3871";
                        pincel.fillRect(60,40,10,360);
                    }
                    if(contador == 3){
                        pincel.fillStyle = "#0A3871";
                        pincel.fillRect(60,40,180,10);
                    }
                    if(contador == 4){
                        pincel.fillStyle = "#0A3871";
                        pincel.fillRect(240,40,10,50);
                    }
                    if(contador == 5){
                        pincel.strokeStyle = "#0A3871";
                        pincel.beginPath();
                        pincel.lineWidth = 8;
                        pincel.arc(243,113,23,0,Math.PI*2,true); // Círculo externo
                        pincel.stroke();
                    }
                    if(contador == 6){
                        pincel.fillStyle = "#0A3871";
                        pincel.fillRect(240,136,10,135);
                    }
                    if(contador == 7){
                        pincel.fillStyle = "#0A3871";
                        pincel.fillRect(240,136,10,135);
                    }
                    if(contador == 8){
                        pincel.beginPath();
                        pincel.moveTo(240,136);
                        pincel.quadraticCurveTo(180,170,240,202);
                        pincel.stroke();
                    }
                    if(contador == 9){
                        pincel.beginPath();
                        pincel.moveTo(247, 136);
                        pincel.quadraticCurveTo(310,170,250,202);
                        pincel.stroke();
                    }
                    if(contador == 10){
                        pincel.moveTo(243,269);
                        pincel.lineTo(203,335);
                        pincel.stroke();
                    }
                    if(contador == 11){
                        pincel.moveTo(247,269);
                        pincel.lineTo(287,335);
                        pincel.stroke();

                        /* - - Hojo I - - */
                        pincel.fillStyle = "#0A3871";
                        pincel.lineWidth = 3;
                        pincel.moveTo(225,102);
                        pincel.lineTo(240,107);
                        pincel.moveTo(224,110);
                        pincel.lineTo(240,100);
                        pincel.stroke();

                        /* - - Hojos D- - */
                        pincel.strokeStyle = "#0A3871";
                        pincel.lineWidth = 3;
                        pincel.moveTo(249,100);
                        pincel.lineTo(262,107);
                        pincel.moveTo(249,107);
                        pincel.lineTo(262,100);
                        pincel.stroke();

                        /* - - Nariz - - */
                        pincel.strokeStyle = "#0A3871";
                        pincel.fillRect(243,110,3,10);

                        /* - - Boca - - */
                        pincel.strokeStyle = "#D64070";
                        pincel.lineWidth = 3;
                        pincel.beginPath();
                        pincel.moveTo(235, 123);
                        pincel.quadraticCurveTo(245,170,255,123);
                        pincel.stroke();

                        /* - - Mensaje - - */
                        texto = '';
                        palabraFinal = [];
                        tipo = 0;
                        pintarMensaje(tipo)
                    }
                    
                    document.getElementById("malas").innerHTML = letrasMalas
                }
                else{
                    alert("Esa letra ya la había seleccionado.")
                }
            }
        }
        else{
            alert("Por favor verifique, este no es un carácter valido")
        }
    }
    else{
        alert('El juego finalizó, selecciona el botón "Nuevo Juego" o "Desistir".')
    }
}
//Pinta las letras buenas en el canvas
function pintarLetra(ltr,x) {
    var pincel = document.getElementById('canvasPalabra').getContext('2d');
    pincel.font = '30px Inter';
    pincel.fillText(ltr,x, 45);
}
//Pinta resultado en el canvas
function pintarMensaje(tipo) {
    pantalla = document.querySelector("#canvasDibujo");
    pincel = pantalla.getContext("2d");
    if(tipo == 1){
        /* - - Cuadro - - */
        pincel.fillStyle = 'rgba(0, 0, 200,0.4)';
        pincel.fillRect(0, 150, 300, 200);
    
        /* - - Mensaje - - */
        pincel.font = '30px Inter Bold';
        pincel.fillStyle = '#F64129';
        pincel.fillText('¡Ganaste',70,200);
        pincel.fillText('Felicitaciones!',70,250);
        jugar = 1;
    }
    else{
        /* - - Cuadro - - */
        pincel.fillStyle = 'rgba(200,0,0, 0.4)';
        pincel.fillRect(0, 150, 300, 200);

        /* - - Mensaje - - */
        pincel.font = '30px Inter Bold';
        pincel.fillStyle = '#0A3871';
        pincel.fillText('¡Inténtalo',70,200);
        pincel.fillText('Nuevamente!',70,250);
        jugar = 1;
    }
}
//Oculta la página de inicio y presenta la página para agregar la nueva palabra.
function agregarDiccionario(){
    document.getElementById(cssBtnIniciar.classList).style.display = "none";
    document.getElementById(cssAgregar.classList).style.display = "flex";
    document.getElementById("inputAgregar").value = "";
}
//Obtiene, valida y agrega una nueva palabra al diccionario del juego.
function guardar(){
    var nuevaPalabra = inputAgregar.value;
    nuevaPalabra = nuevaPalabra.toUpperCase();
    if(nuevaPalabra.length > 2){
        if(nuevaPalabra.length < 8){
            if(diccionario.includes(nuevaPalabra) != true){
                console.log(nuevaPalabra);
                diccionario.push(nuevaPalabra);
                alert("La palabra fue guardad en el diccionario.");
                iniciar()
            }
            else{
                alert("Esa palabra ya se encuentra en el diccionario, por favor ingrese otra.");
                document.getElementById("inputAgregar").value = "";
            }
        }
        else{
            alert("Esa palabra contiene mas de 8 caracteres, por favor modifiquela.");
        }
    }
    else{
        alert("Esa palabra contiene menos de 3 caracteres, por favor modifiquela.");
    }
}
//Oculta la página agregar la nueva palabra y presenta la página inicio.
function cancelar(){
    document.getElementById(cssBtnIniciar.classList).style.display = "flex";
    document.getElementById(cssAgregar.classList).style.display = "none";
}