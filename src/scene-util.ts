import * as Babylon from './babylon-core';
import * as BabylonGui from './babylon-gui';

export class SceneUtil {

    /**
     * Debug helper for drawing lines between two points
     * @param scene
     * @param start
     * @param end
     */
    public static drawLine(scene: Babylon.Scene, start: Babylon.Vector3, end: Babylon.Vector3): Babylon.LinesMesh {
        const points = [start, end];
        // console.debug('drawLine', points);
        return Babylon.MeshBuilder.CreateLines('line', {points}, scene);
    }

    /**
     * Debug helper for visualising points as spheres
     * @param scene
     * @param position
     * @param diameter
     */
    public static drawDot(scene: Babylon.Scene, position: Babylon.Vector3, diameter: number = 0.01) {
        const sphere = Babylon.Mesh.CreateSphere('sphere', 16, diameter, scene);
        sphere.position = position;
        // console.debug('drawDot', position, sphere);
        return sphere;
    }

    public static createCamera(scene: Babylon.Scene, intialRadius: number = 1): Babylon.ArcRotateCamera {
        const camera = new Babylon.ArcRotateCamera('Camera', 0, 0, intialRadius, Babylon.Vector3.Zero(), scene);

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
        return BabylonGui.AdvancedDynamicTexture.CreateFullscreenUI('UI');
    }

    /**
     *
     * @param guiTexture
     */
    public static createInfoTextBlock(guiTexture: BabylonGui.AdvancedDynamicTexture): BabylonGui.TextBlock {
        const txt = new BabylonGui.TextBlock();
        txt.height = '20px';
        txt.width = '500px';
        txt.fontSize = 20;
        txt.text = 'Loading...';
        txt.textHorizontalAlignment = BabylonGui.Control.HORIZONTAL_ALIGNMENT_LEFT;
        txt.textVerticalAlignment = BabylonGui.Control.VERTICAL_ALIGNMENT_TOP;
        txt.horizontalAlignment = BabylonGui.Control.HORIZONTAL_ALIGNMENT_LEFT;
        txt.verticalAlignment = BabylonGui.Control.VERTICAL_ALIGNMENT_TOP;
        txt.left = 20;
        txt.top = 5;
        txt.color = '#FFFFFF';

        guiTexture.addControl(txt);

        return txt;
    }

}
