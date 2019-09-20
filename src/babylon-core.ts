// Bablylon files must be imported explicitly for treeshaking to work effectively
// https://doc.babylonjs.com/features/es6_support#tree-shaking

import { Engine } from '@babylonjs/core/Engines/engine';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';

import { Vector3 } from '@babylonjs/core/Maths/math';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';

import { Material } from '@babylonjs/core/Materials/material';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';

import { PointLight } from '@babylonjs/core/Lights/pointLight';

import {
    BoundingBox,
    Ray,
} from '@babylonjs/core/Culling';

import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { LinesMesh } from '@babylonjs/core/Meshes/linesMesh';


// re-export all the parts of Babylon that we need
export {
    Engine,
    SceneLoader,
    Vector3,
    Mesh,
    MeshBuilder,
    Scene,
    Material,
    StandardMaterial,
    Texture,
    PointLight,
    BoundingBox,
    Ray,
    ArcRotateCamera,
    LinesMesh,
};
