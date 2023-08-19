import Boundary from './boundary';

let boundary: Boundary;
let mockimage: HTMLImageElement;

describe('Boundary', () => {
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	beforeEach(() => {
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		mockimage = new Image();
		boundary = new Boundary(
			{
				position: {
					x: 50,
					y: 100,
				},
				regularImage: mockimage,
				whiteImage: mockimage,
			},
			20,
		);
	});

	describe('draw', () => {
		test('call drawImage method', () => {
			boundary.draw(ctx);
			expect(ctx.drawImage).toHaveBeenCalledWith(mockimage, 50, 100);
		});
	});
});
