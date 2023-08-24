let date = new Date();
let anio = date.getFullYear();

const footer = document.getElementById("footer").textContent = `Juan Saracco © - ${anio}`;


function fetchDolarValue() {

    fetch('https://api.bluelytics.com.ar/v2/latest')
        .then(response => response.json())

        .then(data => {
            console.log(data);

            //dolar blue
            const valorCompra = data.blue.value_buy;
            document.getElementById('compra').textContent = `$${valorCompra}.00`;

            const valorVenta = data.blue.value_sell;
            document.getElementById('venta').textContent = `$${valorVenta}.00`;

            //dolar oficial
            const valorCompraOf = data.oficial.value_buy;
            document.getElementById('compraOficial').textContent = `$${valorCompraOf}.00`;

            const valorVentaOf = data.oficial.value_sell;
            document.getElementById('ventaOficial').textContent = `$${valorVentaOf}.00`;

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
}

setInterval(fetchDolarValue, 10000);

fetchDolarValue();
