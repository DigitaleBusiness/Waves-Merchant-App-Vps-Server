const WAVES_MERCHANT_CONFIG = {
    item_title: 'WAVES Merchant',
    allowed_tokens: ['WAVES', 'ETH', 'WCT', 'BTC'],
    recipient_wallet: '----',
    text_buy_button: 'Buy for {token}',
    waves_data_service: 'https://api.wavesplatform.com/',
    /*exchange_rates: {
        'USD': {
            'WAVES': '2.88',
            'ETH': '140',
            'WCT': '0.8',
            'BTC': '4000',
            'LTC':'300'
        }
    }*/
};
window.WAVES_MERCHANT_CONFIG = WAVES_MERCHANT_CONFIG;