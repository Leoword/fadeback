var _ = require('underscore');

module.exports = function (theadObj) {
    var thead = $('<tr></tr>');
    var theadList = _.keys(theadObj);

    _.each(theadList, function (item) {
        thead.append(`<th class="${item}">${theadObj[item]}</th>`);
    });

    var table = $(`
        <table class="table table-bordered table-striped">
            <tbody>
            </tbody>
        </table>
    `);

    table.prepend($('<thead></thead>').append(thead));

    return table;
}