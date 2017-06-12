import MyComponent from './components/myComponent.class.js'
import * as TOOLS from './components/tools.class.js'

var test = new MyComponent()

var framecounter = new TOOLS.FrameRateUI()

// start animating
animate();

function animate() {
    requestAnimationFrame(animate);

    // Updating components
    framecounter.update()

}

// console.log("YO !");
