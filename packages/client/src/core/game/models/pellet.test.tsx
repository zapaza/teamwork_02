import { Pellet } from '@/core/game/models//pellet';
import { IPellet } from '@/core/game/types';

let pellet: IPellet;

describe('Pellet', () => {
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	beforeEach(() => {
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		pellet = new Pellet(
			{
				position: {
					x: 50,
					y: 100,
				},
			},
			20,
		);
	});

	describe('draw', () => {
		test('call properties to render pallet', () => {
			pellet.draw(ctx);
			expect(ctx.beginPath).toHaveBeenCalledTimes(1);
			expect(ctx.arc).toHaveBeenCalledTimes(1);
			expect(ctx.arc).toHaveBeenCalledWith(50, 100, 2, 0, Math.PI * 2);
			expect(ctx.fillStyle).toBe('#ffffff');
			expect(ctx.fill).toHaveBeenCalledTimes(1);
			expect(ctx.closePath).toHaveBeenCalledTimes(1);
		});
	});
});
