enableEditor = function () {
    $('#mainForms').children().prop('disabled', true);
    $('#editForms').css('visibility', 'visible');
}

disableEditor = function () {
    $('#mainForms').children().prop('disabled', false);
    $('#editForms').css('visibility', 'hidden');
}

alertType = "alert-success";
alertMessage = function (success, message) {
    if (success) {
        alertType = "alert-success";
    }
    else {
        alertType = "alert-danger";
    }
    $('#alert-block').append("<div class='alert alert-margins " + alertType + " fade in'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><p>" + message + "</p></div>");
}