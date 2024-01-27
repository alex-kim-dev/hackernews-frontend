import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import type { Item, ItemID } from '~/types';

axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0';

class ContentStore {
  private readonly numOfRecent = 5;

  /** in seconds */
  private readonly refreshInterval = 60;

  private refreshTimerID = -1;

  private controller = new AbortController();

  recent: Item[] = [];

  state: 'initial' | 'pending' | 'done' | 'error' = 'initial';

  constructor() {
    makeAutoObservable(this);
  }

  setState(state: typeof this.state) {
    this.state = state;
  }

  async #getRecent() {
    this.setState('pending');

    try {
      this.controller = new AbortController();

      const { data: itemIDs } = await axios.get<ItemID[]>('newstories.json', {
        signal: this.controller.signal,
      });

      const responses = await Promise.all(
        itemIDs.slice(0, this.numOfRecent).map((id) =>
          axios.get<Item>(`item/${id}.json`, {
            signal: this.controller.signal,
          }),
        ),
      );

      this.setState('done');
      runInAction(() => {
        this.recent = responses.map(({ data }) => data);
      });
    } catch (error) {
      this.setState('error');
    }
  }

  getRecent() {
    clearTimeout(this.refreshTimerID);
    this.#getRecent();
    this.refreshTimerID = setTimeout(
      () => this.getRecent(),
      this.refreshInterval * 1000,
    );
  }

  stopUpdate() {
    this.controller.abort();
    clearTimeout(this.refreshTimerID ?? 0);
  }
}

export const content = new ContentStore();
