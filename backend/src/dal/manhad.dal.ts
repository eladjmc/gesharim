import { Manhad, IManhad } from '../models/manhad.model';

export async function findAllManhadim(): Promise<IManhad[]> {
  return Manhad.find().populate('municipalities').sort({ name: 1 });
}

export async function findManhadById(id: string): Promise<IManhad | null> {
  return Manhad.findById(id).populate('municipalities');
}

export async function createManhad(data: {
  name: string;
  email: string;
  phone: string;
  municipalities: string[];
}): Promise<IManhad> {
  return Manhad.create(data);
}

export async function updateManhad(
  id: string,
  data: { name: string; email: string; phone: string; municipalities: string[] }
): Promise<IManhad | null> {
  return Manhad.findByIdAndUpdate(id, data, { new: true }).populate('municipalities');
}

export async function deleteManhad(id: string): Promise<IManhad | null> {
  return Manhad.findByIdAndDelete(id);
}

export async function countManhadimByMunicipality(municipalityId: string): Promise<number> {
  return Manhad.countDocuments({ municipalities: municipalityId });
}
