import { Municipality, IMunicipality } from '../models/municipality.model';

export async function findAllMunicipalities(): Promise<IMunicipality[]> {
  return Municipality.find().sort({ name: 1 });
}

export async function findMunicipalityById(id: string): Promise<IMunicipality | null> {
  return Municipality.findById(id);
}

export async function createMunicipality(name: string): Promise<IMunicipality> {
  return Municipality.create({ name });
}

export async function updateMunicipality(
  id: string,
  name: string
): Promise<IMunicipality | null> {
  return Municipality.findByIdAndUpdate(id, { name }, { new: true });
}

export async function deleteMunicipality(id: string): Promise<IMunicipality | null> {
  return Municipality.findByIdAndDelete(id);
}

export async function municipalityExists(name: string): Promise<boolean> {
  const doc = await Municipality.findOne({ name });
  return !!doc;
}
