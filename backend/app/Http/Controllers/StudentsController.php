<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Students;
use Exception;

class StudentsController extends Controller
{
    public function addstudent(request $request)
    {
        $student = new Students;
        try {
            $student->fill($request->all());
            $student->save();
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
    

    public function getstudentsPg()
    {
        return Students::paginate(5);
    }

    public function getstudents()
    {
        return Students::all();
    }


    public function getstudentbyid($id)
    {
        $row = Students::where('id_stud', $id)->get();
        
        if (count($row) === 1) {
            return true;
        } else {
            return false;
        }
    }

    public function editstudent(request $request, $id)
    {
        try {
            if (self::getstudentbyid($id)) {
                $student = Students::where('id_stud', $id)->first();
                $student->update($request->all());
            } else {
                return 'Wrong Id';
            }
        } catch (Exception $e) {
            return $e;
        }
    }

    public function deletestudent($id)
    {
        try {
            $result=Students::where('id_stud', $id)->delete();
            if ($result) {
                return [
                    'success' => true,
                    'message'=>'تم حذف المستخدم'
                ];
            } else {
                return [
                    'success' => false,
                    'message'=>'لا يوجد مستخدم'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message'=>'لا يمكنك حذفه'
            ];
        }
    }

    public function getstudentidbycode($code)
    {
        $id = Students::where('Code', $code)->get('students.id_stud');
        return $id;
    }

    public function classStudent()
    {
        $data = Students::join('class', 'ClassId', 'class.id')
            ->get(
                [
                    'students.*',
                    'class.ClassName'
                ]
            );
        return $data;
    }

    public function studentbyclass($id)
    {
        return Students::where('ClassId', $id)->get();
    }

    public function studentbysession()
    {
        $data=
        Students::join('privateSessions', 'privateSessions.StudentId', 'students.id_stud')->distinct()
        ->get(['students.*']);
        return $data;
    }

    public function searchstudentbyname(Request $request)
    {
        $data = Students::join('class', 'ClassId', 'class.id')
        ->join('subs', 'subs.StudentId', 'students.id_stud')
            ->where('students.FirstName', 'like', '%' . $request->FirstName . '%')
            ->where('students.LastName', 'like', '%' . $request->LastName . '%')
            ->get([
                'students.*',
                'class.ClassName',
                'subs.*'
            ]);
        return $data;
    }

    public function classStudentSubs()
    {
        $data =
                Students::join('class', 'ClassId', 'class.id')
                ->join('subs', 'subs.StudentId', 'students.id_stud')
                ->select(
                    [
                        'students.*',
                        'class.ClassName',
                        'subs.Status',
                        'subs.id_subs',
                    ]
                )
                ->distinct()
               -> paginate(4);
        return $data;
    }

    public function privateStudentSubs()
    {
        $data =
        Students::join('privateSessions', 'privateSessions.StudentId', 'students.id_stud')
        ->join('subs', 'subs.StudentId', 'students.id_stud')
        ->select(
            [
                'students.*',
                'subs.Status',
                'subs.id_subs',
                'privateSessions.Date',
            ]
        )
        
        ->paginate(4);
        
        return $data;
    }

    public function searchprivatestudentbyname(Request $request)
    {
        $data = Students::join('subs', 'subs.StudentId', 'students.id_stud')
            ->join('privateSessions', 'privateSessions.StudentId', 'students.id_stud')
            ->where('students.FirstName', 'like', '%' . $request->FirstName . '%')
            ->where('students.LastName', 'like', '%' . $request->LastName . '%')
            ->get([
                'students.*',
                'subs.*'
            ]);
        return $data;
    }
}
