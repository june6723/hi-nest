import {
  Controller,
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  getAll(): Podcast[] {
    return this.podcastsService.getAll();
  }

  @Post()
  create(@Body() podcastData) {
    return this.podcastsService.create(podcastData);
  }

  @Get('/:id')
  getOne(@Param('id') podcastId: string): Podcast {
    return this.podcastsService.getOne(podcastId);
  }

  @Patch('/:id')
  modify(@Param('id') podcastId: string, @Body() updateData) {
    return this.podcastsService.update(podcastId, updateData);
  }

  @Delete('/:id')
  remove(@Param('id') podcastId: string) {
    return this.podcastsService.deleteOne(podcastId);
  }

  @Get('/:id/episodes')
  getAllEpisodes(@Param('id') podcastId: string) {
    return this.podcastsService.getEpisodes(podcastId);
  }

  @Post('/:id/episodes')
  addEpisode(@Param('id') podcastId: string, @Body() episodeData) {
    return this.podcastsService.addEpisode(podcastId, episodeData);
  }

  @Delete('/:id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') epiId: string,
  ) {
    return this.podcastsService.deleteEpisode(podcastId, epiId);
  }

  @Patch('/:id/episodes/:episodeId')
  updateEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') epiId: string,
    @Body() epiData,
  ) {
    return this.podcastsService.updateEpisode(podcastId, epiId, epiData);
  }
}
// GET /podcasts/:id/episodes
// POST /podcasts/:id/episodes
// PATCH /podcasts/:id/episodes/:episodeId
// DELETE /podcasts/:id/episodes/:episodeId
