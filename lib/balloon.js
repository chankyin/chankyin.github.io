/*
 * chankyin.github.io
 *
 * Copyright (C) 2016 chankyin
 */

var isset = function(value){
	return typeof value !== typeof undefined;
}

var assert = function(condition, message){
	if(!isset(message)) message = "AssertionError";
	else message = "AssertionError: " + message;
	if(!condition){
		console.assert(message);
		throw message;
	}
};

var assertTypeof = function(value, type, message){
	if(!isset(message)) message = "Value of type " + (typeof type) + "expected, got " + (typeof value);
	assert(typeof value === type, message);
};

// class Balloon
function Balloon(tag){
	this.name = tag.attr("data-balname");
	this.id = Balloons.allocId();
	this.tag = tag;
	this.opened = false;
	this.mouthpiece = null;
	tag.attr("data-balloon-id", this.id);
};
Balloon.prototype.getName = function(){
	return this.name;
};
Balloon.prototype.getId = function(){
	return this.id;
};
Balloon.prototype.isOpened = function(){
	return this.opened;
};
Balloon.prototype.register = function(){
	Balloons.list[this.id] = this;
};
Balloon.prototype.init = function(){
	this.register();

	var content = $("<div></div>");
	content.addClass("balloon-content");
	content.attr("data-balloon-id", this.id);
	this.tag.wrapInner(content);
	var depth = this.tag.parents(".balloon").length + 1;
	this.tag.attr("data-balloon-depth", depth);
	this.tag.prepend("<hr>");

	var pivot = $("<div></div>");
	pivot.addClass("balloon-pivot");
	pivot.attr("data-balloon-id", this.id);

	var title = $("<span></span>");
	title.text(this.name);
	title.addClass("balloon-title");
	title.addClass("balloon-title-" + depth);
	pivot.append(title);

	var mouthpiece = $("<button></button>");
	mouthpiece.addClass("balloon-mouthpiece");
	pivot.append(mouthpiece);
	this.mouthpiece = mouthpiece;

	pivot.click(function(){
		var $this = $(this);
		var balloon = Balloons.list[$this.attr("data-balloon-id")];
		balloon.setOpened(!balloon.isOpened());
	});

	this.tag.prepend(pivot);
	this.setOpened(this.tag.attr("data-balloon-opened") === "on");
};
Balloon.prototype.setOpened = function(bool){
	var content = $(".balloon-content[data-balloon-id=" + this.id + "]");
	if(bool){
		this.opened = true;
		content.css("display", "block");
		this.mouthpiece.text("Collapse");
	}else{
		this.opened = false;
		content.css("display", "none");
		this.mouthpiece.text("Expand");
	}
};

// util class Balloon
var Balloons = {
	balloonCount: 0,
	allocId: function(){
		return Balloons.balloonCount++;
	},
	list: {},
	/*
	addBalloon: function($this){
		var innerWrapper = $("<div></div>");
		innerWrapper.addClass("balloon-content");
		var balloonId = Balloons.allocId();
		innerWrapper.attr("data-balloon-id", balloonId);
		$this.wrapInner(innerWrapper);
		
	},
	buildAnchor: function(balloonName, balloonId){
		var anchor = $("<div></div>");
		anchor.addClass("balloon-anchor");

		var title = $("<span></span>");
		title.addClass("balloon-anchor-title");
		title.text(balloonName);
		anchor.append(title);

		var mouthpiece = $("<button></buton>");
		mouthpiece.add
		return anchor;
	}*/
};

$(document).ready(function(){
	assertTypeof($, "function", "jQuery not loaded");
	$(".balloon").each(function(){
		var bal = new Balloon($(this));
		bal.init();
	});
	console.info("Balloons initialized");
});

