var _ = require('underscore');

var detailFactory = require('./detail');
var tableFactory = require('./table');
var createPagenation = require('./pagenation');

var ajax = require('../util/ajax');
var dateFormat = require('../util/dateFormat');

var detailRetrive = detailFactory({
    title: '意见反馈查看',
    toolbar: false
});


module.exports = function () {
    var allFeedback = $('#all-feedback');

    allFeedback.prepend(detailRetrive);

    allFeedback.append(tableFactory({
        title: '标题',
        origin: '来源用户',
        deal: '处理人员',
        'create-time': '创建时间'
    }));

    allFeedbackComponent.getAllFeedback();
}

var allFeedbackComponent = {
    allFeedback: [],
    currentNumber: 1,
    getAllFeedback() {
        ajax(`/api/admin/topic?timestamp=${new Date().getTime()}`, 'get', {
            success: function (res) {
                allFeedbackComponent.allFeedback = _.map(res, function (item, index) {
                    return {
                        serial: index + 1,
                        id: item.id,
                        title: item.title,
                        origin: item.author ? item.author : '无',
                        deal: item.adminId ? item.adminId : '无',
                        create: dateFormat(item.createdAt)
                    }
                });

                allFeedbackComponent.filterList();
                allFeedbackComponent.filteredResult();
            }
        })
    },
    renderTable(list) {
        var ownTopicTable = $('#all-feedback table tbody');
    
        ownTopicTable.empty();

        _.each(list, function (topic) {
            ownTopicTable.append(`
                <tr>
                    <td class="pointer title" data-retrive="${topic.id}" data-click="true">
                        <div><a>${topic.title}</div></a>
                    </td>
                    <td class="origin"><div>${topic.origin}</div></td>
                    <td class="deal"><div>${topic.deal}</div></td>
                    <td class="create-title"><div>${topic.create}</div></td>
                </tr>
            `)
        });

        allFeedbackComponent.getRetrive();
    },
    getRetrive() {
        var topicRetrive = $('#all-feedback table tr td[data-click="true"]');
        var titleObj = $('#all-feedback .details input[name="title"]');
        var contentObj = $('#all-feedback .details textarea[name="content"]');
        
        topicRetrive.click(function (event) {
            var topicId = $(event.currentTarget).attr('data-retrive');
  
            ajax(`/api/admin/topic/${topicId}?timestamp=${new Date().getTime()}`, 'get', {
                success(res) {
                    if ($('#all-feedback .details').css('display') === 'none') {

                        $('#all-feedback .details').show();
                    }

                    titleObj.val(res.title);
                    contentObj.val(res.content);

                    if (!res.adminId) {

                        allFeedbackComponent.setViewLable(topicId);
                    }
                }
            });
        });
    },
    setViewLable(id) {
        ajax(`/api/admin/topic/${id}/review`, 'patch', {
            success(res) {
                allFeedbackComponent.getAllFeedback();
            }
        });
    },
    filterList() {
        var searchBtn = $('#all-feedback .filters button[data-operate="search"]');
        
        searchBtn.click(function () {
            allFeedbackComponent.currentNumber = 1;

            allFeedbackComponent.filteredResult();
        });
    },
    filteredResult() {
        var title = $('#all-feedback .filters input[name="title"]').val();
        var origin = $('#all-feedback .filters input[name="origin"]').val();

        var titleRegexp = new RegExp(title);
        var originRegexp = new RegExp(origin);

        var newList = _.filter(allFeedbackComponent.allFeedback, function (item) {
            if (titleRegexp.test(item.title) && originRegexp.test(item.origin)) {
                return item;
            }
        });

        createPagenation('#page-allfeedback', newList.length, 5, 14, function (currentNumber, showRow) {
            var arr = newList.slice((currentNumber - 1) * showRow, currentNumber * showRow);
            allFeedbackComponent.currentNumber = currentNumber;

            allFeedbackComponent.renderTable(arr);
        }, allFeedbackComponent.currentNumber);
    }
}