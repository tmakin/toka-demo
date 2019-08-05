import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Control } from '@babylonjs/gui/2D/controls/control';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';

import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { LinesMesh } from '@babylonjs/core/Meshes/linesMesh';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';

export class SceneUtil {

    /**
     * Debug helper for drawing lines between two points
     * @param scene
     * @param start
     * @param end
     */
    public static drawLine(scene: Scene, start: Vector3, end: Vector3): LinesMesh {
        const points = [start, end];
        // console.debug('drawLine', points);
        return MeshBuilder.CreateLines('line', {points}, scene);
    }

    /**
     * Debug helper for visualising points as spheres
     * @param scene
     * @param position
     * @param diameter
     */
    public static drawDot(scene: Scene, position: Vector3, diameter: number = 0.01) {
        const sphere = Mesh.CreateSphere('sphere', 16, diameter, scene);
        sphere.position = position;
        // console.debug('drawDot', position, sphere);
        return sphere;
    }

    public static createCamera(scene: Scene, intialRadius: number = 1): ArcRotateCamera {
        const camera = new ArcRotateCamera('Camera', 0, 0, intialRadius, Vector3.Zero(), scene);

        // no clipping plane
        camera.minZ = 0;

        // increase precision to make zoom appropriate for TOKA model
        camera.wheelPrecision = 1000;
        camera.panningSensibility = 10000;

        return camera;
    }

    /**
     * Creates a Gui Texture
     */
    public static createGUI() {
        return AdvancedDynamicTexture.CreateFullscreenUI('UI');
    }

    /**
     *
     * @param guiTexture
     */
    public static createInfoTextBlock(guiTexture: AdvancedDynamicTexture): TextBlock {
        const txt = new TextBlock();
        txt.height = '20px';
        txt.width = '500px';
        txt.fontSize = 20;
        txt.text = 'Loading...';
        txt.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        txt.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        txt.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        txt.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        txt.left = 20;
        txt.top = 5;
        txt.color = '#FFFFFF';

        guiTexture.addControl(txt);

        return txt;
    }

}
