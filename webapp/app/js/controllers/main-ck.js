"use strict";angular.module("dscover.me").controller("MainCtrl",function(e,t,n){e.title="dscover.me";t.get("albums.json").success(function(t){e.albums=t});var r=!1,i=!1,s=e.play,o=e.pause;e.play=function(){var t=e.albums,i={album:0,track:0};if(!t.length)return;n.src=t[i.album].tracks[i.track].url;n.play();r=!0};e.pause=function(){i=!0;r=!1;n.pause()}}).factory("audio",function(e){var t=e[0].createElement("audio");return t});