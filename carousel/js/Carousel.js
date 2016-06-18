var images_to_insert = []; // Array to insert images urls
var appended_items_flag = 1; // Con esta variable controlo los items que voy metiendo para poder resetearlo cuando sean 4
var container_number_index = 0; // variable que controla el slide en donde cargo la imagen
var total_img_in_slider;
var number_of_element = 20;

var slides_created;


function checkPosition()
{
    var window_width = $(window).width();

    if(window_width < 1920 && window_width > 1400 ){
         total_img_in_slider = 12;
         return number_of_element / total_img_in_slider; // Cantidad de slides a crear
    }
    else if (window_width < 1400 && window_width > 900 ) {
        total_img_in_slider = 8;
        return number_of_element / total_img_in_slider; // Cantidad de slides a crear
    }
    else if (window_width < 900 && window_width > 700) {
        total_img_in_slider = 6;
        return number_of_element / total_img_in_slider; // Cantidad de slides a crear
    }
    else if (window_width < 700 && window_width > 500) {
        total_img_in_slider = 4;
        return number_of_element / total_img_in_slider; // Cantidad de slides a crear
    }
    else if (window_width < 500 && window_width > 0) {
        total_img_in_slider = 1;
        return number_of_element / total_img_in_slider; // Cantidad de slides a crear
    }
}



// Function
// create_slide_container()
// @params slides_to_create, que son la cantidad de elementos que debe crear
// Se encarga de redondear hacia arriba la cantidad de divs contenedores a crear, una vez resuelto, crea el div con un id indicador.
// Return : la cantidad de divs creados

function create_slide_container(slides_to_create) {

    var cont = 0;

    while (cont < Math.ceil(slides_to_create)) {

        $('#carousel').append('<div class="slide" id="slide_number_'+cont+'"></div>')
        cont++;
    }

    return cont;
}

// Function
// activate_slide()
// @params slide_to_activate
// Se encarga de mostrar y agregar la clase "slide_actived" al elemento pasado por parametro.
// Return : null.

function activate_slide(slide_to_activate) {
    slide_to_activate.addClass('slide_actived');
    slide_to_activate.show();
}


// Function
// desactivate_slide()
// @params slide_to_desactivate
// Se encarga de ocultar y quitar la clase "slide_actived" al elemento pasado por parametro.
// Return : null.

function desactivate_slide(slide_to_desactivate) {
    slide_to_desactivate.removeClass('slide_actived');
    slide_to_desactivate.hide();
}

// Invoco a la funcion, pasandole slides_to_create que es igual a 15(Elementos,imagenes) / 4 (Cantidad de imagenes que quiero por div)
var slides_to_create = checkPosition();
slides_created = create_slide_container(slides_to_create);
console.log(slides_to_create);
//Array empty
for (var i = 0; i < number_of_element; i++) {
    images_to_insert.push('<div><img class="s-slider-img" src="http://lorempixel.com/g/300/600/animals/?v=3'+Math.floor((Math.random() * 500) + 1)+'"></div>')
}
//Array full

// Un for que entra en el array de imagenes a insertar.
for (var i = 0; i < images_to_insert.length; i++) {
    // La variable appended_items_flag se encarga de autoincrementarse a medida que coloco una imagen, si es igual a 4 significa que tengo que cambiar de slider.
    console.log(total_img_in_slider);
    if (appended_items_flag == total_img_in_slider) {
        $('#slide_number_' + container_number_index).append(images_to_insert[i])
        container_number_index++;
        appended_items_flag = 1;
    }
    // Si no es 4 continuo en el mismo slider pero sumando +1 a appended_items_flag.
    else {
        $('#slide_number_' + container_number_index).append(images_to_insert[i])
        appended_items_flag++;
    }

}

//Oculto todos los elementos
$('.slide').hide();
//Muestro el primero (Hardcodeado)
activate_slide($('#slide_number_0'))


$(document).ready(function() {

    var imgCount = $(".s-slider-img").length;
    var loadCounter = 0;

    $(".s-slider-img").one("load", function() {
        loadCounter++;
        if(loadCounter == imgCount) {
            $('#pre_loader').hide();
        }
    }).each(function() {
        if(this.complete) $(this).trigger("load");
    });


    function check_ssl(carousel_father){

        var s_sliders_only = []

        for (var i = 0; i < carousel_father.length; i++) {
            if ($(carousel_father[i]).hasClass('slide')) {
                s_sliders_only.push(carousel_father[i])
            }
        }

        return s_sliders_only
    }

    //Cuando  haga click en next
    $('#s-slider-next').on('click',function(){

        //Obtengo todos los hijos del carousel(sliders) en un array.
        var carousel_father = $('.s-slider').children();
        var s_sliders_only = check_ssl(carousel_father);

        //Entro en un loop de este mismo array
        for (var i = 0; i < s_sliders_only.length; i++) {

                //Si tiene la clase que indica que esta activado, necesito desactivarlo y activar el proximo slide
                if ($(s_sliders_only[i]).hasClass('slide_actived')) {
                    //Desactivo
                    desactivate_slide($(s_sliders_only[i]))
                    //Controlo si es el ultimo, en el caso que sea el ultimo el slider que tomo para activar es el nro 0, asi genero el efecto carousel
                    if (s_sliders_only.length - 1 == i) {
                        activate_slide($(s_sliders_only[0]))
                    }
                    //Si no es el ultimo simplente activo la proxima posicion del div que acabo de desactivar.
                    else {
                        activate_slide($(s_sliders_only[i+1]))
                    }

                    break;
                }

        }
    })

    //Cuando  haga click en prev
    $('#s-slider-prev').on('click',function(){

        //Obtengo todos los hijos del carousel(sliders) en un array.
        var carousel_father = $('.s-slider').children();
        var s_sliders_only = check_ssl(carousel_father);

        //Entro en un loop de este mismo array
        for (var i = 0; i < s_sliders_only.length; i++) {

            //Si tiene la clase que indica que esta activado, necesito desactivarlo y activar el proximo slide
                if ($(s_sliders_only[i]).hasClass('slide_actived')) {
                    //Desactivo
                    desactivate_slide($(s_sliders_only[i]))
                    //Controlo si es el primero, en el caso que sea el primero el slider que tomo para activar es el nro 4, asi genero el efecto carousel
                    if (s_sliders_only[0] == s_sliders_only[i]) {
                        activate_slide($(s_sliders_only[Math.ceil(slides_to_create)-1]))
                    }
                    //Si no es el ultimo simplente activo la anterior posicion del div que acabo de desactivar.
                    else {
                    activate_slide($(s_sliders_only[i-1]))
                    }

                    break;
                }

        }
    })

})
