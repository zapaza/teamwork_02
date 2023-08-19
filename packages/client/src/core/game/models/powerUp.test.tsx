import { PowerUp } from '@/core/game/models/powerUp';

let powerUp: PowerUp;
const mockfn = jest.fn();

describe('PowerUp', () => {
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	beforeEach(() => {
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		powerUp = new PowerUp(
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
		test('call other methods to render powerUp', () => {
			powerUp.draw(ctx);
			expect(ctx.beginPath).toHaveBeenCalledTimes(1);
			expect(ctx.arc).toHaveBeenCalledTimes(1);
			expect(ctx.arc).toHaveBeenCalledWith(50, 100, 7, 0, Math.PI * 2);
			expect(ctx.fillStyle).toBe('#ffffff');
			expect(ctx.fill).toHaveBeenCalledTimes(1);
			expect(ctx.closePath).toHaveBeenCalledTimes(1);
		});
	});

	describe('update', () => {
		test('call draw and flash methods', () => {
			powerUp.draw = mockfn;
			powerUp.flash = mockfn;
			powerUp.update(ctx);
			expect(mockfn).toHaveBeenCalledWith(ctx);
			expect(mockfn).toHaveBeenCalled();
		});
	});
});
