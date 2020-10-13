export const environment = {
  production: false,
  exchangeRateUrls: [
    {url: 'https://www.cbr-xml-daily.ru/daily_utf8.xml', order: 1, responseType: 'text'},
    {url: 'https://www.cbr-xml-daily.ru/daily_json.js', order: 2, responseType: 'json'}
  ]
};
