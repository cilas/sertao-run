export enum PlayerState {
  IDLE = 'idle',
  WALKING = 'walking',
  RUNNING = 'running',
  JUMPING = 'jumping',
  CROUCHING = 'crouching',
  HURT = 'hurt',
  DEAD = 'dead',
}

export interface PlayerStateContext {
  isOnGround: boolean;
  isMovingHorizontally: boolean;
  isRunning: boolean;
  isCrouching: boolean;
  isHurt: boolean;
  isDead: boolean;
}

export function resolvePlayerState(
  _current: PlayerState,
  ctx: PlayerStateContext,
): PlayerState {
  if (ctx.isDead) return PlayerState.DEAD;
  if (ctx.isHurt) return PlayerState.HURT;
  if (!ctx.isOnGround) return PlayerState.JUMPING;
  if (ctx.isCrouching) return PlayerState.CROUCHING;
  if (ctx.isMovingHorizontally && ctx.isRunning) return PlayerState.RUNNING;
  if (ctx.isMovingHorizontally) return PlayerState.WALKING;
  return PlayerState.IDLE;
}
