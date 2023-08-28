import { IGameAssets, IVariables } from '@/core/game/types';
import { GameHooks } from '@/core/game/gameHooks';

export function playGame(player: any, variables: IVariables, assets: IGameAssets) {
	variables.animationId = requestAnimationFrame(() => playGame(player, variables, assets));
	const board = document.querySelector<HTMLCanvasElement>('#board');
	if (board) {
		const ctx = board!.getContext('2d');
		if (ctx) {
			if (variables.isGamePaused) {
				return;
			}
			if (variables.start) {
				GameHooks.finishSetup(variables, player, assets, ctx);
			}
			if (performance.now() - variables.startTime >= variables.frameLifetime) {
				ctx.clearRect(0, 0, board!.width, board!.height);
				GameHooks.implementPhysics(assets, ctx, variables);
				GameHooks.implementGraphics(variables, assets.characters.pacman);
				GameHooks.manageGhostAudio(assets);
				variables.startTime = performance.now();
			}
		}
	}
}
