```

          ____        _ __                __      __
         / __ )____  (_) /__  _________  / /___ _/ /____
        / __  / __ \/ / / _ \/ ___/ __ \/ / __ `/ __/ _ \
       / /_/ / /_/ / / /  __/ /  / /_/ / / /_/ / /_/  __/
      /_____/\____/_/_/\___/_/  / .___/_/\__,_/\__/\___/
                               /_/


```
# Requirement :

```
npm
Webpack 2
```

Node version recommended :

```
Node : v7.4.0
npm : 4.0.5
```
## Running Dev Environement

Dev are in the ```/src``` repository
The ```/build``` folder can be entirely rebuild from the src folder, so DO NOT place any needed assets in the build folder ! ONLY in the ```/src``` directory, they will be copied in the build during export.

Installation of Webpack : ```npm i -g webpack webpack-dev-server@2```

##To start :

1. Clone the project & ```cd path/to/the/clonned/repository```
2. Run ```npm install```
3. Run ```npm start```
4. Go to ```localhost:3000``` on your browser.

NOTE : The dev port is configurable in the ```package.json```

##Need HTTPS ?

Simply run ```npm run https```

##To build :

Run ```npm run build```




#Tools :

# Simple easing functions

Some mathematics easing equations

Only considering the t value for the range [0, 1]

## Simple linear tweening

No easing, no acceleration

```
Math.linear = function (t) { return t }
```

## Quadratic easing in

Accelerating from zero velocity

```
Math.easeInQuad = function (t) { return t*t }
```

## Quadratic easing out

Decelerating from zero velocity

```
Math.easeOutQuad = function (t) { return t*(2-t) }
```

## Quadratic easing in-out

Acceleration until halfway, then deceleration

```
Math.easeInOutQuad = function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t }
```

## Cubic easing in

Accelerating from zero velocity

```
Math.easeInCubic = function (t) { return t*t*t }
```

## Cubic easing out

Decelerating to zero velocity

```
Math.easeOutCubic = function (t) { return (--t)*t*t+1 }
```

## Cubic easing in-out

Acceleration until halfway, then deceleration

```
Math.easeInOutCubic = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
```

## Quart easing in

Accelerating from zero velocity

```
Math.easeInQuart = function (t) { return t*t*t*t }
```

## Quart easing out

Decelerating to zero velocity

```
Math.easeOutQuart = function (t) { return 1-(--t)*t*t*t }
```

## Quart easing in-out

Acceleration until halfway, then deceleration

```
Math.easeInOutQuart = function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }
```

## Quint easing in

Accelerating from zero velocity

```
Math.easeInQuint = function (t) { return t*t*t*t }
```

## Quint easing out

Decelerating to zero velocity

```
Math.easeOutQuint = function (t) { return 1-(--t)*t*t*t }
```

## Quint easing in-out

Acceleration until halfway, then deceleration

```
Math.easeInOutQuint = function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }
```

# UI Tools

## Storage

There is a global object for storing data and recovering it anywhere.

Simply use :

```
STORAGE.my_var = "foo";

and after :

let my_var = STORAGE.my_var;
```

## Framerate Visualizer

There is a FPS light weight homemade visualizer very simple to use.


![alt tag](http://www.zupimages.net/up/16/43/w3co.png)


```
import * as tools from './lib/tools.class.js'

var frameRateUI = new tools.FrameRateUI
```

and in your ```requestAnimationFrame()``` call :

```
frameRateUI.update()
```

## AudioAnalyzer

The AudioAnalyzer is here to help you to build some cools animations from a sound. You will be able to create some controls points based on a frequecy for animated your elements


![alt tag](http://zupimages.net/up/16/43/0zoj.png)


```
import * as tools from './lib/tools.class.js'

var audioAnalyzer = new tools.AudioAnalyzer({
        url: url,
        samplingFrequency: 256,
        playerUI: true,
        autoplay: true,
        debug: true,
    })

audioAnalyzer.addControlPoint({
      bufferPosition : //your frequency number between 0 and the buffer size
})

```


The AudioAnalyzer has some helpful methods :

```
audioAnalyzer.hide()
audioAnalyzer.show()
audioAnalyzer.play()
audioAnalyzer.update()
```

All the controls are stored in the array :

```
audioAnalyzer.controls
```

Each control as a method for changing is frequency :

```
audioAnalyzer.controls[index].shift( //your new frequency number between 0 and the buffer size )
```


And don't forget in your ```requestAnimationFrame()``` to call :

```
audioAnalyzer.update()
```
