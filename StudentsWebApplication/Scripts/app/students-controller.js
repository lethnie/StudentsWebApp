var app = angular.module('StudApp', []);

app.controller('StudController', ['$scope', '$http', function ($scope, $http) {
    $http.get('api/students')
        .success(function (students) {
            $scope.students = $.parseJSON(students);
        });
    $http.get('api/courses')
        .success(function (courses) {
            $scope.courses = $.parseJSON(courses);
        });
    $http.get('api/studentscourses')
        .success(function (students_courses) {
            $scope.students_courses = $.parseJSON(students_courses);
        });
}]);