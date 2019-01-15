var _ = require('underscore');
var ajax = require('../util/ajax');

var {initAll, createAll} = require('./allFeedback');
var {initOwn, createOwn} = require('./ownFeedback');
var {initAdmin, createAdmin} = require('./adminList');

var mapping = {
    retriveShow: {
        get: initOwn,
        create: createOwn
    },
    allShow: {
        get: initAll,
        create: createAll
    },
    adminShow: {
        get: initAdmin,
        create: createAdmin
    }
}

module.exports = function () {
    var ownFeedback  = $('#own-feedback');
    var allFeedback  = $('#all-feedback');
    var allAdmin  = $('#all-admin');

    getType();

    var retriveShow = $(`
        <span class="active">我的反馈</span>
    `);
    retriveShow.name = 'retriveShow';

    var allShow = $(`
        <span>全部反馈</span>
    `);
    allShow.name = 'allShow';
    
    var adminShow = $(`
        <span>管理员管理</span>
    `);
    adminShow.name = 'adminShow';

    ajax(`/api/account?timestamp=${new Date().getTime()}`, 'get', {
        success: function(res) {
            var isAdmin = res.isAdmin;

            if (isAdmin) {
                appendToContainer([retriveShow, allShow, adminShow]);

                activeItem(allShow, allFeedback);
                activeItem(retriveShow, ownFeedback);
                activeItem(adminShow, allAdmin);
            } else {
                appendToContainer([retriveShow]);

                activeItem(retriveShow, ownFeedback);
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

    mapping[item.name].create();
    
    item.click(function () { 
        allSpan.removeClass('active');
    
        ownFeedback.hide();
        allFeedback.hide();
        allAdmin.hide();

        item.addClass('active');

        mapping[item.name].get();

        itemPage.show();
    })
}

function appendToContainer(arr) {
    var tabContainer = $('#tab');

    _.each(arr, function (item) {
        tabContainer.append(item);
    });

}

function getType() {
    var url = location.search;
    var type;

    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        
        type = decodeURIComponent(str.replace("type=",""));
    }

    if (type === 'modern') {
        var header = $('#header');

        header.attr('class', 'bg');
    }
}