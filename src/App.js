import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
        super();
        let merchantConfig = window.WAVES_MERCHANT_CONFIG ? window.WAVES_MERCHANT_CONFIG : {
            allowed_tokens: ['WAVES', 'TEST', 'HELLO'],
            recipient_wallet: '----'
        };
        merchantConfig = this.prepareMerchantConfig(merchantConfig);
        const itemConfig = this.getParams();
        console.log(itemConfig);

        this.state = {
            // todo show error is configs not ok
            merchantConfigValidation: this.isValidMerchantConfig(merchantConfig),
            itemConfigValidation: this.isValidItemConfig(itemConfig),

            itemConfig: itemConfig,
            wavesKeeper: window.WavesKeeper,
            allowedTokens: merchantConfig.allowed_tokens,
            //wavesEnabledClass: this.state.wavesKeeper ? 'waves-enabled' : 'waves-disabled disabled'
            sendAssetId: merchantConfig.allowed_tokens[0],
            sendTokensAmount: '1.567',
            sendFeeAmount: '0.001',
            wavesRecipient: merchantConfig.recipient_wallet,
            exchangeRates: {
                'USD': {
                    'WAVES': '2.88', 'TEST': '3', 'HELLO': '10', 'BOOM': '1'
                },
                'RUB': {
                    'WAVES': '177', 'TEST': '210', 'HELLO': '700', 'BOOM': '7'
                }
            }
        };

        this.checkWavesKeeperInterval = setInterval(() => {
            console.log(window.WavesKeeper);
            if (window.WavesKeeper) {
                this.setState({wavesKeeper: window.WavesKeeper});
                clearInterval(this.checkWavesKeeperInterval);
            }
        }, 100);
    }

    prepareMerchantConfig = (config) => {
        config.allowed_tokens = config.allowed_tokens.map(item => item.toUpperCase());

        return config;
    };

    replaceCurrencySymbol = (currency) => {
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

    getParams = () => {
        //http://localhost:3001/?item_price_amount=111&item_price_currency=USD&item_target_token=WAVES&item_id=999&item_description=Some%20description&order_id=10
        let result = {};
        const keys = [
            'item_price_amount',
            'item_price_currency',
            'item_target_token',
            'item_id',
            'item_description',
            'order_id',
        ];
        let url = new URL(window.location);
        const params = new URLSearchParams(url.search);
        for (let key in keys) {
            key = keys[key];
            result[key] = params.get(key);
        }

        return result;
    };

    isValidItemConfig = (config) => {
        let isValid = true;
        let reasons = [];

        if (!config.item_price_amount || config.item_price_amount <= 0) {
            isValid = false;
            reasons.push('item_price_amount');
        }

        return {
            is_valid: isValid,
            reasons
        };
    };

    isValidMerchantConfig = (config) => {
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

    onBuy = () => {
        this.state.wavesKeeper.publicState()
            .then(state => {
                console.log(state); //displaying the result in the console
                /*...processing data */
                return state;
            })
            .catch(error => {
                console.error(error); // displaying the result in the console
                /*...processing errors */
                return null;
            })
            .then((state) => {
                if (!state) {
                    return;
                }

                const txData = {
                    type: 4,
                    data: {
                        amount: {
                            assetId: this.state.sendAssetId,
                            tokens: this.state.sendTokensAmount
                        },
                        fee: {
                            assetId: this.state.sendAssetId,
                            tokens: this.state.sendFeeAmount
                        },
                        recipient: this.state.wavesRecipient
                    }
                };
                this.state.wavesKeeper.signAndPublishTransaction(txData)
                    .then((data) => {
                        //data - a line ready for sending to Waves network's node (server)
                    })
                    .catch((error) => {
                        //processing errors
                    });
            });
    };

    changePayToken = (token) => {
        this.setState({
            sendAssetId: token
        });
    };

    calculateTokenPrice = () => {
        const price = this.state.itemConfig.item_price_amount;
        const currency = this.state.itemConfig.item_price_currency.toUpperCase();
        const rate = this.state.exchangeRates[currency][this.state.sendAssetId];
        //console.log(price, currency, rate);

        return (price / rate).toFixed(6);
    };

    render() {
        let allowedTokens = this.state.allowedTokens.map((item, index) =>
            <button key={index} className="dropdown-item" onClick={() => this.changePayToken(item)}>{item}</button>
        );
        return (
            <div className="App">
                <header className="App-header">
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <div className="App-original-price">
                        {this.replaceCurrencySymbol(this.state.itemConfig.item_price_currency)} {this.state.itemConfig.item_price_amount}
                    </div>
                </header>

                <div className="input-group App-convert-token">
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Text input with dropdown button"
                        disabled
                        value={this.calculateTokenPrice()}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.sendAssetId}
                        </button>
                        <div className="dropdown-menu">
                            {allowedTokens}
                        </div>
                    </div>
                </div>

                <div className="App-btn-buy-container">
                    <button
                        className={`btn btn-success btn-lg`}
                        disabled={!this.state.wavesKeeper}
                        onClick={this.onBuy}>
                        Buy
                    </button>
                </div>

            </div>
        );
    }
}

export default App;
