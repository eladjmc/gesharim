import * as municipalityDal from '../dal/municipality.dal';
import * as projectDal from '../dal/project.dal';
import * as manhadDal from '../dal/manhad.dal';
import type { IMunicipality } from '../models/municipality.model';

export async function getAll(): Promise<IMunicipality[]> {
  return municipalityDal.findAllMunicipalities();
}

export async function create(name: string): Promise<IMunicipality> {
  const exists = await municipalityDal.municipalityExists(name);
  if (exists) throw new Error('Municipality already exists');
  return municipalityDal.createMunicipality(name);
}

export async function update(id: string, name: string): Promise<IMunicipality | null> {
  return municipalityDal.updateMunicipality(id, name);
}

export async function remove(id: string): Promise<void> {
  const activeProjects = await projectDal.countProjectsByMunicipality(id);
  if (activeProjects > 0) {
    throw new Error('Cannot delete municipality with active projects');
  }

  const assignedManhadim = await manhadDal.countManhadimByMunicipality(id);
  if (assignedManhadim > 0) {
    throw new Error('Cannot delete municipality assigned to מנה"דים');
  }

  await municipalityDal.deleteMunicipality(id);
}
