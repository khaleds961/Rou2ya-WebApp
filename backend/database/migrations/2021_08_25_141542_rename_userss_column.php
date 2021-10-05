<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameUserssColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('userss', function(Blueprint $table) {
            $table->renameColumn('UserName', 'username');
            $table->renameColumn('Role', 'role');
            $table->renameColumn('Password', 'password');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('userss', function(Blueprint $table) {
            $table->renameColumn('username', 'UserName');
            $table->renameColumn('role', 'Role');
            $table->renameColumn('password', 'Password');

        });
    }
}
