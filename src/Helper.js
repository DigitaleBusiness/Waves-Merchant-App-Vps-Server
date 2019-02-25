export default class Helper {
    static prepareMerchantConfig = (config) => {
        config.allowed_tokens = config.allowed_tokens.map(item => item.toUpperCase());

        return config;
    };

    static replaceCurrencySymbol = (currency = '') => {
        currency = currency.toLowerCase();
        const symbols = {
            'usd': '$',
            'eur': '€',
            'rub': '₽',
            'rur': '₽',
            'cny': '¥',
        };

        return symbols[currency] ? symbols[currency] : currency.toUpperCase();
    };

    static isValidItemConfig = (config) => {
        let isValid = true;
        let reasons = [];

        if (!config.item_price_amount || config.item_price_amount <= 0) {
            isValid = false;
            reasons.push('item_price_amount not filled');
        }

        if (!config.item_price_currency) {
            isValid = false;
            reasons.push('item_price_currency not filled');
        }

        return {
            is_valid: isValid,
            reasons
        };
    };

    static getParams = (config) => {
        //http://localhost:3001/?item_price_amount=111&item_price_currency=USD&item_target_token=WAVES&item_id=999&item_description=Some%20description&order_id=10
        let result = {};
        const keys = [
            'item_price_amount',
            'item_price_currency',
            'item_target_token',
            'item_id',
            'item_title',
            'item_description',
            'order_id',
        ];
        let url = new URL(window.location);
        const params = new URLSearchParams(url.search);
        for (let key in keys) {
            key = keys[key];
            result[key] = params.get(key);
        }

        if (!result['item_title']) {
            result['item_title'] = config.item_title ? config.item_title : 'Waves Merchant';
        }

        return result;
    };

    static isValidMerchantConfig = (config) => {
        let isValid = true;
        let reasons = [];
        if (!config.allowed_tokens || config.allowed_tokens.length === 0) {
            isValid = false;
            reasons.push('allowed_tokens');
        }

        if (!config.recipient_wallet || config.recipient_wallet.length !== 35) {
            isValid = false;
            reasons.push('recipient_wallet');
        }

        return {
            is_valid: isValid,
            reasons
        };
    };

    static calculateTokenPrice = (itemConfig, exchangeRates, sendAssetId, wavesDataService) => {
        const price = itemConfig.item_price_amount;
        const currency = itemConfig.item_price_currency.toUpperCase();
        sendAssetId = sendAssetId.toUpperCase();

        return (new Promise((resolve, reject) => {
            if (exchangeRates && exchangeRates[currency] && exchangeRates[currency][sendAssetId]) {
                resolve(exchangeRates[currency][sendAssetId]);
            } else {
                wavesDataService.getPriceByTickers(sendAssetId, currency)
                    .then(result => resolve(result))
                    .catch(error => reject(error));
            }
        }))
            .then(rate => {
                return (price / rate).toFixed(8);
            });
    };
}