import * as Babylon from './babylon-core';

import { SceneUtil } from './scene-util';


export class Game {

    private readonly _assetUrl: string = 'assets/';
    private readonly _modelName: string = 'tibia.stl';
    private readonly _logoFileName = 'logo.png';

    private readonly _canvas: HTMLCanvasElement;
    private readonly _engine: Babylon.Engine;
    private readonly _scene: Babylon.Scene;

    constructor(canvasElementId: string) {
        this._canvas = document.getElementById(canvasElementId) as HTMLCanvasElement;
        this._engine = new Babylon.Engine(this._canvas, true);
        this._scene = new Babylon.Scene(this._engine);
    }

    /**
     * Initialise the BabylyonJs Scene
     */
    public initScene(): void {

        const scene = this._scene;

        // create a camera
        const camera = SceneUtil.createCamera(scene);

        // bind canvas to camera
        camera.attachControl(this._canvas, true);

        // Create omni-directional light
        const light = new Babylon.PointLight('Omni', new Babylon.Vector3(2, 2, 10), scene);

        // Init decal material from the logo file
        const decalMat = new Babylon.StandardMaterial('DecalMat', scene);
        decalMat.diffuseTexture = new Babylon.Texture(this.createAssetUrl(this._logoFileName), scene);
        decalMat.diffuseTexture.hasAlpha = true;
        decalMat.zOffset = -2;

        const decalAspectRatio: number = 1 / 8; // Based on the logo dimensions
        const decalSize = 0.05; // TODO: scale with the bounding box

        // Init GUI
        const guiTexture = SceneUtil.createGUI();

        const infoTxtBlock = SceneUtil.createInfoTextBlock(guiTexture);
        const setInfo = (msg: string) => {
            infoTxtBlock.text = msg;
        };

        // Import the main mesh file
        Babylon.SceneLoader.ImportMesh(null, this._assetUrl, this._modelName, scene, (newMeshes) => {

            // Use first imported mesh object
            const mesh = newMeshes[0];

            // Get bounding box info
            const bb = mesh.getBoundingInfo().boundingBox;
            // mesh.showBoundingBox = true;
            // console.debug("boundingBox", bb);

            // Point camera at center of bb and set up initial view
            camera.setTarget(bb.center);
            camera.alpha = 5;
            camera.beta = 0.9;
            camera.radius = 0.25;

            // draw logo at top of model
            this.drawTopDecal(bb, decalMat, decalSize, decalAspectRatio);

            // Update the info box
            setInfo(this._modelName);

        }, (args) => {
            const progress = args.loaded / args.total;
            const percent = Math.round(progress * 100);
            // console.debug('updateProgressInfo',progress, percent);
            setInfo(`Loading (${percent}%)`);
        });

        // Move the light with the camera
        scene.registerBeforeRender(() => {
            light.position = camera.position;
            // console.debug('camera (alpha, beta, radius)', this._camera.alpha, this._camera.beta, this._camera.radius);
        });
    }

    /**
     * Start the animation loop.
     */
    public animate(): void {

        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }

    /**
     * Create an asset url for the given file name
     * @param name
     */
    private createAssetUrl(name: string): string {
        return this._assetUrl + name;
    }

    /**
     * Calculate intersection point at top of model by projecting ray downwards until it intersects with current scene
     * NB: Bone model is aligned along y axis in Babylon coord system
     * @param bb
     * @param decalMat
     * @param size
     * @param aspectRatio
     * @param depth
     */
    private drawTopDecal(bb: Babylon.BoundingBox, decalMat: Babylon.Material, size: number, aspectRatio: number = 1.0, depth: number = 0.05): Babylon.Mesh {

        // ray generation
        const direction = new Babylon.Vector3(0, -1, 0); // project downwards from offset point
        const origin = new Babylon.Vector3(bb.center.x, bb.maximum.y, bb.center.z); // ray origin is at top of bounding box
        const ray = new Babylon.Ray(origin, direction, 1);

        // SceneUtil.drawLine(this._scene, origin, origin.add(direction));

        // intersect ray with current scene
        const hitResult = this._scene.pickWithRay(ray);

        if (!hitResult.hit) {
            console.warn('decal hit test failed', hitResult);
            return;
        }

        const decalSize = new Babylon.Vector3(size, aspectRatio * size, depth);

        const newDecal = Babylon.MeshBuilder.CreateDecal('decal', hitResult.pickedMesh, {
            angle: -45 * Math.PI / 180, // TODO: work out why 45 degree rotation is required
            normal: hitResult.getNormal(true),
            position: hitResult.pickedPoint,
            size: decalSize,
        });

        // assign material to new decal
        newDecal.material = decalMat;

        return newDecal;
    }

}
