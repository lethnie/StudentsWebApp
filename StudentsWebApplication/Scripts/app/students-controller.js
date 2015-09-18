var app = angular.module('StudApp', []);

app.controller('StudController', ['$scope', '$http', function ($scope, $http) {
    $http.get('api/students')
        .success(function (students) {
            $scope.students = students;
        });
    $scope.deleteStudent = function (studId) {
        $http.delete('api/students/' + studId)
            .success(function () {
                alert("Студент с идентификатором " + studId + " успешно удалён из базы данных.");
                $http.get('api/students')
                    .success(function (students) {
                        $scope.students = students;
                    });
            })
            .error(function () {
                alert("Ошибка! Студент с идентификатором " + studId + " не был удалён из базы данных.");
            })
    };
    $scope.updateStudent = function () {
        $http.put('api/students/' + $scope.selectedStudent.Id, $scope.selectedStudent)//{ "id": $scope.selectedStudent.Id, "name": name, "age": age })
            .success(function () {
                alert("Студент с идентификатором " + $scope.selectedStudent.Id + " успешно изменён.");
                $http.get('api/students')
                    .success(function (students) {
                        $scope.students = students;
                    });
            })
            .error(function () {
                alert("Ошибка! Студент с идентификатором " + studId + " не был изменён");
            });
        document.getElementById('edit_student_form').style.visibility='hidden';
    };
    $scope.editStudent = function (student) {
        $scope.selectedStudent = student;
        document.getElementById('edit_student_form').style.visibility = 'visible';
    };



    $http.get('api/courses')
        .success(function (courses) {
            $scope.courses = courses;
        });
    $scope.deleteCourse = function (courseId) {
        $http.delete('api/courses/' + courseId)
            .success(function () {
                alert("Курс с идентификатором " + courseId + " успешно удалён.");
                $http.get('api/courses')
                    .success(function (courses) {
                        $scope.courses = courses;
                    });
            })
            .error(function () {
                alert("Ошибка! Курс с идентификатором " + courseId + " не был удалён из базы данных.");
            });
    };
    $scope.updateCourse = function () {
        $http.put('api/courses/' + $scope.selectedCourse.Id, $scope.selectedCourse)
            .success(function () {
                alert("Курс с идентификатором " + $scope.selectedCourse.Id + " успешно изменён.");
                $http.get('api/courses')
                    .success(function (courses) {
                        $scope.courses = courses;
                    });
            })
            .error(function () {
                alert("Ошибка! Курс с идентификатором " + courseId + " не был изменён.");
            });
        document.getElementById('edit_student_course_form').style.visibility = 'hidden';
    };
    $scope.editCourse = function (course) {
        $scope.selectedCourse = course;
        document.getElementById('edit_course_form').style.visibility = 'visible';
    };


    $http.get('api/studentscourses')
        .success(function (students_courses) {
            $scope.students_courses = students_courses;
        });
    $scope.deleteStudentCourse = function (studentscoursesId) {
        $http.delete('api/studentscourses/' + studentscoursesId)
            .success(function () {
                alert("Соответствие студента и курса с идентификатором " + studentscoursesId + " успешно удалено.");
                $http.get('api/studentscourses')
                    .success(function (students_courses) {
                        $scope.students_courses = students_courses;
                    });
            })
            .error(function () {
                alert("Ошибка! Соответствие студента и курса с идентификатором " + studentscoursesId + " не было удалено из базы данных.");
            });
    };
    $scope.updateStudentCourse = function () {
        $http.put('api/studentscourses/' + $scope.selectedStudentCourse.Id, $scope.selectedStudentCourse)
            .success(function () {
                alert("Соответствие студента и курса с идентификатором " + studentscoursesId + " успешно изменено.");
                $http.get('api/studentscourses')
                    .success(function (students_courses) {
                        $scope.students_courses = students_courses;
                    });
            })
            .error(function () {
                alert("Ошибка! Соответствие студента и курса с идентификатором " + studentscoursesId + " не было изменено.");
            });
        document.getElementById('edit_student_course_form').style.visibility = 'hidden';
    };
    $scope.editStudentCourse = function (student_course) {
        $scope.selectedStudentCourse = student_course;
        document.getElementById('edit_student_course_form').style.visibility = 'visible';
    };
}]);