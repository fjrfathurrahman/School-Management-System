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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('nis')->unique();
            $table->string('nisn')->unique();
            $table->string('name');
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->string('birth_place')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('religion')->nullable();
            $table->string('avatar')->nullable();
            $table->timestamps();

            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('class_id')->constrained('classes')->cascadeOnDelete();
            $table->foreignId('major_id')->constrained('majors')->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('parents')->nullOnDelete();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
