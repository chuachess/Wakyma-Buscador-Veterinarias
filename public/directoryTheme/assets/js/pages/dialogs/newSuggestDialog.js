var NewSuggestDialog = (function() {
    let newSuggestDialogMethods = {};

    let initWithVeterinary = function(veterinary) {

        $('#newSuggestDialog').fadeIn();
        $("html, body").addClass("hid-body");
    }

    newSuggestDialogMethods.presentDialogWithVeterinary = function(veterinary) {
        initWithVeterinary(veterinary);
    }

    return newSuggestDialogMethods;
})();