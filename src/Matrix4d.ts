import {Vector3d, subtract, cross, dot} from "./Vector3d";

export class Matrix4d {
    public readonly mat: number[][];

    constructor() {
        this.mat = [];
        for (let i = 0; i < 4; i++) {
            const line = [];
            for (let j = 0; j < 4; j++) {
                line.push(0);
            }
            this.mat.push(line);
        }
    }

    clear(): this {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.mat[i][j] = 0;
            }
        }
        return this;
    }

    copyFrom(src: Matrix4d): this {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.mat[i][j] = src.mat[i][j];
            }
        }
        return this;
    }

    loadRotateY(angle: number): this {
        const rad = angle * (Math.PI / 180);
        this.clear();
        this.mat[0][0] = Math.cos(rad);
        this.mat[0][2] = Math.sin(rad);
        this.mat[1][1] = 1;
        this.mat[2][0] = -Math.sin(rad);
        this.mat[2][2] = Math.cos(rad);
        this.mat[3][3] = 1;
        return this;
    }

    multiplyBy(rhs: Matrix4d): this {
        const lhs = new Matrix4d().copyFrom(this);
        this.clear();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    this.mat[j][i] += lhs.mat[k][i] * rhs.mat[j][k];
                }
            }
        }
        return this;
    }

    multiplyByVector3d(rhs: Vector3d): Vector3d {
        const src = [rhs.x, rhs.y, rhs.z, 1];
        const dst = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                dst[i] += this.mat[i][j] * src[j];
            }
        }
        return new Vector3d().array(dst);
    }

    loadIdentity(): this {
        this.clear();
        for (let i = 0; i < 4; i++) {
            this.mat[i][i] = 1;
        }
        return this;
    }

    toScreen(pos: Vector3d): [number, number] {
        const src = [pos.x, pos.y, pos.z, 1];
        const dst = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                dst[i] += this.mat[j][i] * src[j];
            }
        }
        return [(dst[0] / dst[3] + 1) * g.game.width /2, (-dst[1] / dst[3] + 1) * g.game.height / 2]
    }

    loadPerspective(fov: number, aspect: number, near: number, far: number): this {
        this.clear();
        const f = 1 / Math.tan(fov / 2);
        this.mat[0][0] = f / aspect;
        this.mat[1][1] = f;
        this.mat[2][2] = (far + near) / (near - far);
        this.mat[2][3] = -1;
        this.mat[3][2] = (2 * far * near) / (near - far);
        return this;
    }

    loadLookAt(eye: Vector3d, center: Vector3d, up: Vector3d) {
        const f = subtract(center, eye).normalize();
        const s = cross(f, up).normalize();
        const u = cross(s, f);
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
        this.mat[3][0] = -dot(s, eye);
        this.mat[3][1] = -dot(u, eye);
        this.mat[3][2] = dot(f, eye);
        this.mat[3][3] = 1;
        return this;
    }
}
