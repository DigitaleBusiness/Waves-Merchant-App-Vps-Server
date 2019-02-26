<?php
$emailOwner = 'bel.temp.mail@ya.ru';
$targetWallet = '3P3mWFmANJ8xkM1UY3CWHYqsqfm62v2g23x';
$apiUrl = 'https://api.wavesplatform.com/v0/transactions/all/';
header('Access-Control-Allow-Origin: *');

function answer($text, $isError = true)
{
    echo json_encode([
        'error' => $isError,
        'text' => $text,
    ]);
    die();
}

function getTransactionFileName($transaction)
{
    $fileName = md5(mb_strtolower($transaction));

    return './transactions/' . $fileName . '.json';
}

function saveTransaction($transaction)
{
    file_put_contents(getTransactionFileName($transaction), json_encode([
        'transaction' => $transaction,
        'data' => date('Y-m-d H:i:s'),
    ]));

    return true;
}

function isTransactionExists($transaction)
{
    return file_exists(getTransactionFileName($transaction));
}

$transaction = isset($_GET['transaction_id']) ? $_GET['transaction_id'] : null;
if (!$transaction || mb_strlen($transaction) !== 44) {
    answer('Incorrect transaction ID ' . mb_strlen($transaction));
}

if (isTransactionExists($transaction)) {
    answer('Transaction already saved', true);
}

sleep(10);

$url = $apiUrl . $transaction;
$json = file_get_contents($url);
$json = json_decode($json, true);
if ($json && isset($json['data']) && isset($json['data']['type'])) {
    $data = $json['data'];
    if ($data['type'] != 4) {
        answer('Incorrect type: ' . $data['type']);
    }

    if (!isset($data['recipient']) || mb_strtolower($data['recipient']) !== mb_strtolower($targetWallet)) {
        answer('Owner not found');
    }

    mail($emailOwner, 'WAVES Transaction', 'Just received transaction: https://wavesexplorer.com/tx/' . $transaction);
    saveTransaction($transaction);
    answer('ok', false);
} else {
    answer('Incorrect response');
}