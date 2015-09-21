enableEditor = function () {
    $('#mainForms').children().prop('disabled', true);//find('button').attr('disabled', true);
    $('#editForms').css('visibility', 'visible');
}

disableEditor = function () {
    $('#mainForms').children().prop('disabled', false);//find('button').attr('enabled', true);
    $('#editForms').css('visibility', 'hidden');
}

