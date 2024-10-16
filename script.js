function obtenerTerremotos() {
    const url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=5';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const terremotos = data.features;
            const listaTerremotos = document.getElementById('lista-terremotos');

            listaTerremotos.innerHTML = ''; // Limpiar resultados anteriores

            terremotos.forEach(terremoto => {
                const magnitud = terremoto.properties.mag;
                const lugar = terremoto.properties.place;
                const fecha = new Date(terremoto.properties.time);

                const elemento = document.createElement('div');
                elemento.className = 'elemento-terremoto';
                elemento.innerHTML = `
                    <strong>Magnitud: ${magnitud}</strong>
                    <small>Ubicación: ${lugar}</small><br>
                    <small>Fecha: ${fecha.toUTCString()}</small>
                `;

                listaTerremotos.appendChild(elemento);
            });
        })
        .catch(error => console.error('Error al obtener los datos de terremotos:', error));
}
