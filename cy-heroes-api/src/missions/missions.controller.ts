import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MissionsService } from './missions.service';
import { Mission } from './Mission';
import { TestEnvOnlyGuard } from 'src/test-env-only/test-env-only.guard';

@Controller('missions')
export class MissionsController {
  constructor(private missionsService: MissionsService) {}

  @Get()
  getMissions() {
    return this.missionsService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.missionsService.get(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteMission(@Param('id') id: number) {
    this.missionsService.delete(id);
  }

  @UseGuards(TestEnvOnlyGuard)
  @Post('/reset')
  reset() {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
      this.missionsService.reset();
    }
  }

  @Post()
  addMission(@Body() mission: Mission) {
    return this.missionsService.add(mission);
  }

  @Put(':id')
  updateMission(@Param('id') id: number, @Body() mission: Mission) {
    return this.missionsService.update(id, mission);
  }
}
