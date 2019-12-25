window.gLocalAssetContainer["Matrix4d"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector3d_1 = require("./Vector3d");
var Matrix4d = /** @class */ (function () {
    function Matrix4d() {
        this.mat = [];
        for (var i = 0; i < 4; i++) {
            var line = [];
            for (var j = 0; j < 4; j++) {
                line.push(0);
            }
            this.mat.push(line);
        }
    }
    Matrix4d.prototype.clear = function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                this.mat[i][j] = 0;
            }
        }
        return this;
    };
    Matrix4d.prototype.copyFrom = function (src) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                this.mat[i][j] = src.mat[i][j];
            }
        }
        return this;
    };
    Matrix4d.prototype.loadRotateY = function (angle) {
        var rad = angle * (Math.PI / 180);
        this.clear();
        this.mat[0][0] = Math.cos(rad);
        this.mat[0][2] = Math.sin(rad);
        this.mat[1][1] = 1;
        this.mat[2][0] = -Math.sin(rad);
        this.mat[2][2] = Math.cos(rad);
        this.mat[3][3] = 1;
        return this;
    };
    Matrix4d.prototype.multiplyBy = function (rhs) {
        var lhs = new Matrix4d().copyFrom(this);
        this.clear();
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < 4; k++) {
                    this.mat[j][i] += lhs.mat[k][i] * rhs.mat[j][k];
                }
            }
        }
        return this;
    };
    Matrix4d.prototype.multiplyByVector3d = function (rhs) {
        var src = [rhs.x, rhs.y, rhs.z, 1];
        var dst = [0, 0, 0, 0];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                dst[i] += this.mat[i][j] * src[j];
            }
        }
        return new Vector3d_1.Vector3d().array(dst);
    };
    Matrix4d.prototype.loadIdentity = function () {
        this.clear();
        for (var i = 0; i < 4; i++) {
            this.mat[i][i] = 1;
        }
        return this;
    };
    Matrix4d.prototype.toScreen = function (pos) {
        var src = [pos.x, pos.y, pos.z, 1];
        var dst = [0, 0, 0, 0];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                dst[i] += this.mat[j][i] * src[j];
            }
        }
        return [(dst[0] / dst[3] + 1) * g.game.width / 2, (-dst[1] / dst[3] + 1) * g.game.height / 2];
    };
    Matrix4d.prototype.loadPerspective = function (fov, aspect, near, far) {
        this.clear();
        var f = 1 / Math.tan(fov / 2);
        this.mat[0][0] = f / aspect;
        this.mat[1][1] = f;
        this.mat[2][2] = (far + near) / (near - far);
        this.mat[2][3] = -1;
        this.mat[3][2] = (2 * far * near) / (near - far);
        return this;
    };
    Matrix4d.prototype.loadLookAt = function (eye, center, up) {
        var f = Vector3d_1.subtract(center, eye).normalize();
        var s = Vector3d_1.cross(f, up).normalize();
        var u = Vector3d_1.cross(s, f);
        this.clear();
        this.mat[0][0] = s.x;
        this.mat[1][0] = s.y;
        this.mat[2][0] = s.z;
        this.mat[0][1] = u.x;
        this.mat[1][1] = u.y;
        this.mat[2][1] = u.z;
        this.mat[0][2] = -f.x;
        this.mat[1][2] = -f.y;
        this.mat[2][2] = -f.z;
        this.mat[3][0] = -Vector3d_1.dot(s, eye);
        this.mat[3][1] = -Vector3d_1.dot(u, eye);
        this.mat[3][2] = Vector3d_1.dot(f, eye);
        this.mat[3][3] = 1;
        return this;
    };
    return Matrix4d;
}());
exports.Matrix4d = Matrix4d;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}