//Global data storage
window.STORAGE = {}

// UI for displaying the frameRate
export class FrameRateUI {
    constructor(options) {
        this.options = options
        this.mainContainer = document.querySelector('body')
        this.subContainer = document.createElement('div')
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext("2d")
        this.rawFps = 0
        this.displayedFps = 60
        this.lastLoop = new Date
        this.flag = {
            frameRate: [],
            graph: []
        }
        this.init()
    }
    init() {
        this.canvas.width = 150
        this.canvas.height = 180
        this.canvas.style.backgroundColor = '#2C302E'
        this.subContainer.style.position = 'fixed'
        this.subContainer.style.zIndex = '100'
        this.subContainer.classList.add('fps')
        this.subContainer.appendChild(this.canvas)
        this.mainContainer.appendChild(this.subContainer)
        this.draw()
    }
    draw() {
        var ctx = this.context
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.display_number()
        this.display_graph()
    }
    raw_to_displayed() {
        this.flag.frameRate.push(this.rawFps)
        if (this.flag.frameRate.length > 29) {
            var sum = 0
            for (var i = 0; i < this.flag.frameRate.length; i++) {
                sum += this.flag.frameRate[i]
            }
            this.displayedFps = Math.round(sum / this.flag.frameRate.length)
            this.flag.frameRate = []
            this.draw()
        }
    }
    display_graph() {
        var fps = this.displayedFps
        var fpsRatio = this.rawFps / 60
        this.flag.graph.push({
            ratio: fpsRatio,
            fps: this.rawFps
        })
        if (this.flag.graph.length > 49) {
            this.flag.graph.shift()
        }
        for (var i = 0; i < this.flag.graph.length; i++) {
            var index = i / 50
            var stats = this.flag.graph[i]
            this.draw_stats(index, stats.ratio, stats.fps)
        }
    }
    draw_stats(index, ratio, fps) {
        var ctx = this.context
        ctx.strokeStyle = this.color_selector(fps)
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, 100 * index);
        ctx.lineTo((150 * ratio) - 20, 100 * index);
        ctx.stroke();
        ctx.stroke()
        ctx.closePath()
    }
    display_number() {
        var ctx = this.context
        var fps = this.displayedFps
        var raw = this.rawFps
        ctx.font = "20px Arial"
        ctx.fillStyle = this.color_selector(fps)
        ctx.fillText(fps, this.canvas.width / 2 - 10, this.canvas.height - 50);
        ctx.fillStyle = 'white'
        ctx.fillText('fps :', this.canvas.width / 2 - 60, this.canvas.height - 50);
        ctx.fillStyle = this.color_selector(fps)
        ctx.fillText(raw, this.canvas.width / 2 + 25, this.canvas.height - 20);
        ctx.fillStyle = 'white'
        ctx.fillText('raw fps :', this.canvas.width / 2 - 60, this.canvas.height - 20);
    }
    color_selector(fps) {
        if (fps < 20) {
            return '#E86252'
        } else
        if (fps < 30) {
            return '#DBD56E'
        } else
        if (fps < 50) {
            return '#596157'
        } else
        if (fps < 200) {
            return '#5B8C5A'
        }
    }
    update() {
        var thisLoop = new Date;
        this.rawFps = Math.round(1000 / (thisLoop - this.lastLoop));
        this.lastLoop = thisLoop;
        this.raw_to_displayed()
    }
    hide() {
        this.subContainer.style.display = 'none'
    }
    show() {
        this.subContainer.style.display = 'block'
    }
    toggleShow() {
        if (this.subContainer.style.display == 'none') {
            this.subContainer.style.display = 'block'
        } else {
            this.subContainer.style.display = 'none'
        }
    }
}


