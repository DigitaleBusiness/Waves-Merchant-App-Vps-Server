import React, {Component} from 'react';
import coin from './coin.svg';
import './App.css';
import Helper from './Helper';
import WavesDataService from "./WavesDataService";

class App extends Component {
    constructor() {
        super();
        let merchantConfig = window.WAVES_MERCHANT_CONFIG ? window.WAVES_MERCHANT_CONFIG : {
            allowed_tokens: ['WAVES', 'TEST', 'HELLO'],
            recipient_wallet: '----'
        };
        merchantConfig = Helper.prepareMerchantConfig(merchantConfig);
        const itemConfig = Helper.getParams();
        console.log(itemConfig);
        // todo receive rates if null
        let exchangeRates = merchantConfig.exchange_rates ? merchantConfig.exchange_rates : null;
        this.wavesDataService = new WavesDataService();

        this.state = {
            merchantConfigValidation: Helper.isValidMerchantConfig(merchantConfig),
            itemConfigValidation: Helper.isValidItemConfig(itemConfig),

            itemConfig: itemConfig,
            merchantConfig: merchantConfig,
            wavesKeeper: window.WavesKeeper,
            allowedTokens: merchantConfig.allowed_tokens,
            //wavesEnabledClass: this.state.wavesKeeper ? 'waves-enabled' : 'waves-disabled disabled'
            sendAssetId: merchantConfig.allowed_tokens[0],
            sendTokensAmount: '...',
            sendFeeAmount: '0.001',
            wavesRecipient: merchantConfig.recipient_wallet,
            exchangeRates: exchangeRates
        };

        Helper.calculateTokenPrice(itemConfig, exchangeRates, merchantConfig.allowed_tokens[0], this.wavesDataService)
            .then(sendTokensAmount => this.setState({sendTokensAmount}));

        this.checkWavesKeeperInterval = setInterval(() => {
            //console.log(window.WavesKeeper);
            if (window.WavesKeeper) {
                this.setState({wavesKeeper: window.WavesKeeper});
                clearInterval(this.checkWavesKeeperInterval);
            }
        }, 100);

        /*this.wavesDataService.getPriceByTickers('USD', 'EUR')
            .then(data => {
                console.log(data);
            });*/
    }

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
            sendAssetId: token,
            sendTokensAmount: '...'
        });

        Helper.calculateTokenPrice(this.state.itemConfig, this.state.exchangeRates, token, this.wavesDataService)
            .then(sendTokensAmount => this.setState({sendTokensAmount}));
    };

    render() {
        if (!this.state.itemConfigValidation.is_valid) {
            return this.state.itemConfigValidation.reasons.map(error => <div>{error}</div>);
        }

        let allowedTokens = this.state.allowedTokens.map((item, index) => {
                let classes = 'dropdown-item';
                let isActive = item === this.state.sendAssetId;
                if (isActive) {
                    classes += ' active';
                }

                return <button key={index} className={classes} onClick={() => this.changePayToken(item)}>{item}</button>
            }
        );

        return (
            <div className="App">
                <header className="App-header">
                    {this.state.itemConfig.item_title &&
                    <p className="App-item-title">{this.state.itemConfig.item_title}</p>}

                    <div className="App-original-price">
                        {Helper.replaceCurrencySymbol(this.state.itemConfig.item_price_currency)} {this.state.itemConfig.item_price_amount}
                    </div>

                    <div className="App-icon-container">
                        <img src={coin} className="App-exchange-image" alt="Exchange"/>
                    </div>

                    <div className="App-result">
                        <span className="App-result-price">{this.state.sendTokensAmount}</span>
                        <div className="App-select-token">
                            <button className="btn btn-outline-light btn-lg dropdown-toggle btn-select-token"
                                    type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.sendAssetId}
                            </button>
                            <div className="dropdown-menu">
                                {allowedTokens}
                            </div>
                        </div>
                    </div>
                </header>


                <div className="App-btn-buy-container">
                    <button
                        className={`btn btn-success btn-lg`}
                        disabled={!this.state.wavesKeeper}
                        onClick={this.onBuy}>
                        {this.state.merchantConfig.text_buy_button.replace('{token}', this.state.sendAssetId)}
                    </button>
                </div>

            </div>
        );
    }
}

export default App;
