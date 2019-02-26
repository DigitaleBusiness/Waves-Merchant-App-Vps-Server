const WAVES_MERCHANT_CONFIG = {
    notification_url: './mail/waves-mail.php',
    item_title: 'WAVES Merchant',
    allowed_tokens: ['WAVES', 'ETH', 'WCT', 'BTC'],
    recipient_wallet: '3P3mWFmANJ8xkM1UY3CWHYqsqfm62v2g23x',
    text_buy_button: 'Buy for {token}',
    waves_data_service: 'https://api.wavesplatform.com/',
    /*exchange_rates: {
        'USD': {
            'WAVES': '2.88',
            'ETH': '140',
            'WCT': '0.8',
            'BTC': '4000',
        }
    }*/
};
window.WAVES_MERCHANT_CONFIG = WAVES_MERCHANT_CONFIG;