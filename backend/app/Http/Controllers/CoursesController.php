<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Courses;
use Exception;

class CoursesController extends Controller
{
    public function addcourse(request $request)
    {
        $course = new Courses;
        try {
            $course->fill($request->all());
            $course->save();
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function getcourses()
    {
        return Courses::all();
    }

    public function getcoursebyid($id)
    {
        $row = Courses::where('id', $id)->get();
        
        if (count($row) === 1) {
             return true;
         } else {
            return false;
         }
    }

    public function editcourse(request $request, $id)
    {
        try{
        if (self::getcoursebyid($id)) {
            $course = Courses::where('id', $id)->first();
            $course->update($request->all());
        } else {
            return 'Wrong Id';
        }
    }
    catch(Exception $e){
        return $e;
    }

    }

    public function deletecourse($id){
       

        try{
            $result=Courses::where('id', $id)->delete();
            if($result){
                return [
                    'success' => true,
                    'message'=>'تم حذف الدورة'
                ]; 
            }
            else{
                return [
                    'success' => false,
                    'message'=>'لا يوجد دورة '
                ]; 
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message'=>' لا يمكنك حذفه'
            ]; 
        }
    }
}
