class WavesMerchant {
    constructor(path) {
        this.width = 300;
        this.height = 510;
        this.iframeContainer = null;
        this.iframe = null;
        this.loader = null;
        this.loaderImage = path + 'img/loading_3.svg';
        this.closeImage = path + 'img/close.svg';
        let img = new Image();
        img.src = this.loaderImage;
    }

    createLoader() {
        let loader = document.createElement('img');
        loader.src = this.loaderImage;
        loader.style = 'position: absolute; width: 100px; height: 100px; left: 100px; top: 200px';

        return loader;
    }

    init(selector, params) {
        const selectors = document.querySelectorAll(selector);
        if (selectors.length) {
            selectors.forEach(item => item.onclick = (e) => {
                const dataset = e.target.dataset;
                console.log(dataset);
                const resultParams = {...{title: ''}, ...params, ...dataset};
                console.log(resultParams);
                const url = `http://localhost:3001/?item_price_amount=${resultParams.price}&item_price_currency=${resultParams.currency}&item_title=${resultParams.title}`;
                if (this.iframeContainer) {
                    this.iframeContainer.remove();
                }

                this.loader = document.createElement('div');
                this.loader.style = `position: absolute; top: 0; right: 0; bottom: 0; left: -50%; background-color: #f8f9fb; padding: 0; margin: 0; width: ${this.width}px; heigth: ${this.height}px`;
                this.loader.appendChild(this.createLoader());

                this.iframeContainer = document.createElement('div');
                this.iframeContainer.appendChild(this.loader);
                let closeButton = document.createElement('img');
                closeButton.src = this.closeImage;
                closeButton.style = 'position: absolute; right: 52%; top: 5px; font-size: 50px; width: 30px; height: 30px';
                closeButton.onclick = () => {
                    this.iframeContainer.style.display = "none";
                };
                //border: 1px solid lightgrey;
                this.iframeContainer.style = 'border-radius: 3px; position: fixed; left: 50%; top: 5%';
                this.iframe = document.createElement('iframe');
                this.iframe.onload = () => {
                    this.loader.remove();
                    this.iframeContainer.appendChild(closeButton);
                };
                this.iframe.allowTransparency = false;
                this.iframe.style.backgroundColor = 'white';
                this.iframe.style = 'border: 0; border: 1px solid lightgrey; border-radius: 3px; left: -50%; position: relative';
                this.iframe.height = `${this.height}px`;
                this.iframe.width = `${this.width}px`;

                document.body.appendChild(this.iframeContainer);
                this.iframe.src = url;
                this.iframeContainer.appendChild(this.iframe);
            });
        }
    }
}