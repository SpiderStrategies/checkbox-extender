var through = require('through')


function createTransform(exp, transform) {
	return function(file) {
	    var data = ''
	    return through(write, end)

	    function write (buf) { data += buf }
	    function end () {
	    	data = data.replace(exp, transform);
	        this.queue(data);
	        this.queue(null);
	    }
	}
}

module.exports = createTransform(/<input.*?type="checkbox".*?>/gim, function(x) {
	return x + '<svg>\
					<use xlink:href="#checkbox-inner-shadow"/>\
					<use xlink:href="#blue-check"/>\
					<use class="unchecked-unfocused" xlink:href="#icon-checkbox-unchecked-unfocused"/>\
					<use class="unchecked-focused" xlink:href="#icon-checkbox-unchecked-focused"/>\
					<use class="checked-unfocused" xlink:href="#icon-checkbox-checked-unfocused"/>\
					<use class="checked-focused" xlink:href="#icon-checkbox-checked-focused"/>\
				</svg>'
})

module.exports.configure = function(opts) {
	return module.exports
}
