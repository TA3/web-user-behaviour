<h3 align="center">User Behaviour Tracking</h3>
<h4 align="center">5.3 KB</h4>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/TA3/web-user-behaviour)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/TA3/web-user-behaviour)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">Advanced User Behaviour Tracking Library with 15+ tracking dimensions including media interactions, form tracking, and custom event support.<br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Installation](#install)
- [Configuration](#config)
- [Methods](#methods)
- [Tracking](#tracking)
- [Results](#results)

## 🧐 About <a name = "about"></a>

This Javascript Library allows to track user's behaviour by recording mouse activities:

- Mouse tracking (movement, clicks, scroll)
- Keyboard activity monitoring
- Page navigation history
- Form interaction tracking
- Touch event capture
- Media play events (audio/video)
- Window visibility changes
- Custom event registration
- Device/browser fingerprinting

## 🏁 Installation <a name = "install"></a>

There are two ways to include userBehaviour.js to your browser:

1. jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/gh/TA3/web-user-behaviour/userBehaviour.min.js"></script>
```

2. Local file

```html
<script src="/path/to/userBehaviour.js"></script>
```

## 🔧 Configuration <a name = "config"></a>

The library requires a configuration object. Pass the object to the library with:

```javascript
userBehaviour.config({.....});
```

If no configuration was passes the libray will use the default configuration:

```javascript
{
    userInfo: true,
    clicks: true,
    mouseMovement: true,
    mouseMovementInterval: 1,
    mouseScroll: true,
    timeCount: true,
    windowResize: true,
    visibilitychange: true,
    keyboardActivity: true,
    pageNavigation: true,
    formInteractions: true,
    touchEvents: true,
    audioVideoInteraction: true,
    clearAfterProcess: true,
    processTime: 15,
    processData: function(results){
        console.log(results);
    },
}
```

| Config Key              | Description                                                     | Type     | Default |
| ----------------------- | --------------------------------------------------------------- | -------- | ------- |
| userInfo                | Record browser/device details                                   | bool     | true    |
| clicks                  | Track mouse clicks                                              | bool     | true    |
| mouseMovement           | Track mouse movement                                            | bool     | true    |
| mouseMovementInterval   | Mouse position sampling interval (seconds)                      | int      | 1       |
| mouseScroll             | Track page scrolling                                            | bool     | true    |
| timeCount               | Track session timing                                            | bool     | true    |
| windowResize            | Track window size changes                                       | bool     | true    |
| visibilitychange        | Track tab visibility changes                                    | bool     | true    |
| keyboardActivity        | Track keyboard input                                            | bool     | true    |
| pageNavigation          | Track history changes (pushState/popState)                      | bool     | true    |
| formInteractions        | Track form submissions                                          | bool     | true    |
| touchEvents             | Track touch interactions                                        | bool     | true    |
| audioVideoInteraction   | Track media play events                                         | bool     | true    |
| customEventRegistration | Enable custom event tracking                                    | bool     | true    |
| clearAfterProcess       | Clear data after processing                                     | bool     | true    |
| processTime             | Automatic processing interval (seconds) - false for manual only | int/bool | 15      |
| processData             | Callback function for processed data                            | function | console |

## 📚 Methods <a name="methods"></a>

This is a list of all available methods that can be called:

| Method                | Description                     | Example                                                |
| --------------------- | ------------------------------- | ------------------------------------------------------ |
| registerCustomEvent() | Register custom event tracking  | `userBehaviour.registerCustomEvent('event', callback)` |
| showConfig()          | View current configuration      | `userBehaviour.showConfig()`                           |
| config()              | Update configuration            | `userBehaviour.config({...})`                          |
| start()               | Start tracking                  | `userBehaviour.start()`                                |
| stop()                | Stop tracking                   | `userBehaviour.stop()`                                 |
| showResult()          | Get current dataset             | `userBehaviour.showResult()`                           |
| processResults()      | Force immediate data processing | `userBehaviour.processResults()`                       |

## 🚀 Tracking <a name = "tracking"></a>

Start tracking with:

```javascript
userBehaviour.start();
```

Track custom events:

```javascript
userBehaviour.registerCustomEvent("surveyCompleted", (e) => {
  console.log("Survey completed:", e.detail);
});
```

Manual data processing:

```javascript
userBehaviour.processResults();
```

Stop tracking with:

```javascript
userBehaviour.stop();
```

## 🎈 Results <a name="results"></a>

To view the results at anytime after the tracking has started:

```javascript
userBehaviour.showResult();
```

The result will be passed to a function set regularly with an interval set in the [configuration](#config) section.

The data could also be sent via a POST request using any HTTP request libraries e.g axios, ajax, ...

```javascript
processData: function(results){
        axios.post('https://example.com', results);
}
```

If processTime was set to false, data will not be processed automatically. Therefore, you might require to process the data manually with:

```javascript
userBehaviour.processResults();
```

This method will still require processData to be set in the configuration.

### Example of Result

```javascript
{
  "userInfo": {
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "vendor": "Google Inc.",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36"
  },
  "time": {
    "startTime": 1572725042761,
    "currentTime": 1572725069204
  },
  "clicks": {
    "clickCount": 3,
    "clickDetails": [
      [
        554,
        542,
        "html>body>div#login>div.ui.container.animated.fadeInDown>div.ui.center.aligned.colored.trends.segment>form.ui.form>div.fields>div.ten.wide.field>input",
        1572725045313
      ]
    ]
  },
  "mouseMovements": [
    [
      1031,
      328,
      1572725043646
    ]
  ],
  "mouseScroll": [],
   "keyboardActivities": [
    ["Enter", 1676543210000],
    ["Escape", 1676543220000]
  ],
  "navigationHistory": [
    ["https://example.com/about", 1676543230000],
    ["https://example.com/contact", 1676543240000]
  ],
  "formInteractions": [
    ["email_signup", 1676543250000],
    ["contact_form", 1676543260000]
  ],
  "touchEvents": [
    ["touchstart", 320, 480, 1676543270000]
  ],
  "mediaInteractions": [
    ["play", "video.mp4", 1676543280000]
  ]
}
```

## 🎉 Acknowledgements

- https://github.com/shnere/user-behavior for inispiration.
