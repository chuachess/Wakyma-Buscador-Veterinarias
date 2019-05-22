$(document).ready(function() {

    if (isMobile()) {

    } else {

    }

    loadSlickSliderAndMap();

    let score = 4.5;
    $("#lateral_rating_value").text(score);
    $('#lateral_rating_stars').raty({
        targetKeep: true,
        icon: 'font',
        score: score,
        readOnly: true,
        starType: 'i',
        starOff: 'fa fa-star-o',
        starOn: 'fa fa-star',
        cancelOff: 'icon md-minus-circle',
        cancelOn: 'icon md-minus-circle',
        starHalf: 'fa fa-star-half-o'
    });
    $("#lateral_opinions_number").text("Basado en 10 opiniones");

    $('#vg_rating_stars').raty({
        targetKeep: true,
        icon: 'font',
        score: score,
        readOnly: true,
        starType: 'i',
        starOff: 'fa fa-star-o',
        starOn: 'fa fa-star orange-600',
        cancelOff: 'fa md-minus-circle',
        cancelOn: 'fa md-minus-circle',
        starHalf: 'fa fa-star-half-o orange-500'
    });
    $("#vg_rating_value").text(score);
    $("#vg_opinions_number").text("Basado en 10 opiniones");


    loadContactInfo();

    loadSchedule();

    loadAnimalsAllowed();

    //Cargamos la descripcion
    if (veterinary.description) {
        $("#vg_description").html(veterinary.description);
    } else {
        $("#vg_description").remove();
        $(".description_title").remove();
    }

    loadCategories();

    let fixedColumnPosition = $('#right_column_container').offset();
    //FIXME da errores al llegar abajo, hace autoscroll de la pantalla
    /*$(window).scroll(function() {
        if($(window).scrollTop() > fixedColumnPosition.top + 230){
            $('#right_column_container').css('position','fixed');
            $('#right_column_container').css('top', '-230px');
        } else {
            $('#right_column_container').css('position','static');
        }
    });*/

    //Dialogo de pedir cita
    $("#bookButton").click(function () {
        NewSuggestDialog.presentDialogWithVeterinary(veterinary);
    });

    //Dialogo de sugerencias de cambios en la ficha de la vete
    $("#suggestChangesButton").click(function () {
        NewSuggestDialog.presentDialogWithVeterinary(veterinary);

        let rateJSON = {};
        rateJSON.veterinaryId = veterinary.objectId;
        rateJSON.rate = 5;
        rateJSON.comment = "Me gusta mucho!";

        $.post("rate", rateJSON);
    });
});

function loadSlickSliderAndMap() {
    if (veterinary.images && veterinary.images.length > 0) {
        let sliderHtml = "";
        for (let i = 0; i < veterinary.images.length; i++) {
            let businessImage = veterinary.images[i];
            sliderHtml += "<div><img src='" + businessImage.image.url + "'/></div>";
        }
        $("#vg_slider").html(sliderHtml);
        $("#vg_slider").slick();

        loadMiniMap();
    } else if (veterinary.profileImage) {
        let sliderHtml = "<div><img src='" + veterinary.profileImage.url + "'/></div>";
        $("#vg_slider").html(sliderHtml);
        $("#vg_slider").slick();

        loadMiniMap();
    } else {
        //Si no tiene imagen, incluimos el mapa en vez de la imagen
        loadMainMap();
    }
}

