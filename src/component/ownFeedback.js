var detailFactory = require('./detail');
var tableFactory = require('./table');

var detailRetrive = detailFactory({
    title: '意见反馈',
    toolbar: true
});


module.exports = function () {
    var ownFeedback = $('#own-feedback');

    ownFeedback.prepend(detailRetrive);

    ownFeedback.append(tableFactory({
        serial: '序号',
        title: '标题',
        deal: '处理人员',
        'create-time': '创建时间'
    }));
}