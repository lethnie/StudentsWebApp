﻿var app = angular.module('StudApp', []);

app.controller('StudController', ['$scope', '$http', function ($scope, $http) {
    $http.get('api/students')
        .success(function (students) {
            $scope.students = students;
        });
    $scope.deleteStudent = function (studId) {
        $http.delete('api/students/' + studId)
            .success(function () {
                alert("Студент успешно удалён из базы данных.");
                $.each($scope.students, function (i) {
                    if ($scope.students[i].Id == studId) {
                        $scope.students.splice(i, 1);
                        return false;
                    }
                });
            })
            .error(function () {
                alert("Ошибка! Студент не был удалён из базы данных.");
            })
    };
    $scope.updateStudent = function () {
        $http.put('api/students/' + $scope.selectedStudent.Id, $scope.selectedStudent)
            .success(function () {
                alert("Студент " + $scope.selectedStudent.Name + " успешно изменён.");
                $.each($scope.students, function (i) {
                    if ($scope.students[i].Id == $scope.selectedStudent.Id) {
                        $scope.students[i] = $scope.selectedStudent;
                        return false;
                    }
                });
            })
            .error(function () {
                alert("Ошибка! Студент " + $scope.selectedStudent.Name + " не был изменён");
            });
        document.getElementById('edit_student_form').style.visibility = 'hidden';
        $scope.selectedStudent = null;
    };
    $scope.addStudent = function () {
        $http.post('/api/students/', $scope.selectedStudent)
            .success(function (data) {
                alert("Студент " + data.Name + " успешно добавлен.");
                $scope.students.push(data);
            }
        )
        .error(function () {
            alert("Ошибка! Студент не был добавлен.");
        });
        document.getElementById('edit_student_form').style.visibility = 'hidden';
    };
    $scope.editStudent = function (student) {
        $scope.selectedStudent = student;
        document.getElementById('edit_student_form').style.visibility = 'visible';
    };
    $scope.newStudent = function () {
        $scope.selectedStudent = {Name: "", Age: 0, Id: -1};
        document.getElementById('edit_student_form').style.visibility = 'visible';
    };
    $scope.addOrUpdateStudent = function () {
        if ($scope.selectedStudent.Id == -1) {
            $scope.addStudent();
        }
        else {
            $scope.updateStudent();
        }
    };


    $http.get('api/courses')
        .success(function (courses) {
            $scope.courses = courses;
        });
    $scope.deleteCourse = function (courseId) {
        $http.delete('api/courses/' + courseId)
            .success(function () {
                alert("Курс успешно удалён.");
                $.each($scope.courses, function (i) {
                    if ($scope.courses[i].Id == courseId) {
                        $scope.courses.splice(i, 1);
                        return false;
                    }
                });
            })
            .error(function () {
                alert("Ошибка! Курс не был удалён из базы данных.");
            });
    };
    $scope.updateCourse = function () {
        $http.put('api/courses/' + $scope.selectedCourse.Id, $scope.selectedCourse)
            .success(function () {
                alert("Курс " + $scope.selectedCourse.Title + " успешно изменён.");
                $.each($scope.courses, function (i) {
                    if ($scope.courses[i].Id == $scope.selectedCourse.Id) {
                        $scope.courses[i] = $scope.selectedCourse;
                        return false;
                    }
                });
            })
            .error(function () {
                alert("Ошибка! Курс " + $scope.selectedCourse.Title + " не был изменён.");
            });
        document.getElementById('edit_student_course_form').style.visibility = 'hidden';
        $scope.selectedCourse = null;
    };
    $scope.addCourse = function () {
        $http.post('/api/courses/', $scope.selectedCourse)
            .success(function (data) {
                alert("Курс " + data.Title + "успешно добавлен.");
                $scope.courses.push(data);
            }
        )
        .error(function () {
            alert("Ошибка! Курс не был добавлен.");
        });
        document.getElementById('edit_course_form').style.visibility = 'hidden';
    };
    $scope.editCourse = function (course) {
        $scope.selectedCourse = course;
        document.getElementById('edit_course_form').style.visibility = 'visible';
    };
    $scope.newCourse = function () {
        $scope.selectedCourse = { Title: "", Lecturer: "", Id: -1 };
        document.getElementById('edit_course_form').style.visibility = 'visible';
    };
    $scope.addOrUpdateCourse = function () {
        if ($scope.selectedCourse.Id == -1) {
            $scope.addCourse();
        }
        else {
            $scope.updateCourse();
        }
    };

    $http.get('api/studentscourses')
        .success(function (students_courses) {
            $scope.students_courses = students_courses;
        });
    $scope.deleteStudentCourse = function (studentscoursesId) {
        $http.delete('api/studentscourses/' + studentscoursesId)
            .success(function () {
                alert("Соответствие студента и курса успешно удалено.");
                $.each($scope.students_courses, function (i) {
                    if ($scope.students_courses[i].Id == studentscoursesId) {
                        $scope.students_courses.splice(i, 1);
                        return false;
                    }
                });
            })
            .error(function () {
                alert("Ошибка! Соответствие студента и курса не было удалено из базы данных.");
            });
    };
    $scope.updateStudentCourse = function () {
        $http.put('api/studentscourses/' + $scope.selectedStudentCourse.Id, $scope.selectedStudentCourse)
        .success(function () {
            alert("Соответствие студента и курса успешно изменено.");
            $.each($scope.students_courses, function (i) {
                if ($scope.students_courses[i].Id == $scope.selectedStudentCourse.Id) {
                    $scope.students_courses[i] = $scope.selectedStudentCourse;
                    return false;
                }
            });
        })
        .error(function () {
            alert("Ошибка! Соответствие студента и курса не было изменено.");
        });
        document.getElementById('edit_student_course_form').style.visibility = 'hidden';     
    };
    $scope.addStudentCourse = function () {
        $http.post('/api/studentscourses/', $scope.selectedStudentCourse)
            .success(function (data) {
                alert("Соответствие студента и курса успешно добавлено.");
                $scope.students_courses.push(data);
            }
        )
        .error(function () {
            alert("Ошибка! Соответствие студента и курса не было добавлено.");
        });
        document.getElementById('edit_student_course_form').style.visibility = 'hidden';
    };
    $scope.editStudentCourse = function (student_course) {
        $scope.selectedStudentCourse = student_course;
        document.getElementById('edit_student_course_form').style.visibility = 'visible';
    };
    $scope.newStudentCourse = function () {
        $scope.selectedStudentCourse = { StudentId: -1, CourseId: -1, Id: -1 };
        document.getElementById('edit_student_course_form').style.visibility = 'visible';
    };
    $scope.addOrUpdateStudentCourse = function () {
        if ($scope.selectedStudentCourse.Id == -1) {
            $scope.addStudentCourse();
        }
        else {
            $scope.updateStudentCourse();
        }
    };
}]);