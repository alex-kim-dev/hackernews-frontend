import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import type { Item, ItemID } from '~/types';

axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0';

class StoriesStore {
  private readonly amount = 5;

  topStories: Item[] = [];

  state: 'idle' | 'pending' | 'done' | 'error' = 'idle';

  constructor() {
    makeAutoObservable(this);
    this.getTopStories();
  }

  async getTopStories() {
    this.state = 'pending';
    this.topStories = [];

    try {
      const { data: storiesIds } = await axios.get<ItemID[]>('topstories.json');
      const responses = await Promise.all(
        storiesIds
          .slice(0, this.amount)
          .map((id) => axios.get<Item>(`item/${id}.json`)),
      );

      runInAction(() => {
        this.state = 'done';
        this.topStories = responses.map(({ data }) => data);
      });
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const stories = new StoriesStore();
