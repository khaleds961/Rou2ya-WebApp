<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        

        Schema::table('students', function ($table) {
        
            $table->dropForeign(['ClassId']);
     
        }); 
       
    
    }


public function down()
    {
        Schema::table('students', function ($table) {
              
            $table->foreignId('ClassId')->constrained('class');
     
        });  
    
    }
}
