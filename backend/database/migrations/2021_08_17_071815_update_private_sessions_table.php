<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePrivateSessionsTable extends Migration
{
  /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('privateSessions', function (Blueprint $table) {
            $table->date('Date')->format('Y-m-d');
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
        $table->dropColumn('Date');        });
    }
}
