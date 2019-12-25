import {Vector3d} from "./Vector3d";
import {Space} from "./Space";

export = function (param: g.GameMainParameterObject): void {
    const scene = new g.Scene({game: g.game});
    scene.loaded.add(drawCube.bind(null, scene));
    g.game.pushScene(scene);
}

function drawCube(scene: g.Scene) {
    scene.append(new g.FilledRect({
        scene,
        width: g.game.width,
        height: g.game.height,
        cssColor: "#CCCCCC"
    }));

    const vertices = [
        [-1, 1, 1],
        [-1, -1, 1],
        [1, 1, 1],
        [1, -1, 1],
        [1, 1, -1],
        [1, -1, -1],
        [-1, 1, -1],
        [-1, -1, -1]
    ];
    const fragments = [
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

    const space = new Space(scene);

    for (let i = 0; i < fragments.length; i++) {
        space.addTriangle(
            new Vector3d().array(vertices[fragments[i][0] - 1]),
            new Vector3d().array(vertices[fragments[i][1] - 1]),
            new Vector3d().array(vertices[fragments[i][2] - 1]),
            new Vector3d().set(1.0, 1.0, 1.0)
        );
    }

    let angle = 0;
    scene.update.add(() => {
        angle += 2;
        if (angle >= 360) angle = 0;
        space.rotetaModel(angle);
    });
}
