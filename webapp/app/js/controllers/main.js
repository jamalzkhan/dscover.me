'use strict';


angular.module('dscover.me')
.controller('MainCtrl', function ($scope, $http, audio, $compile)  {

		$scope.title = 'dscover.me';
    $http.get('tracks.json', { cache: true}).success(function(response)
    {
      $scope.tracks = response;
    });

    // Set player variables
    $scope.current = 0;
    $scope.playing = false;
    $scope.paused = false;
    $scope.muted = false;

    // Set volume variables
      $scope.volumes = {
        default: 0.5,
        options: {
          orientation: 'vertical',
          min: 0.00,
          max: 1.00,
          step: 0.1,
          range: 'min',
          change: setVolume,
          slide: setVolume
        }
      };


    // Play Button
    $scope.play = function() {
        if (!$scope.tracks.length) return;
        if(!$scope.paused) audio.src = $scope.tracks[$scope.current].url;
        audio.play();
        $scope.playing = true;
    }

    // Pause Button
    $scope.pause = function() {
      if($scope.playing) {
        audio.pause();
        $scope.playing = false
        $scope.paused = true
      }
    }

    // Next Button
    $scope.next = function() {
      $scope.paused = false;
      if ($scope.tracks.length > ($scope.current + 1)) {
      $scope.current++;
      } else {
        $scope.current = 0;
      }
       if($scope.playing) $scope.play();
    }
    // Previous Button
    $scope.prev = function() {
      $scope.paused = false;
      if ($scope.current > 0) {
      $scope.current--;
      $scope.play();
      }
    }

    $scope.volumeUp = function() {
      audio.volume += 0.1;
    }
    $scope.volumeDown = function() {
      if(audio.volume <= 1) {
        return false;
      } else {
      audio.volume -+ 1;
     }
  }

  $scope.muteVolume = function() {
    if($scope.muted == true) {
      $scope.muted = false;
      $scope.volumes.default = 0.5;
    } else {
      audio.volume = 0;
      $scope.volumes.default = 0.00;
      $scope.muted = true;
    }
  }
    function setVolume () {
      if($scope.volumes.default == 0) {
        $scope.$apply($scope.muted = true);
      } 
      audio.volume = $scope.volumes.default;
    }


    audio.addEventListener('ended', function() {
      $scope.$apply($scope.next);
    })
    audio.addEventListener("timeupdate", function(){    
      var duration = document.getElementById('duration');
      var s = parseInt(audio.currentTime % 60);
      var total = audio.duration;
      var totalAmount = s / total * 100;

      $(".progress").html($compile("<div class='progress-bar' style='width:" + totalAmount + "%'><span class='sr-only'>60% Complete</span></div>")($scope));
    }, false);

})
  // extract the audio for making the player easier to test
.factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
});
