var normal = document.getElementById("nav-menu");
var reverse = document.getElementById("nav-menu-left");

var icon = normal !== null ? normal : reverse;

// Toggle the "menu-open" % "menu-opn-left" classes
function toggle() {
	  var navRight = document.getElementById("nav");
	  var navLeft = document.getElementById("nav-left");
	  var nav = navRight !== null ? navRight : navLeft;

	  var button = document.getElementById("menu");
	  var site = document.getElementById("wrap");
	  
	  if (nav.className == "menu-open" || nav.className == "menu-open-left") {
	  	  nav.className = "";
	  	  button.className = "";
	  	  site.className = "";
	  } else if (reverse !== null) {
	  	  nav.className += "menu-open-left";
	  	  button.className += "btn-close";
	  	  site.className += "fixed";
	  } else {
	  	  nav.className += "menu-open";
	  	  button.className += "btn-close";
	  	  site.className += "fixed";
	    }
	}

// Ensures backward compatibility with IE old versions
function menuClick() {
	if (document.addEventListener && icon !== null) {
		icon.addEventListener('click', toggle);
	} else if (document.attachEvent && icon !== null) {
		icon.attachEvent('onclick', toggle);
	} else {
		return;
	}
}

menuClick();




// Diet Count

var diet_count = document.getElementById('diet-time');

function countdays(date) {
	var old_date = new Date(date);
	var new_date = new Date();

	var diff = Math.abs(new_date.getTime() - old_date.getTime());
	
	var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

	diet_count.innerHTML = diffDays + ' ' + 'Days';

}

if (diet_count) {
	diet_count.addEventListener("load", countdays(diet_count.attributes['data-diet-time']['value']));
}




