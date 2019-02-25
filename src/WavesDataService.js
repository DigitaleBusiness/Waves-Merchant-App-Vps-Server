export default class WavesDataService {
    constructor(url = 'https://api.wavesplatform.com/') {
        this.url = url;
        this.version = 'v0';
        this.tickers = {
            "CHILL": "DsxRbfYXzwf4PFwUD6kyEJhj2Wd5E9NsHr5WynVKTzie",
            "BCH": "zMFqXuoyrn5w17PFurTqxB7GsS71fp9dfk6XFwxbPCy",
            "DAR": "K5JcgN8UdwNdh5sbdAuPMm5XEd5aFvoXaC3iHsHVz1d",
            "OCL": "ABFYQjwDHSct6rNk59k3snoZfAqNHVZdHz4VGJe2oCV5",
            "BRW": "3EAHaZPwV5gCoWkoLhjj7rSz9ix7Q4SE6mFczoxA3f9D",
            "EFYT": "725Yv9oceWsB4GsYwyy4A52kEwyVrL5avubkeChSnL46",
            "INCNT": "FLbGXzrpqkvucZqsHDcNxePTkh2ChmEi4GdBfDRRJVof",
            "ETT": "8ofu3VpEaVCFjRqLLqzTMNs5URKUUQMrPp3k6oFmiCc6",
            "ZEC": "BrjUWjndUanm5VsJkbUip8VRYy6LWJePtxya3FNv4TQa",
            "GX": "GFiWx4dcceJXGWfHc53GMXEidpciUCN5tnHUwE18NEfY",
            "WGR": "8t8DMJFQu5GEhvAetiA8aHa3yPjxLj54sBnZsjnJ5dsw",
            "ZRC": "5ZPuAVxAwYvptbCgSVKdTzeud9dhbZ7vvxHVnZUoxf4h",
            "BEAR": "9gnc5UCY6RxtSi9FEJkcD57r5NBgdr45DVYtunyDLrgC",
            "AGRO": "J8mgyjKQb4M7DjEKvewBSvKZULMZMDpUtua9VtByLbVD",
            "XMR": "5WvPKSJXzVE2orvbkJ8wsQmmQKqTv9sGBPksV4adViw3",
            "USD": "Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck",
            "KSS": "Dq6ku3HyiMfKvorz2PLRAPwa9ykF78V1uiBhXtMbL2f2",
            "PPIO": "8UHSg6jCDTUvKT3LmeDjoaPxKmnJhdLEgBHU3vUrojSm",
            "CORE": "3MyMJ9pXLTDnMQhNgoDUBtcfmaGVgnaZNARZwcZzMFk7",
            "BTC": "8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS",
            "SMQ": "CBik4JEmsoPZKKATnShULYj2ebUao5aada9N1XGznEET",
            "YURI": "6H97QsMJWCTRTzZ3wGKofKUbndxbQAaYMsMC2JFjXBy9",
            "HALAL": "BjAZxDeFpYaQ1gwmg65vYArhve31k8j9mscQDecNZ2bX",
            "AKCHE": "3ihiQ1TJhe7fBrMc8o9EY8tQNU6phkmp8ZEyvVe4Jfhk",
            "WPC": "ANTz8NnpfbEcDFXo4gwd7UL5ugc9bdTcPGbEPktRPZw2",
            "LTC": "HZk1mbfuJpmxU1Fs4AX5MWLVYtctsNcg6e2C6VKqK8zk",
            "MER": "HzfaJp8YQWLvQG4FkUxq2Q7iYWMYQ2k8UF89vVJAjWPj",
            "STAR": "BTfuGGoeA934Ta1fgcehQ5UhbHuWKj4don64ZNBuMT38",
            "VK": "5WLqNPkA3oDp1hTFCeUukTL1qvFnk9Ew7DXTtCzvoCxi",
            "GLIPP": "9g5JiYThxFTxknSMA3TT5xoXG7GYjRrTJxxLeeoQ36kJ",
            "COF": "AcrRM9STdBu5PNiFveTCbRFTS8tADhKcsbC2KBp8A4tx",
            "KING": "CHUTTYkDd9qFmQthCL7eHTDHwYudfthqwYCYsdvpCZbf",
            "MRT": "4uK8i4ThRGbehENwa6MxyLtxAjAo1Rj9fduborGExarC",
            "EUR": "Gtb1WRznfchDnTh37ezoDTJ4wcoKaRsKqKjJjy7nm2zU",
            "MTN": "4X7Uk2DLGj1HoWyaezRmCYW7hrzGRxa5N3F53YnNaWzD",
            "WIN": "7Ry7rUTSS1iCJBFa7trCbwzAwnvvAUrX3gcz2iTL8aAF",
            "WPN": "BkFyeRdrLquxds5FenxyonyfTwMVJJ6o6L7VTaPr5fs3",
            "SHDW": "ETLzrCpBqTrpyuMGdiVLBPZnUoKwte88oVdJjoFi5R2h",
            "CWV": "HxxSmVuX4HbHDiDSGg96nx7wgCBhB9UPHh6pxgnKXjv4",
            "WCT": "DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J",
            "MTNT": "8HYDtqEuHj3RDcwR8yxEvPq1qQSB9FazC8wMHtRb2TFe",
            "DASH": "B3uGHFRpSUuGEDWjqB9LWWxafQj8VTvpMucEyoxzws5H",
            "WCASH": "2sikuhpBdZV2x5gHoA7adCStxuTSJ8m6r4hSRDLKz2zN",
            "SMART": "4xDfFdPorzNmB5w8p28Fs5z6fPMf4QKJGcxY3DWT9ugG",
            "PING": "Bi4w2UuGRt2jAJFfRb8b3SwDUV5x8krCzX2zZHcRfPNc",
            "WFN": "7yXJqP2zpXTiXuS2o25seUHYxdDnfSPZJ3SEm5DrQ7cx",
            "B@": "APz41KyoKuBBh8t3oZjqvhbbsg6f63tpZM5Ck5LYx6h",
            "TRY": "2mX5DzVKWrAJw8iwdJnV2qtoeVG9h5nTDpTqC1wb1WEN",
            "YTB": "HhzJGgbbogGQubKkHUyEaHKs7fBRebjoJkgiDQ8jrYee",
            "WGO ": "4eT6R8R2XuTcBuTHiXVQsh2dN2mg3c2Qnp95EWBNHygg",
            "ALAN": "7FV44UeijbdjbQpDhqt35TcuJ3kb9USFx25BTaUWop2X",
            "MGO": "2Y8eFFXDTkxgCvXbMT5K4J38cpDYYbQdciJEZb48vTDj",
            "BKT": "9c7U7bXdP23oHpmGKwGfSsjFrpxdRcp3tp28qbfhEc3d",
            "WXX": "8LLpj6yQLUu37KUt3rVo1S69j2gWMbgbM6qqgt2ac1Vb",
            "RBX": "AnERqFRffNVrCbviXbDEdzrU6ipXCP5Y1PKpFdRnyQAy",
            "VLAD": "FNFEwvwXEW2w8bzCFhMFL51xXkCt8xAB8gzxqmYRFVx9",
            "KLN": "EYz8Zvs62D4d7F5ZgXHCWuzuFaZg63FYnfVQrTWQoLSK",
            "ZIGM": "4fEMX9677YjBntx1XEEyeYFVS25xBoGqQvu6Juf6UuMM",
            "ETH": "474jTeYx2r2Va35794tCScAXWJG9hU2HcgxzMowaZUnu",
            "LIQUID": "7FzrHF1pueRFrPEupz6oiVGTUZqe8epvC7ggWUx8n1bd",
            "WNET": "AxAmJaro7BJ4KasYiZhw7HkjwgYtt2nekPuF2CN9LMym",
            "COXST": "7tZxVdAWc8QvsMrXBoicMgU2bSJsaEpFJnPYn1H31B8B",
            "JOHN": "8kPjEfx2mdrdRGKc7V7ercPdURNaJZMw1TDaMgsi98fR",
            "STA": "3SdrmU1GGZRiZz12MrMcfUz4JksTzvcU25cLFXpZy1qz",
            "CEIT": "83Y1Ub3Kp9uitTTgKGPnaZE6EC793XuC3muoJC8zsFir",
            "OCC": "CL9PN5rpMm3ed2x6g9SWDQJfHciZFwXee2hhehmitzRj",
            "SGIT": "BYkKnXLUS3qRyNvbSTvNWJ3pTsW7uZGHhV4HQ3pdf6DW",
            "MBI": "CJpRwfpBcFyA6p3g1fb7xuiArSQ7xLkNH8SD9AB4HeD9",
            "GFL": "D6hYNYUSxsLtvkUJ4Mxp6s7mT4WACbwJSsVGCQKxkSfH",
            "TOM": "3e7aYkysNohFDonLVaUFGgZ46mV3Y3r7Rqzi95GYGxeK",
            "RDCR": "EXKrrWnMYnZrPYbrygnwzKKx5jjaEqALEgQhtoCcBdKG",
            "ESC": "FoKiAEqHSit88f4iu1neKkzsanYHQqLRyR4DXucRGKbW",
            "ViC": "Gh8Ed6n1y9wscFHT6s4EH6uhKajvNQ88oPkkFkYkgXyX",
            "LIFE": "5qtfgMsSAQsYMC947aYZcej1qMVQvMfRgLc3mexMXWE1",
            "LIKE": "71tUQ7miLb2vNViGYCarYvdNj2BnDyxuFMCQivViqZq6",
            "ARNA": "BsDmB74Y1PvtVrE741i5CJThChQHHF96hDL5nXwv7JdS",
            "GRPH": "13QuhSAkAueic5ncc8YRwyNxGQ6tRwVSS44a7uFgWsnk",
            "MBX": "2CX6EFHYmXYyop4hD7dUywST5K51Hvi2m5brFo35C6EZ",
            "FUPOOF": "EAmQHCqBVeNunvYRC5bFQh6mtvF34bL9qAwug5PGvjjE",
            "AP#0": "BYMmfwocym3d3cuFc9XytbAWGCdAM9875n5fTFokGTMm",
            "CC": "6UfBupFwFnWTrnFDWiR73LQjPxRY38CgZ6Bu4m4SySQY",
            "RDT": "Fw2Sg8x4VZyxU5ManJTo69JCKg9Rox7xDNKxdQdxXDWk",
            "CNX": "CSX1Ynv6AXmJmfnG1hBczrL9tN5HWrjVx5Ur3WJeuErv",
            "JNT": "8FHrsE6ixLyEnbcJqxXaGRcEU2aziuEBvQ6Tebgqrv5c",
            "RSC": "EMdiF8uaySswfCdMxc114rSfzUsAKCtK9d8eSx6ruKP4",
            "ANY": "2L9piWsMG4dZ84WgybXa9SPYFhyBEiP5fcv1BmJ9Gy7X",
            "MIROS": "DRPtqq586UtanomrsWKYgf7h5eXv39HN4AVCrq9k3Bcc",
            "EQ": "DoL6wC5a72Fuxg7FtfUMWbJB9kjRuvQ3BQKrgjym3gh6",
            "AHT": "HfFHZaPzGMSdHvaaZ7S8mrZrPWEyGzfA6VDuSRzb8uY6",
            "AP#1": "FgPzwZqGngVG45d6WtP5273diR8cHRjs95aT6g1tuFUv",
            "IRA": "3eBcKvyMavxACq54yvXk1rCAP4E475NCwGKV6AmQQNaw",
            "UPC": "4764Pr9DpKQAHAjAVA2uqnrYidLMnM7vpDDLCDWujFTt",
            "CNY": "DEJbZipbKQjwEiRjx2AqQFucrj5CZ3rAc4ZvFM8nAsoA",
            "PBT": "EdDvbhk4wJ1kL6pMCq1V36GbQE2nGE7Metb87zbaY2JL",
            "DARF": "96NFBPoikAeacesZggFa6wBXAyczgZFyupbX5rJwFfdQ",
            "KUN": "F6EK5bcdEShWPA9pGdgqGYmPPUZ9FaHnyVwPZfXCTxV7",
            "PBKX": "39wcSXj4MdRNRJXA88rVxF7EXWjYixaA3J3EteoN6DMM",
            "SMR": "EbY2Uf9ukD4ndg5J7MA7CjhB7xbAsiViTmVSemb186V8",
            "WNT": "EqdXBgKgKqdpD3kGT4tS9VgLifZXS3ASihwM3hnprNdU",
            "KKO": "6gZUKe6EhDnA8vMFdwLMjLm3QLhRe1v66LvST7ZWJcZW",
            "KNOWS": "CqSHx4WhszTZhabfWD8UuX8efg5hbZTPRNtnwW1ojJxe",
            "AP#2": "6qLNnEV34cE8CZi5hk3nTNiUeHZcKz35R7AafPSukSAt",
            "DIMO": "BEth3AJY65jWWF7KCDSFgMS6g5AvDvoAWrn8UYEsoA17",
            "ZAR": "FGiL1zJyRZhUmjhsq6oB3kurfTfeX4szXrqFymKW42oP",
            "DCN": "DnAGJqeraWszYBfRjjbxtZDb1vggjUDZjWo49i15hGo1",
            "NEWS": "2EAUTcAsFMsndSgiGacKRvygFR1e6gdSd8bEpiemsTPE",
            "2B4T": "2LU8GwJFvVebrCvgDhMTLDzm3dHxuN1x7ks8dQRiSj9N",
            "UWT": "AdEVVde2XTDa1qDPWfChUGH2XP67duQ4NnpQWXs7wETF",
            "GIN": "9x9ATvB61fE5TU1zRdZvyvA5Q8ZYEs2yRmzTBAs69R9N",
            "DAT": "DBLes8Bxb1P4qL1XaRRPL4d4xTVZSWHKP4oKGyFZjwBe",
            "TKS": "BDMRyZsmDZpgKhdM7fUTknKcUbVVkDpMcqEj31PUzjMy",
            "WAVES": "WAVES"
        };
    }

    getUrl(method) {
        return `${this.url}${this.version}/${method}`;
    }

    getTickerId(ticker, isForce = false) {
        ticker = ticker.toUpperCase();

        if (this.tickers[ticker] && !isForce) {
            return new Promise((resolve, reject) => {
                resolve(this.tickers[ticker]);
            });
        } else {
            const url = this.getUrl(`assets?ticker=${ticker}`);
            return fetch(url)
                .then(data => data.json())
                .then(data => {
                    console.log(data);
                    let tickerId = data.data
                        .map(item => item.data.ticker === ticker ? item.data.id : null)
                        .filter(item => item !== null);
                    //console.log(tickerId);
                    if (tickerId.length) {
                        tickerId = tickerId[0];
                    } else {
                        tickerId = null;
                    }

                    if (tickerId) {
                        this.tickers[ticker] = tickerId;
                    }

                    return tickerId;
                });
        }
    }

    getPriceByTickers(fromTicker, toTicker) {
        fromTicker = fromTicker.toUpperCase();
        toTicker = toTicker.toUpperCase();
        return this.getTickerId(fromTicker)
            .then(fromTickerId => {
                return this.getTickerId(toTicker)
                    .then(toTickerId => {
                        return {
                            fromTickerId,
                            toTickerId
                        }
                    });
            })
            .then(data => {
                const url = this.getUrl(`pairs/${data.fromTickerId}/${data.toTickerId}`);

                return fetch(url)
                    .then(data => {
                        const contentType = data.headers.get("content-type");
                        if (contentType && contentType.indexOf("application/json") !== -1) {
                            return data.json();
                        } else {
                            return null;
                        }
                    })
                    .then(data => {
                        if (data) {
                            return data.data.lastPrice;
                        } else {
                            return null;
                        }
                    });
            });
    }
}