<?php 

namespace App\Enums;

enum PaymentEnum:string {
    case CREDIT = 'credit';
    case DEBIT = 'debit';
    case PENDING = 'pending';
    case PAID = 'paid';
    case PIX = 'pix';
    case BILLET = 'billet';
    case CREDIT_CARD = 'credit_card';
}