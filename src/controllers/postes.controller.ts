import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { PostesService } from '../services/postes.service';
import { Poste } from '../schemas/poste.schema';
import MongooseClassSerializerInterceptor from 'src/utils/mongooseClassSerializer.interceptor';
import { CreatePosteDto, UpdatePosteDto } from '../dtos/poste.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('postes')
@UseInterceptors(MongooseClassSerializerInterceptor(Poste))
export class PostesController {
  constructor(private readonly postesService: PostesService) { }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPosteDto: CreatePosteDto) {
    return this.postesService.create(createPosteDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.postesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string) {
    return this.postesService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updatePosteDto: UpdatePosteDto) {
    return this.postesService.update(id, updatePosteDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.postesService.delete(id);
  }
}
