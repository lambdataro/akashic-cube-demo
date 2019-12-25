window.gLocalAssetContainer["Triangle"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(params) {
        var _this = _super.call(this, params) || this;
        _this.cssColor = params.cssColor;
        _this.x0 = params.x0;
        _this.y0 = params.y0;
        _this.x1 = params.x1;
        _this.y1 = params.y1;
        _this.x2 = params.x2;
        _this.y2 = params.y2;
        _this._invalidateSelf();
        return _this;
    }
    Triangle.prototype.invalidate = function () {
        this._invalidateSelf();
        _super.prototype.invalidate.call(this);
    };
    Triangle.prototype.renderCache = function (renderer) {
        if (!this._isFront())
            return;
        renderer.save();
        renderer.setCompositeOperation(g.CompositeOperation.Copy);
        renderer.fillRect(0, 0, this.width, this.height, this.cssColor);
        renderer.setCompositeOperation(g.CompositeOperation.DestinationOut);
        renderer.translate(-this.x, -this.y);
        this._removeOutsideOfEdge(renderer, this.x0, this.y0, this.x1, this.y1);
        this._removeOutsideOfEdge(renderer, this.x1, this.y1, this.x2, this.y2);
        this._removeOutsideOfEdge(renderer, this.x2, this.y2, this.x0, this.y0);
        renderer.restore();
    };
    Triangle.prototype._isFront = function () {
        if (this.x0 === this.x1) {
            return (this.y0 > this.y1 && this.x0 > this.x2) || (this.y0 <= this.y1 && this.x0 <= this.x2);
        }
        else {
            var y = this.y0 + (this.y1 - this.y0) / (this.x1 - this.x0) * (this.x2 - this.x0);
            return (y > this.y2 && this.x1 > this.x0) || (y <= this.y2 && this.x1 <= this.x0);
        }
    };
    Triangle.prototype._removeOutsideOfEdge = function (renderer, x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var angle = Math.atan2(dy, dx);
        var size = Math.sqrt(dx * dx + dy * dy);
        renderer.save();
        renderer.transform([Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), x1, y1]);
        renderer.fillRect(-size / 2, 0, size * 2, size, "red");
        renderer.restore();
    };
    Triangle.prototype._invalidateSelf = function () {
        this.x = Math.min(this.x0, this.x1, this.x2);
        this.y = Math.min(this.y0, this.y1, this.y2);
        this.width = Math.max(this.x0, this.x1, this.x2) - this.x;
        this.height = Math.max(this.y0, this.y1, this.y2) - this.y;
    };
    return Triangle;
}(g.CacheableE));
exports.Triangle = Triangle;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}