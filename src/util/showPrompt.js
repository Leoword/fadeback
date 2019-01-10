module.exports = function (message, classText, parent) {
    parent.empty();

    parent.attr('class', classText);

    parent.append(message);
}