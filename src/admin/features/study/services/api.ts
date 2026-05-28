import adminApiClient from '../../../utils/apiClient';

export const fetchSubjects = async () => {
  const res = await adminApiClient.get('/study/subjects');
  return res.data.data.subjects;
};

export const createSubject = async (data: { name: string; icon: string; color: string; description: string }) => {
  const res = await adminApiClient.post('/study/subjects', data);
  return res.data.data;
};

export const updateSubject = async (id: string, data: any) => {
  const res = await adminApiClient.patch(`/study/subjects/${id}`, data);
  return res.data.data;
};

export const deleteSubject = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/study/subjects/${id}`);
  return id;
};

export const fetchAdminMaterials = async (params: { subject?: string }) => {
  const q = new URLSearchParams();
  if (params.subject) q.append('subject', params.subject);
  const res = await adminApiClient.get(`/study/materials?${q.toString()}`);
  return res.data.data.materials;
};

export const createMaterial = async (data: any) => {
  const res = await adminApiClient.post('/study/materials/create', data);
  return res.data.data;
};

export const updateMaterial = async (id: string, data: any) => {
  const res = await adminApiClient.patch(`/study/materials/${id}`, data);
  return res.data.data;
};

export const deleteMaterial = async (id: string): Promise<string> => {
  await adminApiClient.delete(`/study/materials/${id}`);
  return id;
};
