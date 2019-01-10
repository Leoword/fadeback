var _ = require('underscore');
var ajax = require('../util/ajax');

var createAllFeedback = require('./allFeedback');
var createownFeedback = require('./ownFeedback');
var createAllAdmin = require('./adminList');

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

    ajax(`/api/account?timestamp=${new Date().getTime()}`, 'get', {
        success: function(res) {
            var isAdmin = res.isAdmin;

            if (isAdmin) {
                appendToContainer([retriveShow, allShow, adminShow]);

                activeItem(allShow, allFeedback);
                activeItem(retriveShow, ownFeedback);
                activeItem(adminShow, allAdmin);

                createAllAdmin();
                createAllFeedback();
                createownFeedback();
            } else {
                appendToContainer([retriveShow]);

                activeItem(retriveShow, ownFeedback);

                createownFeedback();
            }
        },
        error: function() {
            appendToContainer([retriveShow]);

            activeItem(retriveShow, ownFeedback);
        }
    });
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