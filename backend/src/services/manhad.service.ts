import * as manhadDal from '../dal/manhad.dal';
import * as projectDal from '../dal/project.dal';
import type { IManhad } from '../models/manhad.model';
import type { CreateManhadDto } from '../types/dto';

export async function getAll(): Promise<IManhad[]> {
  return manhadDal.findAllManhadim();
}

export async function getById(id: string): Promise<IManhad | null> {
  return manhadDal.findManhadById(id);
}

export async function create(dto: CreateManhadDto): Promise<IManhad> {
  return manhadDal.createManhad(dto);
}

export async function update(id: string, dto: CreateManhadDto): Promise<IManhad | null> {
  return manhadDal.updateManhad(id, dto);
}

export async function remove(id: string): Promise<void> {
  const activeProjects = await projectDal.countProjectsByManhad(id);
  if (activeProjects > 0) {
    throw new Error('Cannot delete מנה"ד with active projects');
  }
  await manhadDal.deleteManhad(id);
}
