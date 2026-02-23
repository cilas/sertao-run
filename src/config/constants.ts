export const GAME_CONFIG = {
	width: 800,
	height: 600
} as const;

export const PHYSICS_BALANCE = {
	gravity: {
		x: 0,
		y: 800
	}
} as const;

export const PLAYER_BALANCE = {
	walkSpeed: 160,
	runSpeed: 240,
	jumpForce: -330,
	doubleJumpForce: -264,
	invincibilityAfterDamageSeconds: 2,
	initialLives: 3
} as const;

export const TERRAIN_BALANCE = {
	crackedGroundTimerSeconds: 1.5,
	asaBrancaPlatformDurationSeconds: 4
} as const;

export const RAIN_BALANCE = {
	rainDurationSeconds: 60,
	rainTransitionSeconds: 30,
	dropsPerPhase: 3
} as const;

export const COLLECTIBLES_BALANCE = {
	mandacaruDurationSeconds: 15,
	umbusForExtraLife: 100
} as const;

export const GAME_WIDTH = GAME_CONFIG.width;
export const GAME_HEIGHT = GAME_CONFIG.height;
