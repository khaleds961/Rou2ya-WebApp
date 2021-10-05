<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use Exception;
use Carbon\Carbon;



class AttendanceController extends Controller
{
    public function addattendance(request $request){
        $attendance = new Attendance;
        try{
            $attendance->fill($request->all());
            $attendance->save();
        }
        catch (Exception $e){
            return response()->json($e);
        }
    }

    public function getattendance(){
        return Attendance::all();
    }

    public function getattendancebyid($id){
       
         $attendance =  Attendance::where('id',$id)->get();
         if(count($attendance)===1){
             return true;
         }else false;
    }

    public function editattendance(request $request,$id){
        try{        
        if(self::getattendancebyid($id)){
            $attendance =  Attendance::where('id',$id)->first();
            $attendance->update($request->all()); 
        }else{
            return 'Wrong Id !';
        }

        }
        catch(Exception $e){
            return $e;
        }
    }

    public function deleteattendance($id){
        try{
            if(self::getattendancebyid($id)){
               $attendance =  Attendance::where('id',$id)->delete();
            }else{
                return "Wrong Id !!";
            }

        }
        catch(Exception $e){
            
        }
    }

    public function studentAttendanceByDate(){
        $posts = Attendance::whereDate('created_at', Carbon::today())->get();
        return $posts;
    }

    public function viewattendaceStudent(Request $request)
    {
        $data = Attendance::join('students', 'StudentId', 'students.id_stud')
            ->where('attendances.ClassId', 'like', $request->ClassId)
            ->where('attendances.created_at','like',$request->datee)
            ->get([
                'students.*',
                'attendances.*'
            ]);
        return $data;
    }

}
