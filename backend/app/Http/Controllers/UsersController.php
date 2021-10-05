<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Userss;
use Exception;


class UsersController extends Controller
{
    public function adduser(request $request)
    {
        $users = new Userss;
        try {
            $users->fill($request->all());
            $users->save();
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function getusers()
    {
        return Userss::all();
    }

    public function getuserbyid($id)
    {
        $row = Userss::where('id', $id)->get();
        
        if (count($row) === 1) {
             return true;
         } else {
            return false;
         }
    }

    public function getusersbyid($id)
    {
        return Userss::where('id', $id)->get();
    }

    public function edituser(request $request, $id)
    {
        try{
        if (self::getuserbyid($id)) {
            $users = Userss::where('id', $id)->first();
            $users->update($request->all());
        } else {
            return 'Wrong Id';
        }
    }
    catch(Exception $e){
        return $e;
    }

    }

    public function deleteuser($id){
        try{
            $result=Userss::where('id', $id)->delete();
            if($result){
                return [
                    'success' => true,
                    'message'=>'تم حذف المستخدم'
                ]; 
            }
            else{
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

    public function allteacheruser(){
        $teachers=Userss::where('Role','teacher')->get();
        return $teachers;
    }
}
