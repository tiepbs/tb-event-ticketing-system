module.exports = function override(config, env) {
    // Bỏ qua các cảnh báo source map từ thư viện html5-qrcode
    config.module.rules = config.module.rules.map(rule => {
      if (rule.oneOf) {
        rule.oneOf = rule.oneOf.map(innerRule => {
          if (innerRule.use && innerRule.use[0] && innerRule.use[0].loader && innerRule.use[0].loader.includes('source-map-loader')) {
            innerRule.exclude = /node_modules\/html5-qrcode/;
          }
          return innerRule;
        });
      }
      return rule;
    });
  
    return config;
  };
  