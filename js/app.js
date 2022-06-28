// varibables 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let  tweets = [];

//event listener
eventListeners();

function eventListeners() {

    //cuando el usuario agrega un nuevo tweet 
    formulario.addEventListener('submit' , agregarTweet);

    // cuando el documento esta listo 
    document.addEventListener('DOMContentLoaded',()=> {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();

    });
}


// Funciones 
function agregarTweet(e) {
    e.preventDefault();

    //textarea donde el usuario escribe 
    const tweet = document.querySelector('#tweet').value;
    
    //validaciones
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');

        return; //evita que se ejecuten mas lineas de codigo 
    }

    const tweetObj = {
        id: Date.now(),
         tweet
    }
    //a;adir al arreglo de tweets 
    tweets = [...tweets, tweetObj];
    
    // una vez agregado vamos a crear el html 
    crearHTML();

    //reiniciar formulario 
    formulario.reset(); 
}

//mostrar mensaje error 
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error ; 
    mensajeError.classList.add('error');


    //insertarlo en el contenido 
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //elimina la alerta despues de 3 segundos 
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//muenstra un estado de los tweets '

 function crearHTML(){
    limpiarHTML();

    if (tweets.length > 0){
        tweets.forEach( tweet => {
            //agregar un boton de eliminar 

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //a;adir la funcion de eliminar 
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);

            }

            //crear el html 
            const li = document.createElement('li');

            //add el texto 
            li.innerText = tweet.tweet;

            //asiganar el boton 
            li.appendChild(btnEliminar);

            //insertarlo en el html 
            listaTweets.appendChild(li);

        })
    }

    sincornizarStorage(); 
}

//agregar los tweets actuales a localstorage 
function sincornizarStorage() { 
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

//limpiar el html 
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}