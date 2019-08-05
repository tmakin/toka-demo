# Intro
A demo of STL mesh rendering using WebGL. The app is built using Typescript and the BablyonJS game engine. 
NodeJs and webpack are used for building and deploying the code.

## Live Demo
A live demo is hosted on GitHub pages:


# Development #
## Prerequisites
- NodeJs : https://nodejs.org/en/

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

## Webpack Notes
In order to keep the BabylonJS bundle size down it is necessary to import modules directly from the relevant 
files rather than the top level package. This change reduced the bundle size from 2.5Mb to <1Mb.
https://doc.babylonjs.com/features/es6_support#tree-shaking

```
/* Avoid */
import { Vector3 } from '@babylonjs/core'
    
/* Prefer */
import { Vector3 } from '@babylonjs/core/Maths/math';
```


## Refs:
Starter repo for Typescript, BabylonJS and Webpack:  
https://github.com/pandadelphin/babylonjs-typescript-webpack-starter

Webpack bundle analyzer:  
https://www.npmjs.com/package/webpack-bundle-analyzer

BabylonJS Examples:  
https://doc.babylonjs.com/examples/