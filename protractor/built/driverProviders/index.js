"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./attachSession'));
__export(require('./browserStack'));
__export(require('./direct'));
__export(require('./driverProvider'));
__export(require('./hosted'));
__export(require('./local'));
__export(require('./mock'));
__export(require('./sauce'));
const attachSession_2 = require('./attachSession');
const browserStack_2 = require('./browserStack');
const direct_2 = require('./direct');
const hosted_2 = require('./hosted');
const local_2 = require('./local');
const mock_2 = require('./mock');
const sauce_2 = require('./sauce');
const logger_1 = require('../logger');
let logger = new logger_1.Logger('driverProviders');
exports.buildDriverProvider = (config) => {
    let driverProvider;
    if (config.directConnect) {
        driverProvider = new direct_2.Direct(config);
        exports.logWarnings('directConnect', config);
    }
    else if (config.seleniumAddress) {
        if (config.seleniumSessionId) {
            driverProvider = new attachSession_2.AttachSession(config);
            exports.logWarnings('attachSession', config);
        }
        else {
            driverProvider = new hosted_2.Hosted(config);
            exports.logWarnings('hosted', config);
        }
    }
    else if (config.browserstackUser && config.browserstackKey) {
        driverProvider = new browserStack_2.BrowserStack(config);
        exports.logWarnings('browserStack', config);
    }
    else if (config.sauceUser && config.sauceKey) {
        driverProvider = new sauce_2.Sauce(config);
        exports.logWarnings('sauce', config);
    }
    else if (config.seleniumServerJar) {
        driverProvider = new local_2.Local(config);
        exports.logWarnings('local', config);
    }
    else if (config.mockSelenium) {
        driverProvider = new mock_2.Mock(config);
        exports.logWarnings('mock', config);
    }
    else {
        driverProvider = new local_2.Local(config);
        exports.logWarnings('local', config);
    }
    return driverProvider;
};
exports.logWarnings = (providerType, config) => {
    let warnInto = 'Using driver provider ' + providerType +
        ', but also found extra driver provider parameter(s): ';
    let warnList = [];
    if ('directConnect' !== providerType && config.directConnect) {
        warnList.push('directConnect');
    }
    if ('attachSession' !== providerType && 'hosted' !== providerType && config.seleniumAddress) {
        warnList.push('seleniumAddress');
    }
    if ('attachSession' !== providerType && config.seleniumSessionId) {
        warnList.push('seleniumSessionId');
    }
    if ('browserStack' !== providerType && config.browserstackUser) {
        warnList.push('browserstackUser');
    }
    if ('browserStack' !== providerType && config.browserstackKey) {
        warnList.push('browserstackKey');
    }
    if ('sauce' !== providerType && config.sauceUser) {
        warnList.push('sauceUser');
    }
    if ('sauce' !== providerType && config.sauceKey) {
        warnList.push('sauceKey');
    }
    if ('local' !== providerType && config.seleniumServerJar) {
        warnList.push('seleniumServerJar');
    }
    if ('mock' !== providerType && config.mockSelenium) {
        warnList.push('mockSelenium');
    }
    if (warnList.length !== 0) {
        logger.warn(warnInto + warnList.join(', '));
    }
};
//# sourceMappingURL=index.js.map