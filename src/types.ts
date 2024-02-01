export type ItemID = number;
/** case sensitive */
export type UserID = string;

export interface Item {
  id: ItemID;
  deleted?: boolean;
  type?: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
  by?: UserID;
  /** Unix time */
  time?: number;
  /** HTML */
  text?: string;
  dead?: boolean;
  parent?: ItemID;
  poll?: ItemID;
  kids?: ItemID[];
  url?: string;
  score?: number;
  /** HTML */
  title?: string;
  parts?: ItemID[];
  /** comment count for stories & polls */
  descendants?: number;
}

export interface User {
  id: UserID;
  /** Unix time */
  created: number;
  karma: number;
  /** HTML */
  about?: string;
  submitted?: ItemID[];
}
