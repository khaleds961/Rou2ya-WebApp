<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PrivateSession;
use Exception;


class PrivateSessionController extends Controller
{
    public function addPrivateSession(request $request)
    {
        $private = new PrivateSession;
        try {
            $private->fill($request->all());
            $private->save();
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function getPrivateSession()
    {
        return PrivateSession::all();
    }


    public function getPrivateSessionbyid($id)
    {
        $row = PrivateSession::where('id', $id)->get();
        
        if (count($row) === 1) {
             return $row;
         } else {
            return false;
         }
    }

    public function editPrivateSession(request $request, $id)
    {
        try{
        if (self::getPrivateSessionbyid($id)) {
            $private = PrivateSession::where('id', $id)->first();
            $private->update($request->all());
        } else {
            return 'Wrong Id';
        }
    }
    catch(Exception $e){
        return $e;
    }

    }


    public function deletePrivateSession($id){
        try{
            $result=PrivateSession::where('id', $id)->delete();
            if($result){
                return [
                    'success' => true,
                    'message'=>'تم حذف الحصة'
                ]; 
            }
            else{
                return [
                    'success' => false,
                    'message'=>'لا يوجد حصة بهذا الرقم'
                ]; 
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message'=>' هذه الحصة لا يمكن حذفها'
            ]; 
        }
    }


     public function deletePrivatebyStudentId($id){
         try{
         $private = PrivateSession::where('StudentId',$id)->delete();

             if($private){
                 return [
                     'success' => true,
                     'message'=>'تم حذف الحصة'
                 ]; 
             }
             else{
             return [
                    'success' => false,
                     'message'=>'لا يوجد حصة بهذا الرقم'
                 ]; 
             }
         } catch (Exception $e) {
            return [
                 'success' => false,
                 'message'=>' هذه الحصة لا يمكن حذفه'
             ]; 
         }
     }


    public function getPrivateStudents(){

        $data = PrivateSession::join('students','StudentId','students.id_stud')
        ->get([
            'students.*',
            'privateSessions.Date'
        ]
    );
        return  $data;
    }

    public function joinstudentuser(){

        $data = PrivateSession::join('students','StudentId','students.id_stud')
        ->join('userss','UserId','userss.id')
        ->get([
            'students.*',
            'userss.*',
            'privateSessions.*'
        ]
    );
        return  $data;
    }


    public function joinstudentbyid($id)
    {

        try {
            $data =PrivateSession::join('students','privateSessions.StudentId','students.id_stud')->distinct()
            ->join('userss','UserId','userss.id')
                ->where('privateSessions.id', $id)
                ->get([
                    'students.*',
                    'privateSessions.*',
                    'userss.*'
                ]);

            return [
                'success' => true,
                'data' => $data
            ];
        } catch (Exception $e) {
        }
    }

    public function getPrivsessId($id)
    {
        $id = PrivateSession::where('StudentId',$id)->get('privateSessions.id');
        return $id;
    }


    
    public function searchprivatesession(Request $request)
    {
        $data = PrivateSession::join('students', 'students.id_stud', 'privateSessions.StudentId')
            ->join('userss','userss.id','privateSessions.UserId')
            ->where('students.FirstName', 'like', '%' . $request->FirstName . '%')
            ->where('students.LastName', 'like', '%' . $request->LastName . '%')
            ->get([
                'students.*',
                'privateSessions.*',
                'userss.UserName'
            ]);
        return $data;
    }
    

}
