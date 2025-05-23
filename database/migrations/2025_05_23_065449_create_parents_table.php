<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('parents', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('job')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->string('birth_place')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('religion')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('avatar')->nullable();
            $table->enum('relation', ['father', 'mother', 'guardian'])->nullable();
            $table->timestamps();

            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parents');
    }
};
