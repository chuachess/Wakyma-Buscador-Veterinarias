$(document).ready(function() {
    $('#searchButton').click(function () {
        if (CURRENT_PLACE) {
            window.location.href = '/veterinarias/busqueda?direccion=' + CURRENT_PLACE.formatted_address + '&latitud=' + CURRENT_PLACE.geometry.location.lat() + '&longitud=' + CURRENT_PLACE.geometry.location.lng();
        }
    });
});