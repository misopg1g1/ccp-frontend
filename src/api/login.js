import {post} from './request';

const dataToSend = () => {
    const settingsDevice = [];
    const osDevice = function(regexp) {
        return regexp.test(window.navigator.userAgent);
    };
    switch(true) {
        case osDevice(/Win/i):
            settingsDevice.os = 'windows';
            break;
        case osDevice(/Mac/i):
            settingsDevice.os = 'mac';
            break;
        case osDevice(/Linux/i):
            settingsDevice.os = 'linux';
            break;
        case osDevice(/X11/i):
            settingsDevice.os = 'unix';
            break;
        default:
            settingsDevice.os = 'linux';
            break;
    }

    const browserDevice = function(regexp) {
        return regexp.test(window.navigator.userAgent);
    };

    switch (true) {
        case browserDevice(/edg/i):
            settingsDevice.browser = 'IE';
            break;
        case browserDevice(/trident/i):
            settingsDevice.browser = 'IE';
            break;
        case browserDevice(/firefox|fxios/i):
            settingsDevice.browser = 'Firefox';
            break;
        case browserDevice(/opr\//i):
            settingsDevice.browser = 'Opera';
            break;
        case browserDevice(/ucbrowser/i):
            settingsDevice.browser = 'UC Browser';
            break;
        case browserDevice(/samsungbrowser/i):
            settingsDevice.browser = 'Samsung Browser';
            break;
        case browserDevice(/chrome|chromium|crios/i):
            settingsDevice.browser = 'Chrome';
            break;
        case browserDevice(/safari/i):
            settingsDevice.browser = 'Safari';
            break;
        default:
            settingsDevice.browser = 'Other';
            break;
    }
    return settingsDevice;
}

export function login(body) {
    const deviceSettings = dataToSend();
    const send = body;
    send.browser = deviceSettings.browser;
    send.os = deviceSettings.os;
    return post('/api/login', {}, send);
}