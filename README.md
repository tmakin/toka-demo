# Intro
A demo of STL mesh rendering using WebGL.

The app is built using Typescript and the [BablyonJS](https://www.babylonjs.com) game engine. 
NodeJs and [Webpack](https://webpack.js.org) are used for compiling and deploying the code.

## Live Demo
A live demo is hosted on GitHub pages:  
https://tmakin.github.io/toka-demo/

All major browsers are supported including IE11.

### Demo Controls
The rendered scene supports rotate, zoom and pan:
```
Rotate : Left button or arrow keys
   Pan : Right button or Ctrl + left button
  Zoom : Wheel
```


# Development #
## Prerequisites
- NodeJs : https://nodejs.org/ (v10.16.1)

## Local Dev Server
1. Install required dependencies
    ```
    npm install 
    ```

2. Start local development server
    ```
    npm start 
    ```

3. Navigate to [http://localhost:8080](http://localhost:8080)

## Production Build ##
1. Build the app
    ```
    npm run build
    ```
2. Deployable app is in `dist` folder


## Deployment to Github Pages
The contents of the dist folder can be run from any static web server. 
For the live demo `dist` is pushed to the gh-pages branch using the command:  
```
npm run deploy
```
    
To build and deploy in a single command there is an additional helper script:  
```
npm run publish
```

You will be asked for credentials on the command line.    

If you get a message about missing `git-upload-pack` then ensure the git `bin` directory is on the path:  
https://stackoverflow.com/questions/51748946/git-upload-pack-not-found-when-deploying

For more info see here:  
https://www.npmjs.com/package/gh-pages

## Webpack Notes
Io keep the BabylonJS bundle size down it is necessary to import modules directly from the relevant 
files rather than the top level package. This change reduced the bundle size for this demo from 2.5Mb to <1Mb.  

```
/* Avoid */
import { Vector3 } from '@babylonjs/core'
    
/* Prefer */
import { Vector3 } from '@babylonjs/core/Maths/math';
```

More info here:
https://doc.babylonjs.com/features/es6_support#tree-shaking

### Bundle Analyzer Commands
To view the contents of the bundle use:
```
npm run build:stats
webpack-bundle-analyzer stats.json
```

## Refs:
BabylonJS Examples:  
https://doc.babylonjs.com/examples/

Starter repo for Typescript, BabylonJS and Webpack:  
https://github.com/pandadelphin/babylonjs-typescript-webpack-starter

Webpack bundle analyzer:  
https://www.npmjs.com/package/webpack-bundle-analyzer
