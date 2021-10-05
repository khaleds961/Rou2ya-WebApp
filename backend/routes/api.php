<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//////// User API ////////////

Route::post('/adduser', [\App\Http\Controllers\UsersController::class,'adduser']);
Route::get('/getusers', [\App\Http\Controllers\UsersController::class,'getusers']);
Route::get('/getuserbyid/{id}', [\App\Http\Controllers\UsersController::class,'getuserbyid']);
Route::get('/getusersbyid/{id}', [\App\Http\Controllers\UsersController::class,'getusersbyid']);
Route::put('/edituser/{id}', [\App\Http\Controllers\UsersController::class,'edituser']);
Route::delete('/deleteuser/{id}', [\App\Http\Controllers\UsersController::class,'deleteuser']);

//////// User API ////////////




//////// Course API ////////////

Route::post('/addcourse', [\App\Http\Controllers\CoursesController::class,'addcourse']);
Route::get('/getcourses', [\App\Http\Controllers\CoursesController::class,'getcourses']);
Route::get('/getcoursebyid/{id}', [\App\Http\Controllers\CoursesController::class,'getcoursebyid']);
Route::put('/editcourse/{id}', [\App\Http\Controllers\CoursesController::class,'editcourse']);
Route::delete('/deletecourse/{id}', [\App\Http\Controllers\CoursesController::class,'deletecourse']);

//////// Course API ////////////


//////// CLASS API ////////////

Route::post('/addclass', [\App\Http\Controllers\ClassesController::class,'addclass']);
Route::get('/getclasses', [\App\Http\Controllers\ClassesController::class,'getclasses']);
Route::get('/getclassbyid/{id}', [\App\Http\Controllers\ClassesController::class,'getclassbyid']);
Route::get('/joinclasscourse', [\App\Http\Controllers\ClassesController::class,'joinclasscourse']);
Route::get('/classesSpecificCourse/{id}', [\App\Http\Controllers\ClassesController::class,'classesSpecificCourse']);
Route::get('/classcourse/{id}', [\App\Http\Controllers\ClassesController::class,'classcourse']);
Route::put('/editclass/{id}', [\App\Http\Controllers\ClassesController::class,'editclass']);
Route::delete('/deleteclass/{id}', [\App\Http\Controllers\ClassesController::class,'deleteclass']);

//////// CLASS API ////////////




//////// Student API ////////////

Route::post('/addstudent', [\App\Http\Controllers\StudentsController::class,'addstudent']);
Route::get('/getstudents', [\App\Http\Controllers\StudentsController::class,'getstudents']);
Route::post('/getsudentsPg', [\App\Http\Controllers\StudentsController::class,'getstudentsPg']);
Route::post('/studentbys', [\App\Http\Controllers\StudentsController::class,'searchstudentbyname']);
Route::get('/getstudentbyid/{id}', [\App\Http\Controllers\StudentsController::class,'getstudentbyid']);
Route::get('/getstudentidbycode/{code}', [\App\Http\Controllers\StudentsController::class,'getstudentidbycode']);
Route::get('/studentbyclass/{id}', [\App\Http\Controllers\StudentsController::class,'studentbyclass']);
Route::get('/studentbysession', [\App\Http\Controllers\StudentsController::class,'studentbysession']);
Route::get('/classStudentSubs', [\App\Http\Controllers\StudentsController::class,'classStudentSubs']);
Route::post('/searchprivatestudentbyname', [\App\Http\Controllers\StudentsController::class,'searchprivatestudentbyname']);
Route::put('/editstudent/{id}', [\App\Http\Controllers\StudentsController::class,'editstudent']);
Route::delete('/deletestudent/{id}', [\App\Http\Controllers\StudentsController::class,'deletestudent']);


//////// Student API ////////////



//////// userclass API ////////////

