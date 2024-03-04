<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->decimal('price_contracted', 14, 2);
            $table->decimal('balance', 14, 2, true);
            $table->decimal('price_paid', 14, 2);
            $table->enum('type_payment', ['pix', 'credit_card', 'billet'])->nullable();
            $table->enum('status', ['pending', 'paid']);
            $table->enum('type_invoice', ['credit', 'debit']);
            $table->foreignId('contract_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
};
