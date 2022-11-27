import { Injectable, NotFoundException } from '@nestjs/common';
import { Mission } from './Mission';

const defaultMission: Mission = {
  id: 1,
  description: 'save the galaxy',
  complete: false,
  created: new Date().toISOString(),
};

@Injectable()
export class MissionsService {
  missions: Mission[] = [new Mission(defaultMission)];

  getAll() {
    return this.missions;
  }

  get(id: number) {
    const mission = this.missions.find((x) => x.id === id);
    if (!mission) {
      throw new NotFoundException();
    }
    return mission;
  }

  delete(id: number) {
    this.missions = this.missions.filter((x) => x.id !== id);
  }

  reset() {
    this.missions = [new Mission(defaultMission)];
  }

  add(mission: Mission) {
    const newId = Math.max(...this.missions.map((x) => x.id)) + 1;
    mission.id = newId;
    this.missions.push(mission);
    return mission;
  }

  update(id: number, mission: Mission) {
    mission.id = id;
    this.missions = this.missions.map((x) => {
      return x.id === id ? mission : x;
    });
    return this.get(id);
  }
}
