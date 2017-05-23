document.addEventListener('play', function(e){
var audios = document.getElementsByTagName('audio');
for(var i = 0, len = audios.length; i < len;i++){
    if(audios[i] != e.target){
        audios[i].pause();
    }
}

}, true);
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('form', {
            //url: '/form',
            templateUrl: 'templates/form.html',
            controller: 'formController'
        })
        .state('form.one', {
            url: '/',
            templateUrl: 'templates/form-one.html'
        })
        .state('form.two', {
            url: '/',
            templateUrl: 'templates/form-two.html'
        })
        .state('form.three', {
            url: '/',
            templateUrl: 'templates/form-three.html'
        })
        .state('form.threea', {
            url: '/',
            templateUrl: 'templates/form-threea.html'
        })
        .state('form.threeb', {
            url: '/',
            templateUrl: 'templates/form-threeb.html'
        })
        .state('form.four', {
            url: '/',
            templateUrl: 'templates/form-four.html'
        })
        .state('form.five', {
            url: '/',
            templateUrl: 'templates/form-five.html'
        })
        .state('form.six', {
            url: '/',
            templateUrl: 'templates/form-six.html'
        })
        .state('form.end', {
            url: '/',
            templateUrl: 'templates/form-end.html'
        })
        .state('form.plgen', {
            url: '/',
            templateUrl: 'templates/plgen.php'
        })
        .state('form.playlist', {
            url: '/',
            templateUrl: 'includes/playlist-save.php'
        });
       
       
    $urlRouterProvider.otherwise('/');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope, $http, $state){
    
    //we will store all of our form data in this object
    $scope.formData = {};

    //function for reset button
    $scope.reset = function() {
        $scope.formData = {};
        $state.go('form.one');
    };
    $scope.savePlaylist = function(){
        $state.go('form.playlist');
    }
    
    //function to process the form
    $scope.processForm = function() {
       $http({
            method  : 'POST',
            url     : 'includes/process.php',
            data    : $.param($scope.formData),  // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function() {
            $state.go('form.plgen');
        })
        .error(function() {
            alert("Incorrect");
        });     
    };
});

