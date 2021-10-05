<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeClassIdToNullableInStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->foreignId('ClassId')->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->foreignId('ClassId')->nullable(false)->change();
        });
    }
}
