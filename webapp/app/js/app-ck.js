"use strict";(function(e){angular.module("dscover.me",["ngRoute","ngAnimate"]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"partials/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}])})(window);