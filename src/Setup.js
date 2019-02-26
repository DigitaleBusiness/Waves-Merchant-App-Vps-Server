import React, {Component} from 'react';

export default class Setup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            wallet: '',
            scriptUrl: './mail/waves-mail.php',
            dataServiceUrl: 'https://api.wavesplatform.com/',
            itemTitle: 'WAVES Merchant'
        };
    }

    onChange = (e) => {
        if (!e.target.dataset.target) {
            return;
        }

        this.setState({
            [e.target.dataset.target]: e.target.value
        });
    };

    configScript = () => {
        let result = {
            notification_url: this.state.scriptUrl,
            item_title: this.state.itemTitle,
            allowed_tokens: ['WAVES', 'WCT'],
            recipient_wallet: this.state.wallet,
            text_buy_button: 'Buy for {token}',
            waves_data_service: this.state.dataServiceUrl,
            /*exchange_rates: {
                'USD': {
                    'WAVES': '2.88',
                    'ETH': '140',
                    'WCT': '0.8',
                    'BTC': '4000',
                }
            }*/
        };
        result = JSON.stringify(result, null, "\t");
        result = `const WAVES_MERCHANT_CONFIG = ${result};\r\nwindow.WAVES_MERCHANT_CONFIG = WAVES_MERCHANT_CONFIG;`;

        return result;
    };

    configMailScript = () => {
        return `<?php
return [
    'emailOwner' => '${this.state.email}',
    'targetWallet' => '${this.state.wallet}',
    'apiUrl' => '${this.state.dataServiceUrl}'
];`;
    };

    render() {
        const {itemConfigValidation, merchantConfigValidation} = this.props;
        const itemConfig = itemConfigValidation.reasons.map((error, index) => <div key={index}>{error}</div>);
        const merchantConfig = merchantConfigValidation.reasons.map((error, index) => <div key={index}>{error}</div>);

        return (
            <div className="container">
                <h1>Setup Waves Merchant</h1>

                <div className="form-group">
                    <label htmlFor="email">Your Email for notifications</label>
                    <input id="email"
                           className="form-control"
                           type="text"
                           placeholder="Your Email"
                           data-target="email"
                           onChange={this.onChange}
                           value={this.state.email}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="wallet">Your WAVES wallet for receiving payments</label>
                    <input id="wallet"
                           className="form-control"
                           type="text"
                           placeholder="Your WAVES wallet"
                           data-target="wallet"
                           onChange={this.onChange}
                           value={this.state.wallet}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="script-url">Notification script URL</label>
                    <input id="script-url"
                           className="form-control"
                           type="text"
                           placeholder="URL"
                           data-target="scriptUrl"
                           onChange={this.onChange}
                           value={this.state.scriptUrl}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="data-service-url">Data Service URL</label>
                    <input id="data-service-url"
                           className="form-control"
                           type="text"
                           placeholder="URL"
                           data-target="dataServiceUrl"
                           onChange={this.onChange}
                           value={this.state.dataServiceUrl}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="config-script">Config script (save it as "waves-merchant-config.js" to waves
                        merchant root folder)</label>

                    <textarea id="config-script"
                              className="form-control"
                              cols="30"
                              rows="20"
                              value={this.configScript()}
                              onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="config-mail">Config mail script (save it as "config.php" to ./mail/)</label>

                    <textarea id="config-mail"
                              className="form-control"
                              cols="30"
                              rows="6"
                              value={this.configMailScript()}
                              onChange={this.onChange}/>
                </div>

                {(itemConfig.length > 0 || merchantConfig.length > 0) && <hr/>}

                {itemConfig.length > 0 && <div><h3>Item config errors</h3> {itemConfig}</div>}

                {merchantConfig.length > 0 && <div><h3>Merchant config errors</h3> {merchantConfig}</div>}

            </div>
        );
    }
}