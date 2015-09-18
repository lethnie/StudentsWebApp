var app = angular.module('StudApp', []);

app.controller('StudController', ['$scope', '$http', function ($scope, $http) {
    $http.get('api/students')
        .success(function (students) {
            $scope.students = $.parseJSON(students);
        });
    $scope.deleteStudent = function (studId) {
        $http.delete('api/students/' + studId)
            .success(function (result) {
                alert(result);
                $http.get('api/students')
                    .success(function (students) {
                        $scope.students = $.parseJSON(students);
                    });
            })    
    };
    $scope.updateStudent = function () {
        $http.put('api/students/' + studId, name, age)
            .success(function (result) {
                alert(result);
                $http.get('api/students')
                    .success(function (students) {
                        $scope.students = $.parseJSON(students);
                    });
            })
    };

    $http.get('api/courses')
        .success(function (courses) {
            $scope.courses = $.parseJSON(courses);
        });
    $scope.deleteCourse = function (courseId) {
        $http.delete('api/courses/' + courseId)
            .success(function (result) {
                alert(result);
                $http.get('api/courses')
                    .success(function (courses) {
                        $scope.courses = $.parseJSON(courses);
                    });
            })
    };
    $scope.updateCourse = function () {
        $http.put('api/courses/' + courseId, title, lecturer)
            .success(function (result) {
                alert(result);
                $http.get('api/courses')
                    .success(function (courses) {
                        $scope.courses = $.parseJSON(courses);
                    });
            })
    };


    $http.get('api/studentscourses')
        .success(function (students_courses) {
            $scope.students_courses = $.parseJSON(students_courses);
        });
    $scope.deleteStudentCourse = function (studentscoursesId) {
        $http.delete('api/studentscourses/' + studentscoursesId)
            .success(function (result) {
                alert(result);
                $http.get('api/studentscourses')
                    .success(function (students_courses) {
                        $scope.students_courses = $.parseJSON(students_courses);
                    });
            })
    };
    $scope.updateStudentCourse = function () {
        $http.put('api/studentscourses/' + studentscoursesId, studId, courseId)
            .success(function (result) {
                alert(result);
                $http.get('api/studentscourses')
                    .success(function (students_courses) {
                        $scope.students_courses = $.parseJSON(students_courses);
                    });
            })
    };
}]);