import { Injectable, NotFoundException } from '@nestjs/common';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAll(): Podcast[] {
    return this.podcasts;
  }

  create(podcastData) {
    this.podcasts.push({
      id: this.podcasts.length + 1,
      ...podcastData,
    });
  }

  getOne(id: string): Podcast {
    const podcast = this.podcasts.find((podcast) => podcast.id === +id);
    if (!podcast) {
      throw new NotFoundException(`Podcast with ID: ${id} not found.`);
    }
    return podcast;
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.podcasts = this.podcasts.filter((podcast) => podcast.id !== +id);
  }

  update(id: string, updateData) {
    const podcast = this.getOne(id);
    this.deleteOne(id);
    this.podcasts.push({ ...podcast, ...updateData });
  }

  getEpisodes(id: string) {
    const podcast = this.getOne(id);
    return podcast.episodes;
  }

  getOneEpisode(podId: string, epiId: string) {
    const podcast = this.getOne(podId);
    const episode = podcast.episodes.find((episode) => episode.id === +epiId);
    if (!episode) {
      throw new NotFoundException(`Episode with ID: ${epiId} not found.`);
    }
    return episode;
  }

  addEpisode(podcastId: string, episodeData) {
    const podcast = this.getOne(podcastId);
    const len = podcast.episodes.length;
    podcast.episodes.push({
      id: len + 1,
      ...episodeData,
    });
  }

  deleteEpisode(podId: string, epiId: string) {
    const episode = this.getOneEpisode(podId, epiId);
    const podcast = this.getOne(podId);
    podcast.episodes = podcast.episodes.filter((epi) => epi.id !== episode.id);
  }

  updateEpisode(podId: string, epiId: string, epiData) {
    const episode = this.getOneEpisode(podId, epiId);
    const podcast = this.getOne(podId);
    this.deleteEpisode(podId, epiId);
    podcast.episodes.push({ ...episode, ...epiData });
  }
}
