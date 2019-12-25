window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var Vector3d_1 = require("./Vector3d");
var Space_1 = require("./Space");
function drawCube(scene) {
    scene.append(new g.FilledRect({
        scene: scene,
        width: g.game.width,
        height: g.game.height,
        cssColor: "#CCCCCC"
    }));
    var vertices = [
        [-1, 1, 1],
        [-1, -1, 1],
        [1, 1, 1],
        [1, -1, 1],
        [1, 1, -1],
        [1, -1, -1],
        [-1, 1, -1],
        [-1, -1, -1]
    ];
    var fragments = [
        [4, 3, 1],
        [2, 4, 1],
        [6, 5, 3],
        [4, 6, 3],
        [8, 7, 5],
        [6, 8, 5],
        [2, 1, 7],
        [8, 2, 7],
        [3, 5, 7],
        [1, 3, 7],
        [6, 4, 2],
        [8, 6, 2]
    ];
    var space = new Space_1.Space(scene);
    for (var i = 0; i < fragments.length; i++) {
        space.addTriangle(new Vector3d_1.Vector3d().array(vertices[fragments[i][0] - 1]), new Vector3d_1.Vector3d().array(vertices[fragments[i][1] - 1]), new Vector3d_1.Vector3d().array(vertices[fragments[i][2] - 1]), new Vector3d_1.Vector3d().set(1.0, 1.0, 1.0));
    }
    var angle = 0;
    scene.update.add(function () {
        angle += 2;
        if (angle >= 360)
            angle = 0;
        space.rotetaModel(angle);
    });
}
module.exports = function (param) {
    var scene = new g.Scene({ game: g.game });
    scene.loaded.add(drawCube.bind(null, scene));
    g.game.pushScene(scene);
};

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}