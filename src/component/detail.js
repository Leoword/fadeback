module.exports = function (config) {
    var {title, toolbar} = config;

    return $(`
        <div class="details">
            <h3 class="m-0 mb-1">${title}</h3>
            <div>
                <span class="label">标题：</span> <input name="title" type="text" class="mb-2" /> <br />
                <span class="label">内容：</span> <textarea name="content" style="resize:none" rows="3"></textarea>
                ${!toolbar ? '' : `
                    <div id="create-feedback" class="toolbar">
                        <button class="primary" data-operate="submit">提交</button>
                        <button class="danger" data-operate="reset">重置</button>
                        <span class="ml-2"></span>
                    </div>
                    <div id="update-feedback" class="toolbar">
                        <button class="primary" data-operate="update">更新</button>
                        <button class="danger" data-operate="delete">删除</button>

                        <a data-operate="back" class="ml-2">返回</a>
                        <span class="ml-2"></span>
                    </div>
                `}
            </div>
        </div>
    `);
}