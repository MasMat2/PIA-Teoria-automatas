document.onload = function(){
    console.log(document.getElementById("nombre").value);
    document.getElementById("matricula").value; 
}

function on_submit(){
    var nombre = document.getElementById("nombre").value;
    var matricula = document.getElementById("matricula").value; 
    var cadena = document.getElementById("cadena").value;
    if(nombre.split(" ").length != 4) output = "El nombre debe contener 4 cadenas";
    else if(matricula=="") output = "Ingresar matricula";
    else if(test_regex(nombre, matricula, cadena)){
        output = "Cadena válida"
    }else{
        output = "Cadena inválida"
    };
    const result_p = document.getElementById('result').getElementsByTagName('p')[0];
    result_p.innerHTML = output;
}