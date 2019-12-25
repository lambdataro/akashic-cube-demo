
export interface TriangleParameterObject extends g.CacheableEParameterObject {
    cssColor: string;
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export class Triangle extends g.CacheableE {
    public cssColor: string;
    public x0: number;
    public y0: number;
    public x1: number;
    public y1: number;
    public x2: number;
    public y2: number;

    constructor(params: TriangleParameterObject) {
        super(params);
        this.cssColor = params.cssColor;
        this.x0 = params.x0;
        this.y0 = params.y0;
        this.x1 = params.x1;
        this.y1 = params.y1;
        this.x2 = params.x2;
        this.y2 = params.y2;
        this._invalidateSelf();
    }

    invalidate(): void {
        this._invalidateSelf();
        super.invalidate();
    }

    renderCache(renderer: g.Renderer): void {
        if (!this._isFront()) return;
        renderer.save();
        renderer.setCompositeOperation(g.CompositeOperation.Copy);
        renderer.fillRect(0, 0, this.width, this.height, this.cssColor);
        renderer.setCompositeOperation(g.CompositeOperation.DestinationOut);
        renderer.translate(-this.x, -this.y);
        this._removeOutsideOfEdge(renderer, this.x0, this.y0, this.x1, this.y1);
        this._removeOutsideOfEdge(renderer, this.x1, this.y1, this.x2, this.y2);
        this._removeOutsideOfEdge(renderer, this.x2, this.y2, this.x0, this.y0);
        renderer.restore();       
    }

    private _isFront(): boolean {
        if (this.x0 === this.x1) {
            return (this.y0 > this.y1 && this.x0  > this.x2) || (this.y0 <= this.y1 && this.x0  <= this.x2);
        } else {
            const y = this.y0 + (this.y1 - this.y0) / (this.x1 - this.x0) * (this.x2 - this.x0);
            return (y > this.y2 && this.x1 > this.x0) || (y <= this.y2 && this.x1 <= this.x0);
        }
    }

    private _removeOutsideOfEdge(renderer: g.Renderer, x1: number, y1: number, x2: number, y2: number): void {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx);
        const size = Math.sqrt(dx * dx + dy * dy);
        renderer.save();
        renderer.transform([Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), x1, y1]);
        renderer.fillRect(-size / 2, 0, size * 2, size, "red");
        renderer.restore();
    }

    private _invalidateSelf(): void {
        this.x = Math.min(this.x0, this.x1, this.x2);
        this.y = Math.min(this.y0, this.y1, this.y2);
        this.width = Math.max(this.x0, this.x1, this.x2) - this.x;
        this.height = Math.max(this.y0, this.y1, this.y2) - this.y;
    }
}
