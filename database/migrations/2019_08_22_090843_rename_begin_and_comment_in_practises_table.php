<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameBeginAndCommentInPractisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('practises', function (Blueprint $table) {
            $table->renameColumn('begin', 'start');
            $table->renameColumn('comment', 'candidates');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('practises', function (Blueprint $table) {
            $table->renameColumn('start', 'begin');
            $table->renameColumn('candidates', 'comment');
        });
    }
}
