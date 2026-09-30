import * as migration_20260930_083214 from './20260930_083214';

export const migrations = [
  {
    up: migration_20260930_083214.up,
    down: migration_20260930_083214.down,
    name: '20260930_083214'
  },
];
