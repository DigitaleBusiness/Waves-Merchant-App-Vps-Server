const WAVES_MERCHANT_CONFIG = {
    allowed_tokens: ['WAVEs', 'TEST', 'HELLO', 'boom'],
    recipient_wallet: '----',
    text_buy_button: 'Buy for {token}',
    exchange_rates: {
        'USD': {
            'WAVES': '2.88',
            'TEST': '3',
            'HELLO': '10',
            'BOOM': '1'
        },
        'RUB': {
            'WAVES': '177',
            'TEST': '210',
            'HELLO': '700',
            'BOOM': '7'
        }
    }
};
window.WAVES_MERCHANT_CONFIG = WAVES_MERCHANT_CONFIG;