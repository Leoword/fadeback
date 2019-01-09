var detailFactory = require('./detail');
var tableFactory = require('./table');

var detailRetrive = detailFactory({
    title: '意见反馈查看',
    toolbar: false
});


module.exports = function () {
    var allFeedback = $('#all-feedback');

    allFeedback.prepend(detailRetrive);

    allFeedback.append(tableFactory({
        serial: '序号',
        title: '标题',
        origin: '来源用户',
        deal: '处理人员',
        'create-time': '创建时间'
    }));
}