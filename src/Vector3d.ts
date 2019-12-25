export class Vector3d {
    public vec: number[];

    constructor() {
        this.vec = [0, 0, 0];
    }

    set(x: number, y: number, z: number): this {
        this.vec = [x, y, z];
        return this;
    }

    array(ary: number[]): this {
        this.vec[0] = ary[0];
        this.vec[1] = ary[1];
        this.vec[2] = ary[2];
        return this;
    }

    get x(): number {
        return this.vec[0];
    }

    get y(): number {
        return this.vec[1];
    }

    get z(): number {
        return this.vec[2];
    }

    normalize(): this {
        const len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        for (let i = 0; i < 3; i++) {
            this.vec[i] /= len;
        }
        return this;
    }
}

export function subtract(v1: Vector3d, v2: Vector3d): Vector3d {
    return new Vector3d().set(
        v1.x - v2.x,
        v1.y - v2.y,
        v1.z - v2.z
    );
}

export function cross(v1: Vector3d, v2: Vector3d): Vector3d {
    return new Vector3d().set(
        v1.y * v2.z - v1.z * v2.y,
        v1.z * v2.x - v1.x * v2.z,
        v1.x * v2.y - v1.y * v2.x
    );
}

export function dot(v1: Vector3d, v2: Vector3d): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}
