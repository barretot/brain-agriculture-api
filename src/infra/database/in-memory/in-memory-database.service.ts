import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDatabaseService<T> {
  private items: T[] = [];

  public async create(item: T): Promise<T> {
    this.items.push(item);

    return item;
  }

  public getAll(): T[] {
    return this.items;
  }

  public find(filterFn: (item: T) => boolean): T | undefined {
    return this.items.find(filterFn);
  }

  public update(item: T, filterFn: (item: T) => boolean): void {
    const index = this.items.findIndex(filterFn);
    if (index !== -1) {
      this.items[index] = item;
    }
  }
}
