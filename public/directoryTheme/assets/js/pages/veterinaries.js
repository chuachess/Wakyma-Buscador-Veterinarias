let currentScreen;
let filtersVisibility;

const SCREEN_MAP = 0;
const SCREEN_LIST = 1;

$(document).ready(function() {
    $('#searchButton').click(function () {
        if (CURRENT_PLACE) {
            window.location.href = '/veterinarias/busqueda?direccion=' + CURRENT_PLACE.formatted_address + '&latitud=' + CURRENT_PLACE.geometry.location.lat() + '&longitud=' + CURRENT_PLACE.geometry.location.lng();
        }
    });

    if (isMobile()) {
        setCurrentScreen(SCREEN_LIST);
        setFiltersVisibility(false);

        $('.listsearch-options').css("padding", "20px 10px");
        $('.listsearch-options').css("position", "fixed");
        $('.listsearch-options').css("top", "70px");
        $('.listsearch-options').css("left", "0");
        $('.listsearch-options').css("right", "0");
        $('.listing-item.list-layout .geodir-category-description').css("display", "none");
        $('.mobile-no-photo').css("display", "none");

        $('.col-list-wrap').css("min-height", "0");

        $('#showFiltersButton').click(function () {
            setFiltersVisibility(!filtersVisibility);
        });
        $('#toggleMapOrListButton').click(function () {
            setCurrentScreen(!currentScreen);
        });
    }
});

function setCurrentScreen(newCurrentScreen) {
    currentScreen = newCurrentScreen;
    if (currentScreen == SCREEN_MAP) {
        $('.map-container').css("display", "initial");
        $('.list-main-wrap').css("display", "none");
        $('footer').css("display", "none");

        $('#toggleMapOrListButton').html("Ver en lista <i class=\"fa fa-list\"></i>");
    } else {
        $('.map-container').css("display", "none");
        $('.list-main-wrap').css("display", "initial");
        $('footer').css("display", "initial");

        $('#toggleMapOrListButton').html("Ver en mapa <i class=\"fa fa-map\"></i>");
    }
}

function setFiltersVisibility(newFiltersVisibility) {
    filtersVisibility = newFiltersVisibility;
    if (filtersVisibility == true) {
        $('.listsearch-options').css("display", "initial");
    } else {
        $('.listsearch-options').css("display", "none");
    }
}

function loadMore() {

}