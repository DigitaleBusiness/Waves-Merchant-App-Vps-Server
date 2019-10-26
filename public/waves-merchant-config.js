const WAVES_MERCHANT_CONFIG = {
    notification_url: './mail/waves-mail.php',
    item_title: 'WAVES Merchant',
    allowed_tokens: ['WAVES', 'BTC', 'ETH', 'BDX'],
    recipient_wallet: '3PGZNhPeThgyGsxWHZPjRxLiDYjYjzopBqF',
    text_buy_button: 'Buy for {token}',
    waves_data_service: 'https://api.wavesplatform.com/',
    /*exchange_rates: {
        'USD': {
            'WAVES': '2.88',
            'BTC': '4000',
            'ETH': '140',
            'BDX': '0,09',
        }
    }*/
};
window.WAVES_MERCHANT_CONFIG = WAVES_MERCHANT_CONFIG;
