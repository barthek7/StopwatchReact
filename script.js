class Stopwatch extends React.Component {
    constructor(){
        super();
        this.state = {
            running: false,
            display: `00:00:00`,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0,
            },
            lastWatch: null
        };
        this.reset();
        this.watch = null;
    }
    reset() {
        let newTimes = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
        };
        this.setState({times: newTimes, display: `00:00:00`});
    }
    changeDisplay(){
        let milisecondString = this.state.times.miliseconds.toString();
        let secondString = this.state.times.seconds.toString();
        let minuteString = this.state.times.minutes.toString();

        if(milisecondString.length < 2){
            milisecondString = '0'+ milisecondString;
        }
        if(secondString.length < 2){
            secondString = '0' + secondString;
        }
        if(minuteString.length < 2){
            minuteString = '0' + minuteString;
        }
        let newDisplay = `${minuteString}:${secondString}:${milisecondString}`;
        this.setState({display: newDisplay});
    }
    start() {
        if (!this.state.running) {
            this.watch = setInterval(() => {
                let newTimes = Object.assign({}, this.state.times);
                newTimes.miliseconds +=1;
                if(newTimes.miliseconds >= 100) {
                    newTimes.seconds += 1;
                    newTimes.miliseconds = 0;
                }
                if(newTimes.seconds >= 60) {
                    newTimes.minutes += 1;
                    newTimes.seconds = 0;
                }
                this.setState({running:true, times: newTimes});
                this.changeDisplay();        
            }, 10);
        }
    }

    stop() {
        clearInterval(this.watch);
        this.setState({running: false, lastWatch: this.watch});
    }

    render(){
        return(
            <div className="stopwatch">
                <nav className="controls">
                    <a href="#" className="button" id="start" onClick={() => this.start()}>Start</a>
                    <a href="#" className="button" id="stop" onClick={() => this.stop()}>Stop</a>
                    <a href="#" className="button" id="reset" onClick={() => this.reset()}>Reset</a>
                </nav>
                <div className="display">{this.state.display}</div>
            </div>
        )
    }
}
ReactDOM.render(<Stopwatch/>, document.getElementById('root'));