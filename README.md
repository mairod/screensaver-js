```

         _____                              _____                              _______
        / ___/_____________  ___  ____     / ___/____ __   _____  _____       / / ___/
        \__ \/ ___/ ___/ _ \/ _ \/ __ \    \__ \/ __ `/ | / / _ \/ ___/  __  / /\__ \
       ___/ / /__/ /  /  __/  __/ / / /   ___/ / /_/ /| |/ /  __/ /     / /_/ /___/ /
      /____/\___/_/   \___/\___/_/ /_/   /____/\__,_/ |___/\___/_/      \____//____/


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

Dev are in the ```Sources/src``` repository
The ```Sources/build``` folder can be entirely rebuild from the src folder, so DO NOT place any needed assets in the build folder ! ONLY in the ```Sources/src``` directory, they will be copied in the build during export.

Installation of Webpack : ```npm i -g webpack webpack-dev-server@2```

## To start :

1. Clone the project & ```cd path/to/the/clonned/repository```
2. Run ```sh install.sh```
3. Run ```sh run.sh```
4. Go to ```localhost:3000``` on your browser.

NOTE : The dev port is configurable in the ```package.json```

## To build :

Run ```sh build.sh```

### OSX Installation

Simply install ```OSX/Web.saver```

### Windows Installation

Simply run ```Windows/screensaver.scr```

# Credits

Screen Saver JS is made with :

1. Websaver form tlrobinson : https://github.com/tlrobinson/WebSaver
2. Runscreensaver from sinky : https://github.com/sinky/runscreensaver
3. My own Boilerplate : https://github.com/mairod/Creative-Boilerplate

Hugde thanks for tlrobinson and sinky for their work
