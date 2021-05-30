import { Query, Resolver } from '@nestjs/graphql';
import { IndexService } from './index.service';

@Resolver()
export class IndexResolver {
  constructor(private readonly indexService: IndexService) {}

  @Query(() => String)
  songIndex() {
    return JSON.stringify(this.indexService.getIndex().selectIndex);
  }
}
