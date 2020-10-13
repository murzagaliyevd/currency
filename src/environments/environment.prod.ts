export const environment = {
  production: true,
  exchangeRateUrls: [
    {url: 'https://www.cbr-xml-daily.ru/daily_utf8.xmls', order: 1, responseType: 'text'},
    {url: 'https://www.cbr-xml-daily.ru/daily_json.js', order: 2, responseType: 'json'}
  ]
};
