<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subs;
use Exception;

class SubsController extends Controller
{
    public function addSubs(request $request)
    {
        $subs = new Subs;
        try {
            $subs->fill($request->all());
            $subs->save();
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function getSubs()
    {
        return Subs::all();
    }


    public function getSubsbyid($id)
    {
        $row = Subs::where('id_subs', $id)->get();
        
        if (count($row) === 1) {
             return true;
         } else {
            return false;
         }
    }

    public function editSubs(request $request, $id)
    {
        try{
            if (self::getSubsbyid($id)) {
                $subs = Subs::where('id_subs', $id)->first();
                $subs->update($request->all());
            } else {
                return 'Wrong Id';
            }
        }
        catch(Exception $e){
            return $e;
        }

    }

    public function deleteSubs($id){
        try{
            if(self::getSubsbyid($id)){
        $subs = Subs::where('id_subs',$id)->delete();
            }else{
                return 'Wrong Id!!';
            }
        }
        catch(Exception $e){
            return $e;
        }
    }


     public function deleteSubsbystudentId($id){
         try{
         $subs = Subs::where('StudentId',$id)->delete();
             if($subs){
                 return [
                     'success' => true,
                     'message'=>'تم حذف الطالب'
                 ]; 
             }
             else{
                 return [
                     'success' => false,
                     'message'=>'لا يوجد طالب بهذا الرقم'
                 ]; 
             }
         } catch (Exception $e) {
             return [
                 'success' => false,
                 'message'=>' هذه الطالب لا يمكن حذفه'
             ]; 
         }
     }

    
}
