window.gLocalAssetContainer["Space"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Triangle_1 = require("./Triangle");
var Vector3d_1 = require("./Vector3d");
var Matrix4d_1 = require("./Matrix4d");
var Space = /** @class */ (function () {
    function Space(scene) {
        this.scene = scene;
        this.polygons = [];
        this.cameraPos = new Vector3d_1.Vector3d().set(3, 2, 3);
        this.lightVec = new Vector3d_1.Vector3d().set(5, 10, 2).normalize();
        this.modelMatrix = new Matrix4d_1.Matrix4d().loadIdentity();
        this.viewMatrix = new Matrix4d_1.Matrix4d().loadLookAt(this.cameraPos, new Vector3d_1.Vector3d().set(0, 0, 0), new Vector3d_1.Vector3d().set(0, 1, 0));
        this.projectionMatrix = new Matrix4d_1.Matrix4d().loadPerspective(45, g.game.width / g.game.height, 0.1, 100);
    }
    Space.prototype.rotetaModel = function (angle) {
        this.modelMatrix = new Matrix4d_1.Matrix4d().loadRotateY(angle);
        for (var i = 0; i < this.polygons.length; i++) {
            this._updatePolygon(this.polygons[i]);
        }
    };
    Space.prototype.moveCamera = function (x, y, z) {
        this.cameraPos.set(x, y, z);
        this.viewMatrix = new Matrix4d_1.Matrix4d().loadLookAt(this.cameraPos, new Vector3d_1.Vector3d().set(0, 0, 0), new Vector3d_1.Vector3d().set(0, 1, 0));
    };
    Space.prototype.addTriangle = function (p0, p1, p2, color) {
        var _a = this._calcParameters(p0, p1, p2, color), x0 = _a.x0, y0 = _a.y0, x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2, cssColor = _a.cssColor;
        var tr = new Triangle_1.Triangle({ scene: this.scene, x0: x0, y0: y0, x1: x1, y1: y1, x2: x2, y2: y2, cssColor: cssColor });
        this.polygons.push({ tr: tr, p0: p0, p1: p1, p2: p2, color: color });
        this.scene.append(tr);
    };
    Space.prototype._updatePolygon = function (_a) {
        var tr = _a.tr, p0 = _a.p0, p1 = _a.p1, p2 = _a.p2, color = _a.color;
        var _b = this._calcParameters(p0, p1, p2, color), x0 = _b.x0, y0 = _b.y0, x1 = _b.x1, y1 = _b.y1, x2 = _b.x2, y2 = _b.y2, cssColor = _b.cssColor;
        tr.x0 = x0;
        tr.y0 = y0;
        tr.x1 = x1;
        tr.y1 = y1;
        tr.x2 = x2;
        tr.y2 = y2;
        tr.cssColor = cssColor;
        tr.invalidate();
    };
    Space.prototype._calcParameters = function (p0, p1, p2, color) {
        var mvpMatrix = new Matrix4d_1.Matrix4d()
            .copyFrom(this.projectionMatrix)
            .multiplyBy(this.viewMatrix)
            .multiplyBy(this.modelMatrix);
        // pos
        var _a = mvpMatrix.toScreen(p0), x0 = _a[0], y0 = _a[1];
        var _b = mvpMatrix.toScreen(p1), x1 = _b[0], y1 = _b[1];
        var _c = mvpMatrix.toScreen(p2), x2 = _c[0], y2 = _c[1];
        // color
        var normal = Vector3d_1.cross(Vector3d_1.subtract(p1, p0), Vector3d_1.subtract(p2, p0)).normalize();
        var brightness = Math.max(Vector3d_1.dot(this.modelMatrix.multiplyByVector3d(this.lightVec).normalize(), normal), 0) * 255;
        var r = Math.floor(color.x * brightness);
        var g = Math.floor(color.y * brightness);
        var b = Math.floor(color.z * brightness);
        var cssColor = "rgb(" + r + ", " + g + ", " + b + ")";
        return { x0: x0, y0: y0, x1: x1, y1: y1, x2: x2, y2: y2, cssColor: cssColor };
    };
    return Space;
}());
exports.Space = Space;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}