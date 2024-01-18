import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import type { Item, ItemID } from '~/types';

axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0';

class ContentStore {
  private readonly numOfRecent = 5;

  /** in seconds */
  private readonly refreshInterval = 60;

  private refreshTimerID: number = -1;

  recent: Item[] = [];

  state: 'initial' | 'pending' | 'done' | 'error' = 'initial';

  constructor() {
    makeAutoObservable(this);
    this.getRecent();
  }

  setState(state: typeof this.state) {
    this.state = state;
  }

  async #getRecent() {
    this.setState('pending');

    try {
      const { data: itemIDs } = await axios.get<ItemID[]>('topstories.json');
      const responses = await Promise.all(
        itemIDs
          .slice(0, this.numOfRecent)
          .map((id) => axios.get<Item>(`item/${id}.json`)),
      );

      runInAction(() => {
        this.setState('done');
        this.recent = responses.map(({ data }) => data);
      });
    } catch (error) {
      runInAction(() => {
        this.setState('error');
      });
    }
  }

  getRecent() {
    clearTimeout(this.refreshTimerID);
    this.#getRecent();
    this.refreshTimerID = setTimeout(
      () => this.#getRecent(),
      this.refreshInterval * 1000,
    );
  }
}

export const content = new ContentStore();
