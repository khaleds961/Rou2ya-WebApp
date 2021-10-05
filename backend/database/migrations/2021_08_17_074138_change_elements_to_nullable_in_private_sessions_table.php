<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeElementsToNullableInPrivateSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('privateSessions', function (Blueprint $table) {
            $table->string('Type')->nullable()->change();
            $table->string('Riwaya')->nullable()->change();
            $table->string('Surah')->nullable()->change();
            $table->string('PageFrom')->nullable()->change();
            $table->string('PageTo')->nullable()->change();
            $table->string('VerseFrom')->nullable()->change();
            $table->string('VerseTo')->nullable()->change();
            $table->string('Note')->nullable()->change();


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('privateSessions', function (Blueprint $table) {
            $table->string('Type')->nullable(false)->change();
            $table->string('Riwaya')->nullable(false)->change();
            $table->string('Surah')->nullable(false)->change();
            $table->string('PageFrom')->nullable(false)->change();
            $table->string('PageTo')->nullable(false)->change();
            $table->string('VerseFrom')->nullable(false)->change();
            $table->string('VerseTo')->nullable(false)->change();
            $table->string('Note')->nullable(false)->change();
        });
    }
}
