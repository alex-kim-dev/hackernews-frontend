import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import type { Item, ItemID } from '~/types';

axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0';

class ContentStore {
  private readonly numOfRecent = 5;

  recent: Item[] = [];

  state: 'idle' | 'pending' | 'done' | 'error' = 'idle';

  constructor() {
    makeAutoObservable(this);
    this.getRecent();
  }

  async getRecent() {
    this.state = 'pending';
    this.recent = [];

    try {
      const { data: itemIDs } = await axios.get<ItemID[]>('topstories.json');
      const responses = await Promise.all(
        itemIDs
          .slice(0, this.numOfRecent)
          .map((id) => axios.get<Item>(`item/${id}.json`)),
      );

      runInAction(() => {
        this.state = 'done';
        this.recent = responses.map(({ data }) => data);
      });
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const content = new ContentStore();
