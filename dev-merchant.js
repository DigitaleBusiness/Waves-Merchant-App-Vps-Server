class WavesMerchant {
    constructor() {
        this.iframe = null;
    }

    init(selector, params) {
        const selectors = document.querySelectorAll(selector);
        if (selectors.length) {
            selectors.forEach(item => item.onclick = () => {
                //this.iframe.style.display = "block";
                if (this.iframe) {
                    return;
                }

                this.iframe = document.createElement('iframe');
                //this.iframe.style.display = "none";
                this.iframe.src = `http://localhost:3001/?item_price_amount=${params.price}&item_price_currency=USD`;
                this.iframe.height = '400px';
                document.body.appendChild(this.iframe);
            });
        }
    }
}