Route::post('/addUserClass', [\App\Http\Controllers\UserClassController::class,'addUserClass']);
Route::get('/getUserClass', [\App\Http\Controllers\UserClassController::class,'getUserClass']);
Route::get('/getuserclassbyid/{id}', [\App\Http\Controllers\UserClassController::class,'getuserclassbyid']);
Route::get('/classStudent', [\App\Http\Controllers\StudentsController::class,'classStudent']);
Route::get('/allteacheruser', [\App\Http\Controllers\UsersController::class,'allteacheruser']);
Route::put('/edituserclass/{id}', [\App\Http\Controllers\UserClassController::class,'edituserclass']);
Route::delete('/deleteuserclass/{id}', [\App\Http\Controllers\UserClassController::class,'deleteuserclass']);

//////// userclass API ////////////





//////// PrivateSession API ////////////

Route::post('/addprivatesession', [\App\Http\Controllers\PrivateSessionController::class,'addPrivateSession']);

Route::get('/getprivatesession', [\App\Http\Controllers\PrivateSessionController::class,'getPrivateSession']);

Route::get('/getprivatesessionbyid/{id}', [\App\Http\Controllers\PrivateSessionController::class,'getPrivateSessionbyid']);

Route::put('/editprivatesession/{id}', [\App\Http\Controllers\PrivateSessionController::class,'editPrivateSession']);

Route::delete('/deleteprivatesession/{id}', [\App\Http\Controllers\PrivateSessionController::class,'deletePrivateSession']);

Route::delete('/deletePrivatebyStudentId/{id}', [\App\Http\Controllers\PrivateSessionController::class,'deletePrivatebyStudentId']);

Route::get('/getPrivateStudents', [\App\Http\Controllers\PrivateSessionController::class,'getPrivateStudents']);

Route::get('/joinstudentuser', [\App\Http\Controllers\PrivateSessionController::class,'joinstudentuser']);

Route::get('/joinstudentbyid/{id}', [\App\Http\Controllers\PrivateSessionController::class,'joinstudentbyid']);

Route::get('/privateStudentSubs', [\App\Http\Controllers\StudentsController::class,'privateStudentSubs']);

Route::get('/getprivsessid/{id}', [\App\Http\Controllers\PrivateSessionController::class,'getPrivsessId']);

Route::post('/searchprivatesession', [\App\Http\Controllers\PrivateSessionController::class,'searchprivatesession']);


//////// PrivateSession API ////////////



//////// Attendance API ////////////

Route::post('/addattendance', [\App\Http\Controllers\AttendanceController::class,'addattendance']);

Route::get('/getattendance', [\App\Http\Controllers\AttendanceController::class,'getAttendance']);

Route::get('/getattendancebyid/{id}', [\App\Http\Controllers\AttendanceController::class,'getAttendancebyid']);

Route::get('/studentattendance', [\App\Http\Controllers\AttendanceController::class,'studentAttendanceByDate']);

Route::post('/viewattendacestudent', [\App\Http\Controllers\AttendanceController::class,'viewattendacestudent']);

Route::put('/editattendance/{id}', [\App\Http\Controllers\AttendanceController::class,'editAttendance']);

Route::delete('/deleteattendance/{id}', [\App\Http\Controllers\AttendanceController::class,'deleteAttendance']);

//////// Attendance API ////////////


//////// Subs API ////////////

Route::post('/addsubs', [\App\Http\Controllers\SubsController::class,'addSubs']);

Route::get('/getsubs', [\App\Http\Controllers\SubsController::class,'getSubs']);

Route::get('/getsubsbyid/{id}', [\App\Http\Controllers\SubsController::class,'getSubsbyid']);

Route::put('/editsubs/{id}', [\App\Http\Controllers\SubsController::class,'editSubs']);

Route::delete('/deletesubs/{id}', [\App\Http\Controllers\SubsController::class,'deleteSubs']);

Route::delete('/deleteSubsbystudentId/{id}', [\App\Http\Controllers\SubsController::class,'deleteSubsbystudentId']);

//////// Subs API ////////////


//////// Auth Route ////////////

Route::post('/auth/register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('/auth/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

//////// Auth Route ////////////
