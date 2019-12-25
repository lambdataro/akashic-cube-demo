window.gLocalAssetContainer["Vector3d"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector3d = /** @class */ (function () {
    function Vector3d() {
        this.vec = [0, 0, 0];
    }
    Vector3d.prototype.set = function (x, y, z) {
        this.vec = [x, y, z];
        return this;
    };
    Vector3d.prototype.array = function (ary) {
        this.vec[0] = ary[0];
        this.vec[1] = ary[1];
        this.vec[2] = ary[2];
        return this;
    };
    Object.defineProperty(Vector3d.prototype, "x", {
        get: function () {
            return this.vec[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3d.prototype, "y", {
        get: function () {
            return this.vec[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3d.prototype, "z", {
        get: function () {
            return this.vec[2];
        },
        enumerable: true,
        configurable: true
    });
    Vector3d.prototype.normalize = function () {
        var len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        for (var i = 0; i < 3; i++) {
            this.vec[i] /= len;
        }
        return this;
    };
    return Vector3d;
}());
exports.Vector3d = Vector3d;
function subtract(v1, v2) {
    return new Vector3d().set(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}
exports.subtract = subtract;
function cross(v1, v2) {
    return new Vector3d().set(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
}
exports.cross = cross;
function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}
exports.dot = dot;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}