// Search
!function t(e,r,n){function i(u,a){if(!r[u]){if(!e[u]){var c="function"==typeof require&&require;if(!a&&c)return c(u,!0);if(o)return o(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=r[u]={exports:{}};e[u][0].call(s.exports,function(t){return i(e[u][1][t]||t)},s,s.exports,t,e,r,n)}return r[u].exports}for(var o="function"==typeof require&&require,u=0;u<n.length;u++)i(n[u]);return i}({1:[function(t,e,r){"use strict";function n(t,e){return function(){if(4===t.readyState&&200===t.status)try{e(null,JSON.parse(t.responseText))}catch(t){e(t,null)}}}function i(){return window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")}e.exports={load:function(t,e){var r=i();r.open("GET",t,!0),r.onreadystatechange=n(r,e),r.send()}}},{}],2:[function(t,e,r){"use strict";e.exports=function t(e){if(!function(t){return!!t&&void 0!==t.required&&t.required instanceof Array}(e))throw new Error("-- OptionsValidator: required options missing");if(!(this instanceof t))return new t(e);var r=e.required;this.getRequiredOptions=function(){return r},this.validate=function(t){var e=[];return r.forEach(function(r){void 0===t[r]&&e.push(r)}),e}}},{}],3:[function(t,e,r){"use strict";function n(t){return!!t&&"[object Object]"===Object.prototype.toString.call(t)}function i(t){return!!t&&"[object Array]"===Object.prototype.toString.call(t)}function o(t){return p.push(t),p}function u(t){for(var e=[],r=0;r<t.length;r++)n(t[r])&&e.push(o(t[r]));return e}function a(t,e,r,n){for(var i=[],o=0;o<t.length&&i.length<n.limit;o++){var u=c(t[o],e,r,n);u&&i.push(u)}return i}function c(t,e,r,n){for(var i in t)if(!s(t[i],n.exclude)&&r.matches(t[i],e))return t}function s(t,e){var r=!1;e=e||[];for(var n=0;n<e.length;n++){var i=e[n];!r&&new RegExp(t).test(i)&&(r=!0)}return r}e.exports={put:function(t){return n(t)?o(t):i(t)?u(t):void 0},clear:function(){return p.length=0,p},get:function(){return p},search:function(t){return t?a(p,t,h.searchStrategy,h):[]},setOptions:function(t){(h=t||{}).fuzzy=t.fuzzy||!1,h.limit=t.limit||10,h.searchStrategy=t.fuzzy?f:l}};var f=t("./SearchStrategies/FuzzySearchStrategy"),l=t("./SearchStrategies/LiteralSearchStrategy"),p=[],h={};h.fuzzy=!1,h.limit=10,h.searchStrategy=h.fuzzy?f:l},{"./SearchStrategies/FuzzySearchStrategy":4,"./SearchStrategies/LiteralSearchStrategy":5}],4:[function(t,e,r){"use strict";e.exports=new function(){function t(t){var e=t.trim().split("").join(".*?").replace("??","?");return new RegExp(e,"gi")}this.matches=function(e,r){return"string"==typeof e&&"string"==typeof r&&!!t(r).test(e)}}},{}],5:[function(t,e,r){"use strict";e.exports=new function(){this.matches=function(t,e){return"string"==typeof t&&(t=t.trim()).toLowerCase().indexOf(e.toLowerCase())>=0}}},{}],6:[function(t,e,r){"use strict";e.exports={compile:function(t){return n.template.replace(n.pattern,function(e,r){var i=n.middleware(r,t[r],n.template);return void 0!==i?i:t[r]||e})},setOptions:function(t){n.pattern=t.pattern||n.pattern,n.template=t.template||n.template,"function"==typeof t.middleware&&(n.middleware=t.middleware)}};var n={};n.pattern=/\{(.*?)\}/g,n.template="",n.middleware=function(){}},{}],7:[function(t,e,r){!function(e,r,n){"use strict";function i(t){g.put(t),c()}function o(t){y.load(t,function(e,r){e&&p("failed to get JSON ("+t+")"),i(r)})}function u(){h.resultsContainer.innerHTML=""}function a(t){h.resultsContainer.innerHTML+=t}function c(){h.searchInput.addEventListener("keyup",function(t){var e=t.which,r=t.target.value;l(e)&&f(r)&&(u(),s(g.search(r)))})}function s(t){if(0===t.length)return a(h.noResultsText);for(var e=0;e<t.length;e++)a(m.compile(t[e]))}function f(t){return t&&t.length>0}function l(t){return-1===[13,16,20,37,38,39,40,91].indexOf(t)}function p(t){throw new Error("SimpleJekyllSearch --- "+t)}var h={searchInput:null,resultsContainer:null,json:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',templateMiddleware:function(){},noResultsText:"No results found",limit:10,fuzzy:!1,exclude:[]},d=["searchInput","resultsContainer","json"],m=t("./Templater"),g=t("./Repository"),y=t("./JSONLoader"),S=t("./OptionsValidator")({required:d}),v=t("./utils");e.SimpleJekyllSearch=function(t){S.validate(t).length>0&&p("You must specify the following required options: "+d),h=v.merge(h,t),m.setOptions({template:h.searchResultTemplate,middleware:h.templateMiddleware}),g.setOptions({fuzzy:h.fuzzy,limit:h.limit}),v.isJSON(h.json)?i(h.json):o(h.json)},e.SimpleJekyllSearch.init=e.SimpleJekyllSearch}(window,document)},{"./JSONLoader":1,"./OptionsValidator":2,"./Repository":3,"./Templater":6,"./utils":8}],8:[function(t,e,r){"use strict";e.exports={merge:function(t,e){var r={};for(var n in t)r[n]=t[n],void 0!==e[n]&&(r[n]=e[n]);return r},isJSON:function(t){try{return!!(t instanceof Object&&JSON.parse(JSON.stringify(t)))}catch(t){return!1}}}},{}]},{},[7]);


SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: 'https://www.rahehidayat.ca/search.json',
  searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
  limit: 20
})

var close = document.getElementsByClassName("close-btn")[0];
var search_toggle = document.getElementsByClassName("search-box")[0];
var search_cont = document.getElementsByClassName("search")[0];
var search_box = document.getElementsByClassName("s-box")[0];

close.addEventListener('click', function() {
	search_cont.classList.remove('s-flex');
});

search_toggle.addEventListener('click', function() {
	search_cont.className += " s-flex";
	search_box.focus();
});