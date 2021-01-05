import { Controller, Get } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'this will return all movies';
  }

  @Get('/:id')
  getOne() {
    return 'This will return one movie';
  }
}
