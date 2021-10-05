<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('Status');
            $table->foreignId('PrivateSessionId')->nullable()->constrained('privateSessions');
            $table->foreignId('CourseId')->nullable()->constrained('courses');
            $table->foreignId('StudentId')->constrained('students');
        });
    }
    // ->
    //         onDelete('cascade');
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subs');
    }
}
