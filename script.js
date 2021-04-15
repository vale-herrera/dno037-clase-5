/* 
Índice de intesidad de uso del cobre por país en Datos.gob (repositorio de datos abiertos centralizado del Estado)
Fuente: https://datos.gob.cl/dataset/indice-de-intesidad-de-uso-del-cobre-por-pais/resource/6b2ce9f5-f23a-41ef-961a-1e9939e00c10
Preferí "limpiar" los datos antes de utilizarlos. La versión "limpia" la dejé en GitHub
*/
Papa.parse("https://raw.githubusercontent.com/vale-herrera/dno037-clase-5/main/indice-uso-cobre.csv", {

    download: true,
    header: true,
    dynamicTyping: true,
    complete: function (respuesta) {
        // asómense a la consola para ver toda la respuesta
        console.log(respuesta);
        // necesitamos solo una parte de toda la respuesta
        var datos = respuesta.data;
        // para eliminar una fila de sobra al final, borrar el doble slash en la siguiente línea
        datos.pop();

        if (document.body.classList.contains("portada")) {
            datos.forEach(function (dato, i) {
                document.querySelector("main").innerHTML += "<article><a href='page.html?pais=" + i + "'>" + dato.pais + "</article>";
            }); // cierra el forEach
        } else {
            var f = new URLSearchParams(window.location.search).get("pais");
            console.log(f);
            if(window.innerHeight > window.innerWidth){
                document.querySelector("#grafico").setAttribute("height", "100");
            }
            if (f !== null) {
                document.querySelector("h2").append(datos[f].pais);
                var indice = [];
                indice.push(datos[f].siete);
                indice.push(datos[f].ocho);
                indice.push(datos[f].nueve);
                indice.push(datos[f].diez);
                indice.push(datos[f].once);
                indice.push(datos[f].doce);
                indice.push(datos[f].trece);
                indice.push(datos[f].catorce);
                indice.push(datos[f].quince);
                indice.push(datos[f].dieciseis);
                new Chart(document.querySelector("#grafico").getContext("2d"), {
                    type: "line",
                    data: {
                        labels: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
                        datasets: [
                            {
                                data: indice,
                                backgroundColor: "rgba(157, 255, 45, .25)",
                                borderColor: "rgba(74, 11, 146, .8)",
                                pointRadius: 4,
                                borderWidth: 3,
                                lineTension: 0,
                            },
                        ],
                    },
                    options: {
                        layout: {
                            padding: { left: 15, right: 20, top: 20, bottom: 10
                            }
                        },
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        fontColor: "rgba(74, 11, 146, 0.75)",
                                        fontFamily:'sans-serif',
                                        fontSize: 13,
                                    },
                                },
                            ],
                            xAxes: [
                                {
                                    ticks: {
                                        fontColor: "rgba(74, 11, 146, 0.75)",
                                        fontFamily:'sans-serif',
                                        fontSize: 13,
                                    },
                                },
                            ],
                        },
                    },
                }); 
            } else {
                document.querySelector("main").innerHTML = "<article>Algo salió mal &#128557;</article>";
            } // cierra else
        } // cierra else
    }, // cierra function(respuesta){}
}); // cierra Papa.parse