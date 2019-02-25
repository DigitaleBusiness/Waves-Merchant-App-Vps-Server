const WAVES_MERCHANT_CONFIG = {
    allowed_tokens: ['WAVES', 'ETH', 'WCT', 'BTC', 'LTC'],
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