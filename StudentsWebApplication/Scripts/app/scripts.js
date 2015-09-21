enableEditor = function () {
    $('#mainForms').children().prop('disabled', true);
    $('#editForms').css('visibility', 'visible');
}

disableEditor = function () {
    $('#mainForms').children().prop('disabled', false);
    $('#editForms').css('visibility', 'hidden');
}

