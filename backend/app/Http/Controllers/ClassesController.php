<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Classes;
use Exception;


class ClassesController extends Controller
{
    public function addclass(request $request){
        $class = new Classes;
        try{
            $class->fill($request->all());
            $class->save();
        }
        catch (Exception $e){
            return response()->json($e);
        }
    }

    public function getclasses(){
        return Classes::all();
    }

    public function getclassbyid($id){
       
         $class = Classes::where('id',$id)->get();
         if(count($class)===1){
             return true;
         }else false;
    }

    public function editclass(request $request,$id){
        try{        
        if(self::getclassbyid($id)){
            $class = Classes::where('id',$id)->first();
            $class->update($request->all()); 
        }else{
            return 'Wrong Id !';
        }

        }
        catch(Exception $e){
            return $e;
        }
    }

    public function deleteclass($id){
        try{
            $result=Classes::where('id', $id)->delete();
            if($result){
                return [
                    'success' => true,
                    'message'=>'تم حذف الصف'
                ]; 
            }
            else{
                return [
                    'success' => false,
                    'message'=>'لا يوجد صف بهذا الرقم'
                ]; 
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message'=>'لا يمكنك حذفه'
            ]; 
        }
    }

    public function joinclasscourse(){
        $data = Classes::join('courses', 'CourseId', 'courses.id')
        ->get([
            'class.*',
            'courses.CourseName'
        ]);
    return $data;
    }

    public function classesSpecificCourse($id){
        $class = Classes::where('CourseId',$id)->get();
        return $class;
    }

    public function classcourse($id){
        return Classes::where('CourseId',$id)->get();
    }

}
