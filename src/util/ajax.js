var _ = require('underscore');

function assign() {
	var origin = arguments[0];

	_.each(arguments, function (item) {

		if (item) {

			var keyList = _.keys(item);
	
			_.each(keyList, function (key, index) {
				origin[key] = item[key];
			});
		}
	})

	return origin;
}

module.exports = function (url, method, options) {

	var baseOptions = {
		url: url,
		type: method,
		dataType: 'json',
		contentType: 'application/json',
		headers: {
			Accept: 'application/json; charset=utf-8'
		}
	};

	$.ajax(assign({}, baseOptions, options));

}