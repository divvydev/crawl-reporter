var rc_util = require('rippled-network-crawler/src/lib/utility.js');
var _ = require('lodash');
var moment = require('moment');

module.exports = function(crawl) {
  var data = JSON.parse(crawl.data);

  var metrics = {
    crawler: {
      ippCount: rc_util.getIpps(data).length,
      publicKeyCount: Object.keys(rc_util.getRippleds(data)).length,
      connectionsCount: Object.keys(rc_util.getLinks(data)).length,
      rippleds: {}
    }
  };

  var rippleds = rc_util.getRippledsC(data);
  _.each(Object.keys(rippleds), function (rippled) {
    metrics.crawler.rippleds[rippled] = {
      connectionsCount: rippleds[rippled].in + rippleds[rippled].out,
      up: 1
    };
  });

  console.log('Processed crawl %d \t at %s', crawl.id, moment().format());
  return metrics;
}