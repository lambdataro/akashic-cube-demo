import {Triangle} from "./Triangle";
import {Vector3d, cross, dot, subtract} from "./Vector3d";
import {Matrix4d} from "./Matrix4d";

interface Polygon {
    tr: Triangle,
    p0: Vector3d,
    p1: Vector3d,
    p2: Vector3d,
    color: Vector3d
}

interface TriangleParameters {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    cssColor: string;
}

export class Space {
    private polygons: Polygon[];
    private cameraPos: Vector3d;
    private lightVec: Vector3d;
    private modelMatrix: Matrix4d;
    private viewMatrix: Matrix4d;
    private projectionMatrix: Matrix4d;

    constructor(private scene: g.Scene) {
        this.polygons = [];
        this.cameraPos = new Vector3d().set(3, 2, 3);
        this.lightVec = new Vector3d().set(5, 10, 2).normalize();
        this.modelMatrix = new Matrix4d().loadIdentity();
        this.viewMatrix = new Matrix4d().loadLookAt(
            this.cameraPos,
            new Vector3d().set(0, 0, 0),
            new Vector3d().set(0, 1, 0)
        );
        this.projectionMatrix = new Matrix4d().loadPerspective(45, g.game.width / g.game.height, 0.1, 100);
    }

    rotetaModel(angle: number) {
        this.modelMatrix = new Matrix4d().loadRotateY(angle);
        for (let i = 0; i < this.polygons.length; i++) {
            this._updatePolygon(this.polygons[i]);
        }
    }

    moveCamera(x: number, y: number, z: number) {
        this.cameraPos.set(x, y, z);
        this.viewMatrix = new Matrix4d().loadLookAt(
            this.cameraPos,
            new Vector3d().set(0, 0, 0),
            new Vector3d().set(0, 1, 0)
        );
    }

    addTriangle(p0: Vector3d, p1: Vector3d, p2: Vector3d, color: Vector3d) {
        const {x0, y0, x1, y1, x2, y2, cssColor} = this._calcParameters(p0, p1, p2, color);
        const tr = new Triangle({scene: this.scene, x0, y0, x1, y1, x2, y2, cssColor});
        this.polygons.push({tr, p0, p1, p2, color});
        this.scene.append(tr);
    }

    private _updatePolygon({tr, p0, p1, p2, color}: Polygon): void {
        const {x0, y0, x1, y1, x2, y2, cssColor} = this._calcParameters(p0, p1, p2, color);
        tr.x0 = x0;
        tr.y0 = y0;
        tr.x1 = x1;
        tr.y1 = y1;
        tr.x2 = x2;
        tr.y2 = y2;
        tr.cssColor = cssColor;
        tr.invalidate();
    }

    private _calcParameters(p0: Vector3d, p1: Vector3d, p2: Vector3d, color: Vector3d): TriangleParameters {
        const mvpMatrix = new Matrix4d()
            .copyFrom(this.projectionMatrix)
            .multiplyBy(this.viewMatrix)
            .multiplyBy(this.modelMatrix);        
        // pos
        const [x0, y0] = mvpMatrix.toScreen(p0);
        const [x1, y1] = mvpMatrix.toScreen(p1);
        const [x2, y2] = mvpMatrix.toScreen(p2);
        // color
        const normal = cross(subtract(p1, p0), subtract(p2, p0)).normalize();
        const brightness = Math.max(dot(this.modelMatrix.multiplyByVector3d(this.lightVec).normalize(), normal), 0) * 255;
        const r = Math.floor(color.x * brightness);
        const g = Math.floor(color.y * brightness);
        const b = Math.floor(color.z * brightness);
        const cssColor = `rgb(${r}, ${g}, ${b})`;
        return {x0, y0, x1, y1, x2, y2, cssColor};
    }
}
