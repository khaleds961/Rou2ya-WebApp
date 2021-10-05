<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrivateSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('privateSessions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('StudentId')->constrained('students');
            $table->foreignId('UserId')->constrained('userss');
            $table->string('Type');
            $table->string('Riwaya');
            $table->string('Surah');
            $table->string('TimeFrom');
            $table->string('TimeTo');
            $table->string('PageFrom');
            $table->string('PageTo');
            $table->string('VerseFrom');
            $table->string('VerseTo');
            $table->string('Note');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('private_sessions');
    }
}
