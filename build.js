'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.state = {
            running: false,
            display: '00:00:00',
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            lastWatch: null
        };
        _this.reset();
        _this.watch = null;
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            var newTimes = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
            this.setState({ times: newTimes, display: '00:00:00' });
        }
    }, {
        key: 'changeDisplay',
        value: function changeDisplay() {
            var milisecondString = this.state.times.miliseconds.toString();
            var secondString = this.state.times.seconds.toString();
            var minuteString = this.state.times.minutes.toString();

            if (milisecondString.length < 2) {
                milisecondString = '0' + milisecondString;
            }
            if (secondString.length < 2) {
                secondString = '0' + secondString;
            }
            if (minuteString.length < 2) {
                minuteString = '0' + minuteString;
            }
            var newDisplay = minuteString + ':' + secondString + ':' + milisecondString;
            this.setState({ display: newDisplay });
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.watch = setInterval(function () {
                    var newTimes = Object.assign({}, _this2.state.times);
                    newTimes.miliseconds += 1;
                    if (newTimes.miliseconds >= 100) {
                        newTimes.seconds += 1;
                        newTimes.miliseconds = 0;
                    }
                    if (newTimes.seconds >= 60) {
                        newTimes.minutes += 1;
                        newTimes.seconds = 0;
                    }
                    _this2.setState({ running: true, times: newTimes });
                    _this2.changeDisplay();
                }, 10);
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            clearInterval(this.watch);
            this.setState({ running: false, lastWatch: this.watch });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                { className: 'stopwatch' },
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'start', onClick: function onClick() {
                                return _this3.start();
                            } },
                        'Start'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'stop', onClick: function onClick() {
                                return _this3.stop();
                            } },
                        'Stop'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'reset', onClick: function onClick() {
                                return _this3.reset();
                            } },
                        'Reset'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'display' },
                    this.state.display
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('root'));
