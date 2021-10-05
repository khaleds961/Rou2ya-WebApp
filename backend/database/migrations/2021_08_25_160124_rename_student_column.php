<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameStudentColumn extends Migration
{
       /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::table('students', function(Blueprint $table) {
                $table->renameColumn('id', 'id_stud');
            });    
        }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('students', function(Blueprint $table) {
            $table->renameColumn('id_stud', 'id');
        });
    }
}
