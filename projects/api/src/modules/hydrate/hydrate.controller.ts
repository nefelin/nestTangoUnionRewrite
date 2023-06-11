import { Controller, Post, UseGuards } from '@nestjs/common';
import { HydrateService } from './hydrate.service';
import { BasicGuard } from '../auth/guard-strategies';

const RESCRAPE_STALE_BATCH_SIZE = 3; // this should cover the entire library approx once a month (slightly faster)
@Controller('hydrate')
export class HydrateController {
  constructor(private readonly hydrateService: HydrateService) {}

  // all of these commented functions were used locally when doing initialy scraping, leaving in place for reference
  // in case we decide to rescrape the entire lib
  // notably absent are the word stems added for better free text search

  // @Get('stop')
  // stopHydrating() {
  //   return this.hydrateService.stopHydrating();
  // }
  //
  // @Get('start')
  // startHydrating() {
  //   return this.hydrateService.startHydrating();
  // }
  //
  // @Get('report')
  // hydrationReport() {
  //   return this.hydrateService.report();
  // }
  //
  // @Get('scoreAll')
  // scoreAll() {
  //   this.hydrateService.rescoreAllTracks();
  // }
  //
  // @Get('scoreMissing')
  // scoreTracks() {
  //   this.hydrateService.scoreUnscoredTracks();
  // }


  @UseGuards(BasicGuard)
  @Post('rescrapeFlagged')
  rescrapeFlagged() {
    console.log('RESCRAPE Flagged');
    this.hydrateService.rescrapeFlagged();
  }

  @UseGuards(BasicGuard)
  @Post('rescrapeStale')
  rescrapeStale() {
    console.log('RESCRAPE Stale');
    this.hydrateService.rescrapeStale(RESCRAPE_STALE_BATCH_SIZE);
  }
}
