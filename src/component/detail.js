module.exports = function (config) {
    var {title, toolbar} = config;

    return $(`
        <div class="details">
            <h3 class="m-0 mb-1">${title}</h3>
            <form>
                <span class="label">标题：</span> <input name="title" type="text" class="mb-2" /> <br />
                <span class="label">内容：</span> <textarea name="content" style="resize:none" rows="3"></textarea>
                ${!toolbar ? '' : `
                    <div id="create-feedback" class="toolbar">
                        <button class="primary">提交</button>
                        <button class="danger">重置</button>
                    </div>
                    <div id="update-feedback" class="toolbar">
                        <button class="primary">更新</button>
                        <button class="danger">删除</button>
                    </div>
                `}
            </form>
        </div>
    `);
}