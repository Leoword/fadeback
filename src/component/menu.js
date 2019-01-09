module.exports = function () {
    var dropdown = $('#dropdown');
    var dropdownContent = $('#dropdown-content');

    dropdown.click(function () {
        dropdownContent.toggle();
    });
}