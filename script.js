let date = new Date();
let anio = date.getFullYear();

const footer = document.getElementById("footer").textContent = `Juan Saracco © - ${anio}`;
const btnDolarAPesos = document.getElementById("btnDolarAPeso");
const btnPesosADolar = document.getElementById("btnPesoADolar");


//CHEQUEAR
//----------------------------

function conversorADolares(valorDolar, cantidadPesos) {

    let dolares;

    if (valorDolar <= 0) {
        dolares = 0;
    } else {
        dolares = Math.floor(cantidadPesos / valorDolar);
    }

    console.log(`${cantidadPesos} pesos son: ${dolares} dolares`);

    document.getElementById("salidaDolares").textContent = `$${dolares}`;
}

function conversorAPesos(valorDolar, cantidadDolares) {

    let pesos;

    if (valorDolar <= 0) {
        pesos = 0;
    } else {
        pesos = Math.floor(cantidadDolares * valorDolar);
    }

    console.log(`${cantidadDolares} dolares son: ${pesos} pesos`);


    document.getElementById("salidaPesos").textContent = `$${pesos}`;
}

//-----------------------------


let valorCompra;
let valorVenta;



document.addEventListener("DOMContentLoaded", function () {



    function fetchDolarValue() {

        fetch('https://api.bluelytics.com.ar/v2/latest')
            .then(response => response.json())

            .then(data => {
                //console.log(data);

                //dolar blue
                valorCompra = data.blue.value_buy;
                document.getElementById('compra').textContent = `$${valorCompra}.00`;

                valorVenta = data.blue.value_sell;
                document.getElementById('venta').textContent = `$${valorVenta}.00`;

                //dolar oficial
                const valorCompraOf = data.oficial.value_buy;
                document.getElementById('compraOficial').textContent = `$${valorCompraOf}.00`;

                const valorVentaOf = data.oficial.value_sell;
                document.getElementById('ventaOficial').textContent = `$${valorVentaOf}.00`;
                
                //CODIGO FUNCIONANDO MAL
                //----------------------

                //conversores
                btnDolarAPesos.addEventListener("click", function () {
                    const dolaresInput = document.getElementById("cantDolares");
                    const cantDolares = parseFloat(dolaresInput.value);
                    conversorAPesos(valorVenta, cantDolares);
                });

                btnPesosADolar.addEventListener("click", function () {
                    const pesosInput = document.getElementById("cantPesos");
                    const cantPesos = parseFloat(pesosInput.value);
                    conversorADolares(valorVenta, cantPesos);
                });
                ;

                //--------------------------


            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
    }





    setInterval(fetchDolarValue, 5000);

    fetchDolarValue();

});

