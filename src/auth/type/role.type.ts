const roles = ['USER', 'MEMBER'] as const;

export type Role = (typeof roles)[number];
