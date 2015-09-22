var app = angular.module('StudApp', []);

app.controller('StudController', ['$scope', '$http', function ($scope, $http) {
    $http.get('api/students')
        .success(function (students) {
            $scope.students = students;
        });
    
    $scope.deleteStudent = function () {
        $http.delete('api/students/' + $scope.selectedStudent.Id)
            .success(function () {
                alertMessage(true, "Студент успешно удалён из базы данных.");
                $.each($scope.students, function (i) {
                    if ($scope.students[i].Id == $scope.selectedStudent.Id) {
                        $scope.students.splice(i, 1);
                        return false;
                    }
                });
                $.each($scope.students_courses, function (i) {
                    if ($scope.students_courses[i].IdStudent == $scope.selectedStudent.Id) {
                        $scope.students_courses.splice(i, 1);
                        return false;
                    }
                });
            })
            .error(function () {
                alertMessage(false, "<strong>Ошибка!</strong> Студент не был удалён из базы данных.");
            })
        $('#delete_student_form').css('visibility', 'hidden');
        disableEditor();
    };
    $scope.updateStudent = function () {
        $http.put('api/students/' + $scope.selectedStudent.Id, $scope.selectedStudent)
            .success(function () {
                alertMessage(true, "Студент " + $scope.selectedStudent.Name + " успешно изменён.");
                $.each($scope.students, function (i) {
                    if ($scope.students[i].Id == $scope.selectedStudent.Id) {
                        $scope.students[i] = $scope.selectedStudent;
                        return false;
                    }
                });
                $.each($scope.students_courses, function (i) {
                    if ($scope.students_courses[i].IdStudent == $scope.selectedStudent.Id) {
                        $scope.students_courses[i].Name = $scope.selectedStudent.Name;
                        return false;
                    }
                });
            })
            .error(function () {
                alertMessage(false, "<strong>Ошибка!</strong> Студент " + $scope.selectedStudent.Name + " не был изменён");
            });
        $('#edit_student_form').css('visibility', 'hidden');
        disableEditor();
    };
    $scope.addStudent = function () {
        $http.post('/api/students/', $scope.selectedStudent)
            .success(function (data) {
                alertMessage(true, "Студент " + data.Name + " успешно добавлен.");
                $scope.students.push(data);
            }
        )
        .error(function () {
            alertMessage(false, "<strong>Ошибка!</strong> Студент не был добавлен.");
        });
        $('#edit_student_form').css('visibility', 'hidden');
        disableEditor();
    };
    $scope.editStudent = function (student) {
        $scope.selectedStudent = { Name: student.Name, Age: student.Age, Id: student.Id };
        enableEditor();
        $('#edit_student_form').css('visibility', 'visible');
    };
    $scope.newStudent = function () {
        $scope.selectedStudent = { Name: "", Age: null, Id: -1 };
        enableEditor();
        $('#edit_student_form').css('visibility', 'visible');
    };
    $scope.deleteStudentPrep = function (student) {
        $scope.selectedStudent = student;
        enableEditor();
        $('#delete_student_form').css('visibility', 'visible');
    }
    $scope.addOrUpdateStudent = function () {       
        if ($scope.selectedStudent.Id == -1) {
            $scope.addStudent();
        }
        else {
            $scope.updateStudent();
        }
    };
    $scope.editStudentCancel = function () {
        disableEditor();
        $('#delete_student_form').css('visibility', 'hidden');
        $('#edit_student_form').css('visibility', 'hidden');
    }

    $http.get('api/courses')
        .success(function (courses) {
            $scope.courses = courses;
        });
    $scope.deleteCourse = function () {
        $http.delete('api/courses/' + $scope.selectedCourse.Id)
            .success(function () {
                alertMessage(true, "Курс успешно удалён.");
                $.each($scope.courses, function (i) {
                    if ($scope.courses[i].Id == $scope.selectedCourse.Id) {
                        $scope.courses.splice(i, 1);
                        return false;
                    }
                });
                $.each($scope.students_courses, function (i) {
                    if ($scope.students_courses[i].IdCourse == $scope.selectedCourse.Id) {
                        $scope.students_courses.splice(i, 1);
                        return false;
                    }
                });
            })

            .error(function () {
                alertMessage(false, "<strong>Ошибка!</strong> Курс не был удалён из базы данных.");
            });
        $('#delete_course_form').css('visibility', 'hidden');
        disableEditor();
    };
    $scope.updateCourse = function () {
        $http.put('api/courses/' + $scope.selectedCourse.Id, $scope.selectedCourse)
            .success(function () {
                alertMessage(true, "Курс " + $scope.selectedCourse.Title + " успешно изменён.");
                $.each($scope.courses, function (i) {
                    if ($scope.courses[i].Id == $scope.selectedCourse.Id) {
                        $scope.courses[i] = $scope.selectedCourse;
                        return false;
                    }
                });
                $.each($scope.students_courses, function (i) {
                    if ($scope.students_courses[i].IdCourse == $scope.selectedCourse.Id) {
                        $scope.students_courses[i].Title = $scope.selectedCourse.Title;
                        return false;
                    }
                });
            })
            .error(function () {
                alertMessage(false, "<strong>Ошибка!</strong> Курс " + $scope.selectedCourse.Title + " не был изменён.");
            });
        $('#edit_course_form').css('visibility', 'hidden');
        disableEditor();
    };
    $scope.addCourse = function () {
        $http.post('/api/courses/', $scope.selectedCourse)
            .success(function (data) {
                alertMessage(true, "Курс " + data.Title + " успешно добавлен.");
                $scope.courses.push(data);
            }
        )
        .error(function () {
            alertMessage(false, "<strong>Ошибка!</strong> Курс не был добавлен.");
        });
        $('#edit_course_form').css('visibility', 'hidden');
        disableEditor();
    };
    $scope.editCourse = function (course) {
        $scope.selectedCourse = { Title: course.Title, Lecturer: course.Lecturer, Id: course.Id };
        enableEditor();
        $('#edit_course_form').css('visibility', 'visible');
    };
    $scope.newCourse = function () {
        $scope.selectedCourse = { Title: "", Lecturer: "", Id: -1 };
        enableEditor();
        $('#edit_course_form').css('visibility', 'visible');
    };
    $scope.deleteCoursePrep = function (course) {
        $scope.selectedCourse = course;
        enableEditor();
        $('#delete_course_form').css('visibility', 'visible');
    }
    $scope.addOrUpdateCourse = function () {
        if ($scope.selectedCourse.Id == -1) {
            $scope.addCourse();
        }
        else {
            $scope.updateCourse();
        }
    };
    $scope.editCourseCancel = function () {
        $('#edit_course_form').css('visibility', 'hidden');
        $('#delete_course_form').css('visibility', 'hidden');
        disableEditor();
    }


    $http.get('api/studentscourses')
        .success(function (students_courses) {
            $scope.students_courses = students_courses;
        });
    $scope.deleteStudentCourse = function () {
        $http.delete('api/studentscourses/' + $scope.selectedStudentCourse.Id)
            .success(function () {
                alertMessage(true, "Соответствие студента и курса успешно удалено.");
                $.each($scope.students_courses, function (i) {
                    if ($scope.students_courses[i].Id == $scope.selectedStudentCourse.Id) {
                        $scope.students_courses.splice(i, 1);
                        return false;
                    }
                });
            })
            .error(function () {
                alertMessage(false, "<strong>Ошибка!</strong> Соответствие студента и курса не было удалено из базы данных.");
            });
        $('#delete_student_course_form').css('visibility', 'hidden');
        disableEditor();
    };
    $scope.updateStudentCourse = function () {
        $http.put('api/studentscourses/' + $scope.selectedStudentCourse.Id, $scope.selectedStudentCourse)
        .success(function (data) {
            alertMessage(true, "Соответствие студента и курса успешно изменено.");
            $.each($scope.students_courses, function (i) {
                if ($scope.students_courses[i].Id == data.Id) {
                    $scope.students_courses[i] = data;
                    return false;
                }
            });
        })
        .error(function () {
            alertMessage(false, "<strong>Ошибка!</strong> Соответствие студента и курса не было изменено.");
        });
        $('#edit_student_course_form').css('visibility', 'hidden');
        disableEditor();
    };
    $scope.addStudentCourse = function () {
        $http.post('/api/studentscourses/', $scope.selectedStudentCourse)
            .success(function (data) {
                alertMessage(true, "Соответствие студента и курса успешно добавлено.");
                $scope.students_courses.push(data);
            }
        )
        .error(function () {
            alertMessage(false, "<strong>Ошибка!</strong> Соответствие студента и курса не было добавлено.");
        });
        $('#edit_student_course_form').css('visibility', 'hidden');
        disableEditor();
    };
    $scope.editStudentCourse = function (student_course) {
        $scope.selectedStudentCourse = { IdStudent: student_course.IdStudent, IdCourse: student_course.IdCourse, Id: student_course.Id };
        enableEditor();
        $('#edit_student_course_form').css('visibility', 'visible');
    };
    $scope.newStudentCourse = function () {
        idSt = $scope.students[0].Id;
        idC = $scope.courses[0].Id;
        $scope.selectedStudentCourse = { IdStudent: idSt, IdCourse: idC, Id: -1 };
        enableEditor();
        $('#edit_student_course_form').css('visibility', 'visible');
    };
    $scope.deleteStudentCoursePrep = function (st_course) {
        $scope.selectedStudentCourse = st_course;
        enableEditor();
        $('#delete_student_course_form').css('visibility', 'visible');
    }
    $scope.addOrUpdateStudentCourse = function () {
        if ($scope.selectedStudentCourse.Id == -1) {
            $scope.addStudentCourse();
        }
        else {
            $scope.updateStudentCourse();
        }
    };
    $scope.editStudentCourseCancel = function () {
        $('#edit_student_course_form').css('visibility', 'hidden');
        $('#delete_student_course_form').css('visibility', 'hidden');
        disableEditor();
    }
}]);