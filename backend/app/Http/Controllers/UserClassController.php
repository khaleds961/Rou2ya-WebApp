<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserClass;
use Exception;

class UserClassController extends Controller
{

    public function addUserClass(request $request)
    {
        $userclass = new UserClass;
        try {
            $userclass->fill($request->all());
            $userclass->save();
        } catch (Exception $e) {
            return response()->json($e);
        }
    }


    public function getUserClass()
    {
        return UserClass::all();
    }


    public function getuserclassbyid($id)
    {
        $row = UserClass::where('id', $id)->get();
        
        if (count($row) === 1) {
             return true;
         } else {
            return false;
         }
    }

    public function edituserclass(request $request, $id)
    {
        try{
        if (self::getuserclassbyid($id)) {
            $userclass = UserClass::where('id', $id)->first();
            $userclass->update($request->all());
        } else {
            return 'Wrong Id';
        }
    }
    catch(Exception $e){
        return $e;
    }

    }

    public function deleteuserclass($id){
        try{
            if(self::getstudentbyid($id)){
           $userclass = UserClass::where('id',$id)->delete();
            }else{
                return 'Wrong Id!!';
            }
        }
        catch(Exception $e){
            return $e;
        }
    }

}
