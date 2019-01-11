var _ = require('underscore');

var detailFactory = require('./detail');
var tableFactory = require('./table');
var createPagenation = require('./pagenation');

var ajax = require('../util/ajax');
var dateFormat = require('../util/dateFormat');
var showPrompt = require('../util/showPrompt');

var detailRetrive = detailFactory({
    title: '意见反馈',
    toolbar: true
});

module.exports = function () {
    var ownFeedback = $('#own-feedback');

    ownFeedback.prepend(detailRetrive);

    ownFeedback.append(tableFactory({
        title: '标题',
        deal: '处理人员',
        'create-time': '创建时间'
    }));

    ownFeedbackComponent.getTableData();
    ownFeedbackComponent.resetTopic();
    ownFeedbackComponent.backToCreate();
    ownFeedbackComponent.watchInput();
    ownFeedbackComponent.updateTopic();
    ownFeedbackComponent.deleteTopic();
}

var ownFeedbackComponent = {
    ownTopicList: [],
    retriveTopicId: null,
    currentNumber: 1,
    getTableData() {
        ajax(`/api/topic?timestamp=${new Date().getTime()}`, 'get', {
            success: function(res){
                ownFeedbackComponent.ownTopicList = _.map(res, function (item, index) {
                    return {
                        serial: index + 1,
                        id: item.id,
                        title: item.title,
                        deal: item.adminId ? item.adminId : '无',
                        create: dateFormat(item.createdAt)
                    }
                });

                ownFeedbackComponent.filterList();
                ownFeedbackComponent.filteredResult();
            }
        })
    },
    renderTable(list) {
        var ownTopicTable = $('#own-feedback table tbody');
    
        ownTopicTable.empty();

        _.each(list, function (topic) {
            ownTopicTable.append(`
                <tr>
                    <td class="pointer title" data-retrive="${topic.id}" data-click="true">
                        <div><a>${topic.title}</a></div>
                    </td>
                    <td class="deal"><div>${topic.deal}</div></td>
                    <td class="create-time"><div>${topic.create}</div></td>
                </tr>
            `)
        });

        ownFeedbackComponent.getTopicRetrive();
    },
    createTopic() {
        var submitBtn = $('#own-feedback .details button[data-operate="submit"]');

        var titleObj = $('#own-feedback .details input[name="title"]');
        var contentObj = $('#own-feedback .details textarea[name="content"]');
        
        submitBtn.click(function () {

            var title = titleObj.val();
            var content = contentObj.val();

            if (title.length < 5 || content.length <6) {
                showPrompt('标题不得少于5个字并且内容不得少于6个字！', 'text-danger' , $('#own-feedback .details #create-feedback span'));
    
                return;
            }

            ajax('/api/topic', 'post', {
                data: window.JSON.stringify({
                    options: {
                        title, content
                    }
                }),
                success: function () {
                    titleObj.val('');
                    contentObj.val('');
                    
                    showPrompt('意见反馈成功！', 'text-success' , $('#own-feedback .details #create-feedback span'));

                    ownFeedbackComponent.getTableData();
                },
                error: function () {
                    showPrompt('意见反馈失败！', 'text-danger' , $('#own-feedback .details #create-feedback span'));
                }
            });
        });
    },
    resetTopic() {
        var resetBtn = $('#own-feedback .details button[data-operate="reset"]');
        var titleObj = $('#own-feedback .details input[name="title"]');
        var contentObj = $('#own-feedback .details textarea[name="content"]');

        resetBtn.click(function () {

            titleObj.val('');
            contentObj.val('');
        });
    },
    backToCreate() {
        var backBtn = $('#own-feedback .details a[data-operate="back"]');
        var titleObj = $('#own-feedback .details input[name="title"]');
        var contentObj = $('#own-feedback .details textarea[name="content"]');

        backBtn.click(function () {
            titleObj.val('');
            contentObj.val('');

            $('#own-feedback .details #create-feedback').show();
            $('#own-feedback .details #update-feedback').hide();

            showPrompt('', 'text-danger' , $('#own-feedback .details #create-feedback span'));
        })
    },
    getTopicRetrive() {
        var topicRetrive = $('#own-feedback table tr td[data-click="true"]');
        var titleObj = $('#own-feedback .details input[name="title"]');
        var contentObj = $('#own-feedback .details textarea[name="content"]');
        
        topicRetrive.click(function (event) {
            var topicId = $(event.currentTarget).attr('data-retrive');
  
            ajax(`/api/topic/${topicId}?timestamp=${new Date().getTime()}`, 'get', {
                success(res) {
                    titleObj.val(res.title);
                    contentObj.val(res.content);

                    $('#own-feedback .details #create-feedback').hide();
                    $('#own-feedback .details #update-feedback').show();

                    ownFeedbackComponent.retriveTopicId = topicId;

                    showPrompt('', 'text-danger' , $('#own-feedback .details #update-feedback span'));
                }
            });
        });
    },
    watchInput() {
        var titleObj = $('#own-feedback .details input[name="title"]');
        var contentObj = $('#own-feedback .details textarea[name="content"]');

        var title, content;

        var submitBtn = $('#own-feedback .details button[data-operate="submit"]');
        
        if (!titleObj.val() || !contentObj.val()) {
            submitBtn.attr('disabled', true);
        }

        titleObj.bind('input propertychange', function () {
            title = titleObj.val();

            title !== '' ?  submitBtn.removeAttr('disabled') :  submitBtn.attr('disabled', true);

            showPrompt('', 'text-danger' , $('#own-feedback .details #create-feedback span'));
            
        });

        contentObj.bind('input propertychange', function () {
            content = contentObj.val();

            content !== '' ? submitBtn.removeAttr('disabled') : undefined;

            showPrompt('', 'text-danger' , $('#own-feedback .details #create-feedback span'));
        });

        this.createTopic();
    },
    updateTopic() {
        var updateBtn = $('#own-feedback .details button[data-operate="update"]');

        var titleObj = $('#own-feedback .details input[name="title"]');
        var contentObj = $('#own-feedback .details textarea[name="content"]');
        
        updateBtn.click(function () {

            var title = titleObj.val();
            var content = contentObj.val();

            if (title.length < 5 || content.length <6) {
                showPrompt('标题不得少于5个字并且内容不得少于6个字！', 'text-danger' , $('#own-feedback .details #update-feedback span'));
    
                return;
            }

            ajax(`/api/topic/${ownFeedbackComponent.retriveTopicId}`, 'put', {
                data: window.JSON.stringify({
                    options: {
                        title, content
                    }
                }),
                success: function () {
                    showPrompt('意见反馈更新成功！', 'text-success' , $('#own-feedback .details #update-feedback span'));

                    ownFeedbackComponent.getTableData();
                },
                error: function () {
                    showPrompt('意见反馈更新失败！', 'text-danger' , $('#own-feedback .details #update-feedback span'));
                }
            });
        });
    },
    deleteTopic() {
        var deleteBtn = $('#own-feedback .details button[data-operate="delete"]');
        var titleObj = $('#own-feedback .details input[name="title"]');
        var contentObj = $('#own-feedback .details textarea[name="content"]');

        deleteBtn.click(function () {
            ajax(`/api/topic/${ownFeedbackComponent.retriveTopicId}`, 'delete', {
                dataType: 'html',
                success: function () {
                    ownFeedbackComponent.getTableData();
    
                    titleObj.val('');
                    contentObj.val('');
    
                    $('#own-feedback .details #create-feedback').show();
                    $('#own-feedback .details #update-feedback').hide();
    
                    showPrompt('', 'text-danger' , $('#own-feedback .details #update-feedback span'));
                    showPrompt('', 'text-danger' , $('#own-feedback .details #create-feedback span'));
                }
            })
        });
    },
    filterList() {
        var searchBtn = $('#own-feedback .filters button[data-operate="search"]');
        
        searchBtn.click(function () {
            ownFeedbackComponent.currentNumber = 1;
            ownFeedbackComponent.filteredResult();
        });
    },
    filteredResult() {
        var title = $('#own-feedback .filters input[name="title"]').val();
        var regexp = new RegExp(title);

        var newList = _.filter(ownFeedbackComponent.ownTopicList, function (item) {
            if (regexp.test(item.title)) {
                return item;
            }
        });

        createPagenation('#page-ownfeedback', newList.length, 5, 6, function (currentNumber, showRow) {
            var arr = newList.slice((currentNumber - 1) * showRow, currentNumber * showRow);

            ownFeedbackComponent.currentNumber = currentNumber;

            ownFeedbackComponent.renderTable(arr);
        }, ownFeedbackComponent.currentNumber);
    }
} 