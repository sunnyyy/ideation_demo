/*
PanoScroll v1.3
Release Date: 	January 13, 2010
Homepage:		http://steve.deadlycomputer.com/portfolio/PanoScroll
Examples: 		http://steve.deadlycomputer.com/portfolio/PanoScroll#examples

Copyright (c) 2010 stephen giorgi

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
(function($){
 	$.fn.extend({ 
 		//plugin name - panoScroll
 		panoScroll: function(options) {

			var defaults = {
				name:			null,
				direction:		"left",
			    scrollSpeed:	60,
				originalPos: 	0,
				numPx:			1,
				auto:			false
				};
			
			var options = $.extend(defaults, options);
		
    		return this.each(function() {
				var o =options;
				
				//the name of the div REQUIRED
				var SN = "#"+o.name;
				//the direction to scroll
				var SD = o.direction;
				
				//the speed at which to scroll
				var SS = o.scrollSpeed;
				
				//the position of the background to be updated through out the scrolling
				//this lets you move it any direction from where you paused it
				var OP = o.originalPos;
				
				//the number of pixles to move the background image at a time
				var NP = o.numPx;
				
				//auto scroll
				var AS = true;
				//controls for autoscroll
				var AC = o.autoControls;
								
				//used to name the timer so you only pause the one you click
				var name = this;
				var obj = $(this);
				
				//posistions the controls within the correct div
				obj.addClass("panView");
				
				//autoscroll
				if(AS == true) {
					//determines the direction to scroll
					//negative px for left/up, positive for right/down
					if(SD == 'left' || SD == 'up')			{ NP = -NP;	}
					else if(SD == 'right' || SD == 'down')	{ NP = NP; 	}
					
					if(SD == 'left' || SD == 'right')
					{
						obj.everyTime(SS, name, function(n){
							OP = OP+NP;
							obj.css("background-position",OP+"px 0");
							return OP;
						});
					}
					else if(SD == 'up' || SD == 'down')
					{
						obj.everyTime(SS, name, function(n) {
							OP = OP+NP;
							obj.css("background-position","0 "+OP+"px");
							return OP;
						});
					}
				} else {	
					//code for scrolling left
					$(SN+" div.sLeft").click(function(){
						//hides the controls so that you can't give it a heart attack clicking left 700 times
						$(SN+" div.sCtrl").fadeOut();
						obj.everyTime(SS, name, function(n) {
							OP = OP-NP;
							obj.css("background-position",OP+"px 0");
							return OP;
							});
					});

					//code for scrolling right
					$("#"+SN+" div.sRight").click(function(){
						$(SN+" div.sCtrl").fadeOut();
						obj.everyTime(SS, name, function(n) {
							OP = OP+NP;
							obj.css("background-position",OP+"px 0");
							return OP;
							});
					});
					
					//code for scrolling up
					$("#"+SN+" div.sUp").click(function(){
						$(SN+" div.sCtrl").fadeOut();
						obj.everyTime(SS, name, function(n) {
							OP = OP-NP;
							obj.css("background-position","0 "+OP+"px");
							return OP;
							});
					});
					//code for scrolling down
					$("#"+SN+" div.sDown").click(function(){
						$(SN+" div.sCtrl").fadeOut();
						obj.everyTime(SS, name, function(n) {
							OP = OP+NP;
							obj.css("background-position","0 "+OP+"px");
							return OP;
							});
					});
					
					//code for pause
					$("#"+SN+" div.sPause").click(function(){ obj.stopTime(name); $(SN+" div.sCtrl").fadeIn(); });
				}
			});
    	}
	});
})(jQuery);

/*jQuery.timers - Timer abstractions for jQuery Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com) Licensed under the WTFPL http://sam.zoy.org/wtfpl/ http://jquery.offput.ca/timers */
jQuery.fn.extend({everyTime:function(a,b,c,d){return this.each(function(){jQuery.timer.add(this,a,b,c,d)})},oneTime:function(a,b,c){return this.each(function(){jQuery.timer.add(this,a,b,c,1)})},stopTime:function(a,b){return this.each(function(){jQuery.timer.remove(this,a,b)})}});jQuery.extend({timer:{global:[],guid:1,dataKey:"jQuery.timer",regex:/^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1000,das:10000,hs:100000,ks:1000000},timeParse:function(c){if(c==undefined||c==null){return null}var a=this.regex.exec(jQuery.trim(c.toString()));if(a[2]){var b=parseFloat(a[1]);var d=this.powers[a[2]]||1;return b*d}else{return c}},add:function(d,b,c,f,h){var a=0;if(jQuery.isFunction(c)){if(!h){h=f}f=c;c=b}b=jQuery.timer.timeParse(b);if(typeof b!="number"||isNaN(b)||b<0){return}if(typeof h!="number"||isNaN(h)||h<0){h=0}h=h||0;var g=jQuery.data(d,this.dataKey)||jQuery.data(d,this.dataKey,{});if(!g[c]){g[c]={}}f.timerID=f.timerID||this.guid++;var e=function(){if((++a>h&&h!==0)||f.call(d,a)===false){jQuery.timer.remove(d,c,f)}};e.timerID=f.timerID;if(!g[c][f.timerID]){g[c][f.timerID]=window.setInterval(e,b)}this.global.push(d)},remove:function(c,b,d){var e=jQuery.data(c,this.dataKey),a;if(e){if(!b){for(b in e){this.remove(c,b,d)}}else{if(e[b]){if(d){if(d.timerID){window.clearInterval(e[b][d.timerID]);delete e[b][d.timerID]}}else{for(var d in e[b]){window.clearInterval(e[b][d]);delete e[b][d]}}for(a in e[b]){break}if(!a){a=null;delete e[b]}}}for(a in e){break}if(!a){jQuery.removeData(c,this.dataKey)}}}}});jQuery(window).bind("unload",function(){jQuery.each(jQuery.timer.global,function(a,b){jQuery.timer.remove(b)})});