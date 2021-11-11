const attr_toggle = "data-toggle";
const attr_target = "data-target";
const attr_dismiss = "data-dismiss"
const class_modal = "modal";
const class_show = "show";
const show_coments = "coments";
const color_div = "logrado";



document.addEventListener("DOMContentLoaded", function () {
	//botones que abren el modal
	let modal_open_buttons = document.querySelectorAll(`[${attr_toggle}='${class_modal}']`);

	modal_open_buttons.forEach(element => {
		element.addEventListener("click", OpenModal);
	});

	//botones que cierran el modal
	let modal_close_buttons = document.querySelectorAll(`[${attr_dismiss}]`);

	modal_close_buttons.forEach(element => {
		element.addEventListener("click", CloseModal);
	});

	//muestra todas las tareas
	let muestra_tarea = document.querySelectorAll(`[${show_coments}]`);

	muestra_tarea.forEach(element => {
		element.addEventListener("click", showTarea);
	});

	//Cambia el color de la tarea lograda
	let listo = document.querySelectorAll(`[${color_div}]`);

	listo.forEach(element => {
		element.addEventListener("click", Bagcolor);
	});

});

/**
 * Muestra un modoal
 * @param {PointerEvent} e 
 */
function OpenModal(e) {
	//Obtener el selector del elemento  a mostrar
	// console.log(e.target.getAttribute(attr_target));
	let modal_selector = e.target.getAttribute(attr_target);

	//Obtener el elemento del DOM
	let modal = document.querySelector(modal_selector);

	//Agregar la clase para mostrar el modal
	modal.classList.add(class_show);

}


/**
 * Cerrar un modoal
 * @param {PointerEvent} e 
 */
function CloseModal(e) {
	//Obtener el selector del elemento  a mostrar
	let modal_selector = e.target.getAttribute(attr_dismiss);

	//Obtener el elemento del DOM
	let modal = document.querySelector(modal_selector);

	modal.classList.remove(class_show);
}



const creaTarea = document.forms["tweetForm"];
const tareaList = document.getElementById("tweets");
const tareaKey = "tweets";

eventListener();

function eventListener() {
    //Agregar tweews
    creaTarea.addEventListener("submit", addTarea);

}


//Funciones

//Agregar un tweet
function addTarea(e) {
    //Detener el envio del formulario   
    e.preventDefault();

    //Obtener el texto del tarea   
    const tweet = creaTarea["tweet"].value;
	const tweet2 = creaTarea["tweet2"].value;
	const tweet3 = creaTarea["tweet3"].value;

    //Crear el nuevo elemento
    const newTweet = document.createElement("div");

    //Añadir estilos y contenido
    newTweet.className = "border-top";
    newTweet.innerHTML = 
        `<br><div class="row">
		  <div class="col-9"><label class="h3" for="">${tweet}</label></div>
		  <div class="col-3">${tweet3}</div>
		</div>
		<br>
		<p>${tweet2}</p>
		<div class="modal-footer">
		<input type="checkbox" name="desplega" logrado="#modal_test">
		<label for="desplega">Completada</label>
		</div>`;
    //Se añade a la lista de Tweets
    tareaList.appendChild(newTweet);
    //Crea arreglo con contenido
	var tweety = [tweet,tweet2,tweet3];

    saveTarea(tweety);
} 

//Guardar las tareas en LocalStorage
function saveTarea(tarea) {
    let tweets = getTarea();

    tweets.push(tarea);

    //Guardar en Localstorage
    localStorage.setItem(tareaKey, JSON.stringify(tweets));
}


//Obtiene los Tweet de LocalStorage
function getTarea(){
    //Obtenemos los dqatos de LocalStorage
    let tweets = localStorage.getItem(tareaKey);

    //Verificamos si ya existe al menos uno
    if(tweets === null){
        tweets = [];
    }
    else {
        tweets = JSON.parse(tweets);
    }

    return tweets;
}

/**
 * muestra los tweets guardados
 */
function showTarea() {
    // console.log("cargado");
    let tweets = getTarea();
	

    tweets.forEach(tweet  => {
		const newTweet = document.createElement("div");
        //Añadir estilos y contenido
        newTweet.className = "border-top";
        newTweet.innerHTML = 
		`<br><div class="row">
		  <div class="col-9"><label class="h3" for="">${tweet[0]}</label></div>
		  <div class="col-3"> ${tweet[2]}</div>
		</div>
		<br>
		<p> ${tweet[1]} </p>
		<div class="modal-footer">
		<input type="checkbox" name="desplega" logrado="#modal_test">
		<label for="desplega">Completada</label>
		</div>`;
        //Se añade a la lista de Tweets
		tareaList.appendChild(newTweet);

    })

}



 function Bagcolor(){
	let intro = document.getElementById('tweets');
	intro.className = 'negativo';
 }