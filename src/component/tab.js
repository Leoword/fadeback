var _ = require('underscore');

module.exports = function () {
    var ownFeedback  = $('#own-feedback');
    var allFeedback  = $('#all-feedback');
    var allAdmin  = $('#all-admin');

    var retriveShow = $(`
        <span class="active">我的反馈</span>
    `);

    var allShow = $(`
        <span>全部反馈</span>
    `);
    
    var adminShow = $(`
        <span>管理员管理</span>
    `);

    appendToContainer([retriveShow, allShow, adminShow]);

    activeItem(allShow, allFeedback);
    activeItem(retriveShow, ownFeedback);
    activeItem(adminShow, allAdmin);
}

function activeItem(item, itemPage) {

    var allSpan = $('#tab span');
    var ownFeedback  = $('#own-feedback');
    var allFeedback  = $('#all-feedback');
    var allAdmin  = $('#all-admin');

    
    item.click(function () { 
        allSpan.removeClass('active');
    
        ownFeedback.hide();
        allFeedback.hide();
        allAdmin.hide();

        item.addClass('active');

        itemPage.show();
    })
}

function appendToContainer(arr) {
    var tabContainer = $('#tab');

    _.each(arr, function (item) {
        tabContainer.append(item);
    });

}