function loadMainMap() {
    $(".cd_cd_mapa").parent().remove();
    $(".cd_slide").remove();

    let geolocation = veterinary.geolocation;
    if (geolocation) {
        let googleCoordinate = new google.maps.LatLng(geolocation.latitude, geolocation.longitude);
        if (googleCoordinate) {
            let mapProp = {
                center: googleCoordinate,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            let gMap = new google.maps.Map(document.getElementById("mainMap"), mapProp);

            let marker = new google.maps.Marker({
                position: googleCoordinate,
                draggable: false
            });

            marker.setMap(gMap);
            $("#mainMap").change();
        }
    }
}

function loadMiniMap() {
    $("#mainMapContainer").remove();
    $("#vg_box_address").text(veterinary.address);
    $("#vg_box_city_and_cp").text(veterinary.city + ", " + veterinary.cp);

    let geolocation = veterinary.geolocation;
    if (geolocation) {
        let googleCoordinate = new google.maps.LatLng(geolocation.latitude, geolocation.longitude);
        if (googleCoordinate) {
            let mapProp = {
                center: googleCoordinate,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            let gMap = new google.maps.Map(document.getElementById("vg_googleMap"), mapProp);

            let marker = new google.maps.Marker({
                position: googleCoordinate,
                draggable: false
            });

            marker.setMap(gMap);
            $("#vg_googleMap").change();
        }
    }
}

function loadContactInfo() {
    let hasPhone = false;
    let hasContactInfo = false;

    if (veterinary.phone) {
        hasPhone = true;
        hasContactInfo = true;
        $('#vetPhone').html("<a href='tel:+"  + veterinary.phone + "'>" + veterinary.phone + "</a>");
    } else {
        $('#vetPhone').parent().remove();
    }
    if (veterinary.urgencyPhone) {
        hasPhone = true;
        hasContactInfo = true;
        $('#vetUrgencyPhone').html("<a href='tel:+"  + veterinary.phone + "'>" + veterinary.urgencyPhone + "</a>");
    } else {
        $('#vetUrgencyPhone').parent().remove();
    }
    if (veterinary.email) {
        hasContactInfo = true;
        $('#vetEmail').html("<a href='mailTo:" + veterinary.email + "'>" + veterinary.email + "</a>");
    } else {
        $('#vetEmail').parent().remove();
    }
    if (veterinary.web) {
        hasContactInfo = true;
        veterinary.web = veterinary.web.replace("https://", "");
        veterinary.web = veterinary.web.replace("http://", "");
        $('#vetWeb').html("<a href='http://" + veterinary.web + "' target='blank'>" + veterinary.web + "</a>");
    } else {
        $('#vetWeb').parent().remove();
    }

    if (!hasPhone) {
        $('#bookButton').remove();
    }

    if (!hasContactInfo) {
        $('.vg_contact_info').remove();
    }
}

function loadSchedule() {
    if (veterinary.schedule) {
        $("#vg_horario_lunes").html(getScheduleStringOfDay(veterinary.schedule, 1));
        $("#vg_horario_martes").html(getScheduleStringOfDay(veterinary.schedule, 2));
        $("#vg_horario_miercoles").html(getScheduleStringOfDay(veterinary.schedule, 3));
        $("#vg_horario_jueves").html(getScheduleStringOfDay(veterinary.schedule, 4));
        $("#vg_horario_viernes").html(getScheduleStringOfDay(veterinary.schedule, 5));
        $("#vg_horario_sabado").html(getScheduleStringOfDay(veterinary.schedule, 6));
        $("#vg_horario_domingo").html(getScheduleStringOfDay(veterinary.schedule, 7));
    } else if (veterinary.scheduleString) {
        $("#scheduleTable").parent().append("<p>" + veterinary.scheduleString + "</p>");
        $("#scheduleTable").remove();
    } else {
        $("#scheduleTable").parent().remove();
    }
}

function loadAnimalsAllowed() {
    let content = "";
    let leftColumnContent = "";
    let rightColumnContent = "";

    if (veterinary.animalsAllowed) {
        for (let i = 0; i < veterinary.animalsAllowed.length; i++) {
            let category = veterinary.animalsAllowed[i];
            if (i % 2 == 0) {
                leftColumnContent += "<p class='animal_item'>" + getAnimalStringFromInt(category) + "</p>";
            } else {
                rightColumnContent += "<p class'animal_item'>" + getAnimalStringFromInt(category) + "</p>";
            }
        }
    }
    if (leftColumnContent.length > 0) {
        content += "<div class='col-sm-6'>" + leftColumnContent + "</div>";
    }
    if (rightColumnContent.length > 0) {
        content += "<div class='col-sm-6'>" + rightColumnContent + "</div>";
    }

    if (content.length > 0) {
        $("#vg_allowed_pets").html(content);
    } else {
        $("#vg_allowed_pets").remove();
        $(".allowed_pets_title").remove();
    }
}

function loadCategories() {
    let content = "";
    let leftColumnContent = "";
    let rightColumnContent = "";
    if (veterinary.categories) {
        for (let i = 0; i < veterinary.categories.length; i++) {
            let category = veterinary.categories[i];
            if (i % 2 == 0) {
                leftColumnContent += "<p class='category_item'>" + getVetCategoryStringFromInt(category) + "</p>";
            } else {
                rightColumnContent += "<p class'category_item'>" + getVetCategoryStringFromInt(category) + "</p>";
            }
        }
        if (leftColumnContent.length > 0) {
            content += "<div class='col-sm-6'>" + leftColumnContent + "</div>";
        }
        if (rightColumnContent.length > 0) {
            content += "<div class='col-sm-6'>" + rightColumnContent + "</div>";
        }
    }
    if (content.length > 0) {
        $("#vg_categories").html(content);
    } else {
        $("#vg_categories").remove();
        $(".categories_title").remove();
    }
}

function getScheduleStringOfDay(schedule, day) {
    if (day === 1) {
        if (schedule.isMondayAvailable) {
            let scheduleString;
            if (schedule.mondayOpeningTime1 != null) {
                scheduleString = UTCDateTo_hh_MM(schedule.mondayOpeningTime1) + " - " + UTCDateTo_hh_MM(schedule.mondayClosingTime1);
            }
            if (schedule.mondayOpeningTime2 != null) {
                if (scheduleString) {
                    scheduleString += "</br>" + UTCDateTo_hh_MM(schedule.mondayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.mondayClosingTime2);
                } else {
                    scheduleString = UTCDateTo_hh_MM(schedule.mondayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.mondayClosingTime2);
                }
            }
            return scheduleString;
        } else {
            return "Cerrado";
        }
    } else if (day === 2) {
        if (schedule.isTuesdayAvailable) {
            let scheduleString;
            if (schedule.tuesdayOpeningTime1 != null) {
                scheduleString = UTCDateTo_hh_MM(schedule.tuesdayOpeningTime1) + " - " + UTCDateTo_hh_MM(schedule.tuesdayClosingTime1);
            }
            if (schedule.tuesdayOpeningTime2 != null) {
                if (scheduleString) {
                    scheduleString += "</br>" + UTCDateTo_hh_MM(schedule.tuesdayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.tuesdayClosingTime2);
                } else {
                    scheduleString = UTCDateTo_hh_MM(schedule.tuesdayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.tuesdayClosingTime2);
                }
            }
            return scheduleString;
        } else {
            return "Cerrado";
        }
    } else if (day === 3) {
        if (schedule.isWednesdayAvailable) {
            let scheduleString;
            if (schedule.wednesdayOpeningTime1 != null) {
                scheduleString = UTCDateTo_hh_MM(schedule.wednesdayOpeningTime1) + " - " + UTCDateTo_hh_MM(schedule.wednesdayClosingTime1);
            }
            if (schedule.wednesdayOpeningTime2 != null) {
                if (scheduleString) {
                    scheduleString += "</br>" + UTCDateTo_hh_MM(schedule.wednesdayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.wednesdayClosingTime2);
                } else {
                    scheduleString = UTCDateTo_hh_MM(schedule.wednesdayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.wednesdayClosingTime2);
                }
            }
            return scheduleString;
        } else {
            return "Cerrado";
        }
    } else if (day === 4) {
        if (schedule.isThursdayAvailable) {
            let scheduleString;
            if (schedule.thursdayOpeningTime1 != null) {
                scheduleString = UTCDateTo_hh_MM(schedule.thursdayOpeningTime1) + " - " + UTCDateTo_hh_MM(schedule.thursdayClosingTime1);
            }
            if (schedule.thursdayOpeningTime2 != null) {
                if (scheduleString) {
                    scheduleString += "</br>" + UTCDateTo_hh_MM(schedule.thursdayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.thursdayClosingTime2);
                } else {
                    scheduleString = UTCDateTo_hh_MM(schedule.thursdayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.thursdayClosingTime2);
                }
            }
            return scheduleString;
        } else {
            return "Cerrado";
        }
    } else if (day === 5) {
        if (schedule.isFridayAvailable) {
            let scheduleString;
            if (schedule.fridayOpeningTime1 != null) {
                scheduleString = UTCDateTo_hh_MM(schedule.fridayOpeningTime1) + " - " + UTCDateTo_hh_MM(schedule.fridayClosingTime1);
            }
            if (schedule.fridayOpeningTime2 != null) {
                if (scheduleString) {
                    scheduleString += "</br>" + UTCDateTo_hh_MM(schedule.fridayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.fridayClosingTime2);
                } else {
                    scheduleString = UTCDateTo_hh_MM(schedule.fridayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.fridayClosingTime2);
                }
            }
            return scheduleString;
        } else {
            return "Cerrado";
        }
    } else if (day === 6) {
        if (schedule.isSaturdayAvailable) {
            let scheduleString;
            if (schedule.saturdayOpeningTime1 != null) {
                scheduleString = UTCDateTo_hh_MM(schedule.saturdayOpeningTime1) + " - " + UTCDateTo_hh_MM(schedule.saturdayClosingTime1);
            }
            if (schedule.saturdayOpeningTime2 != null) {
                if (scheduleString) {
                    scheduleString += "</br>" + UTCDateTo_hh_MM(schedule.saturdayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.saturdayClosingTime2);
                } else {
                    scheduleString = UTCDateTo_hh_MM(schedule.saturdayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.saturdayClosingTime2);
                }
            }
            return scheduleString;
        } else {
            return "Cerrado";
        }
    } else if (day === 7) {
        if (schedule.isSundayAvailable) {
            let scheduleString;
            if (schedule.sundayOpeningTime1 != null) {
                scheduleString = UTCDateTo_hh_MM(schedule.sundayOpeningTime1) + " - " + UTCDateTo_hh_MM(schedule.sundayClosingTime1);
            }
            if (schedule.sundayOpeningTime2 != null) {
                if (scheduleString) {
                    scheduleString += "</br>" + UTCDateTo_hh_MM(schedule.sundayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.sundayClosingTime2);
                } else {
                    scheduleString = UTCDateTo_hh_MM(schedule.sundayOpeningTime2) + " - " + UTCDateTo_hh_MM(schedule.sundayClosingTime2);
                }
            }
            return scheduleString;
        } else {
            return "Cerrado";
        }
    }
}

function getAnimalStringFromInt(animal) {
    if (animal === 1) {
        return "Perros";
    } else if (animal === 2) {
        return "Gatos";
    } else if (animal === 3) {
        return "Peces";
    } else if (animal === 4) {
        return "Roedores";
    } else if (animal === 5) {
        return "Pájaros";
    } else if (animal === 6) {
        return "Reptiles";
    } else if (animal === 7) {
        return "Tortugas";
    } else if (animal === 8) {
        return "Exóticos";
    }
}

function getVetCategoryStringFromInt(category) {
    if (category === 1) {
        return "Urgencias 24h";
    } else if (category === 2) {
        return "Peluquería";
    } else if (category === 3) {
        return "Análisis clínico";
    } else if (category === 4) {
        return "Diagnóstico por imagen";
    } else if (category === 5) {
        return "Laboratorio";
    } else if (category === 6) {
        return "Hospitalización";
    } else if (category === 7) {
        return "Cardiología";
    } else if (category === 8) {
        return "Cirugía";
    } else if (category === 9) {
        return "Dermatología";
    } else if (category === 10) {
        return "Digestivo";
    } else if (category === 11) {
        return "Ginecología";
    } else if (category === 12) {
        return "Odontología";
    } else if (category === 13) {
        return "Oftalmología";
    } else if (category === 14) {
        return "Oncología";
    } else if (category === 15) {
        return "Neurología";
    } else if (category === 16) {
        return "Traumatología";
    }
}

function UTCDateTo_hh_MM(dateString) {
    let date = new Date(dateString.iso);
    let minutesString = date.getMinutes().toString();
    if (minutesString.length === 1) {
        minutesString = minutesString.concat("0");
    }
    return date.getUTCHours() + ":" + minutesString;
}