// Spectrum debug and analysis
export class AudioAnalyzer {
    constructor(options) {
        this.options            = options || new Object
        this.debug              = this.options.debug || true
        this.audioElement       = this.options.audioElement || undefined
        this.url = this.options.url
        this.samplingFrequency = this.options.samplingFrequency
        this.mainContainer = document.querySelector('body')
        this.container = document.createElement('div')
        this.canvas = document.createElement('canvas')
        this.width = 400
        this.height = 100
        this.context = this.canvas.getContext("2d")
        this.audio
        this.dataArray
        this.loaded = false
        this.bufferLength
        this.controls = []
        this.init()
        if (!this.options.debug) {
            this.hide()
        }
    }
    init() {
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.style.backgroundColor = '#2C302E'
        this.container.style.position = 'fixed'
        this.container.style.bottom = 0
        this.container.style.left = 0
        this.container.style.zIndex = '100'
        this.container.appendChild(this.canvas)
        this.container.classList.add('spectrum')
        this.mainContainer.appendChild(this.container)
        if (this.audioElement != undefined) {
            this.audio = this.audioElement
        } else {
            this.audio = new Audio()
            this.audio.src = this.url
            this.audio.controls = this.options.playerUI
            this.audio.autoplay = this.options.autoplay
            this.audio.crossOrigin = "anonymous"
        }
        if (this.audio.controls) {
            this.canvas.style.paddingBottom = '28px'
            this.audio.style.position = 'absolute'
            this.audio.style.bottom = 0
            this.audio.style.left = 0
            this.audio.style.width = this.width + 'px'
        }
        this.container.appendChild(this.audio)
        this.audio.context = new(window.AudioContext || window.webkitAudioContext)()
        var that = this
        this.analyser = this.audio.context.createAnalyser()
        this.analyser.minDecibels = -90
        this.analyser.maxDecibels = -10
        this.analyser.smoothingTimeConstant = 0.85
        // this.analyser.smoothingTimeConstant = .99
        this.analyser.fftSize = this.samplingFrequency
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
        var source = that.audio.context.createMediaElementSource(that.audio)
        source.connect(that.analyser)
        that.analyser.connect(that.audio.context.destination)
        that.loaded = true
    }
    addControlPoint(options) {
        var control = new Object
        if (options.bufferPosition > this.bufferLength) {
            console.error(control, ' : the frequency cannot be superior to the buffer size')
        } else {
            var that = this
            control.frequency = options.bufferPosition
            if (this.debug) {
                console.log('New audio control point created at buffer position', control.frequency)
            }
            control._data = {
                position: {
                    x: 0,
                    y: 0
                },
                radius: ((this.width / 4) / this.bufferLength) * 2.5
            }
            control.strength = 0
            control.id = this.controls.length
            control.shift = function(frequency) {
                if (frequency != undefined) {
                    that.controls[control.id].frequency = frequency
                    console.log('Audio control (id : ' + control.id + ') point shifted at buffer position ', frequency)
                }
            }
            this.controls.push(control)
        }
    }
    updateControlPoint() {
        var ctx = this.context
        for (var i = 0; i < this.controls.length; i++) {
            var control = this.controls[i]
            var dataFrequency = Math.round(control.frequency / 2)
            control._data.position.x = control.frequency * (((this.width / 4) / this.bufferLength) * 2.5 + 1)
            control.strength = this.dataArray[control.frequency] / 255
            control._data.position.y = this.height - control.strength * 100
            ctx.beginPath()
            ctx.fillStyle = 'white'
            ctx.arc(control._data.position.x, control._data.position.y, control._data.radius * 2.5, 0, 2 * Math.PI)
            ctx.fill()
            ctx.stroke()
        }
    }
    update() {
        var ctx = this.context
        ctx.clearRect(0, 0, this.width, this.width)
        this.analyser.getByteFrequencyData(this.dataArray)
        var barWidth = ((this.width / 4) / this.bufferLength) * 2.5
        var barHeight
        var x = 0
        for (var i = 0; i < this.bufferLength; i++) {
            barHeight = this.dataArray[i]
            ctx.fillStyle = 'rgb(' + (barHeight + this.height) + ',50,50)'
            ctx.fillRect(x, this.height - barHeight / 2, barWidth, barHeight / 2)
            x += barWidth + 1
        }
        ctx.font = "12px Arial"
        ctx.fillStyle = 'white'
        ctx.fillText('Buffer Size: ' + this.bufferLength, this.width - 110, 30)
        this.updateControlPoint()
    }
    hide() {
        this.container.style.display = 'none'
    }
    show() {
        this.subContainer.style.display = 'block'
    }
    toggleShow() {
        if (this.container.style.display == 'none') {
            this.container.style.display = 'block'
        } else {
            this.container.style.display = 'none'
        }
    }
    play() {
        this.audio.play()
    }
}

Math.easing = {
    linear:               function (t) { return t },
    easeInQuad:           function (t) { return t*t },
    easeOutQuad:          function (t) { return t*(2-t) },
    easeInOutQuad:        function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    easeInCubic:          function (t) { return t*t*t },
    easeOutCubic:         function (t) { return (--t)*t*t+1 },
    easeInOutCubic:       function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
    easeInQuart:          function (t) { return t*t*t*t },
    easeOutQuart:         function (t) { return 1-(--t)*t*t*t },
    easeInOutQuart:       function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
    easeInQuint:          function (t) { return t*t*t*t*t },
    easeOutQuint:         function (t) { return 1+(--t)*t*t*t*t },
    easeInOutQuint:       function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}
