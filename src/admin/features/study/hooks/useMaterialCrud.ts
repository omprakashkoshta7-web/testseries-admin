import { useState } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { createMaterial, updateMaterial, deleteMaterial, fetchAdminMaterials } from '../store/study.slice';
import { useToast } from '../../../utils/ToastContext';
import type { IAdminStudyMaterial } from '../../../types';

const emptyMaterialForm = {
  title: '', description: '', subject: '', category: 'notes', chapter: '',
  duration: 30, author: '', tags: '', content: '', pdfUrl: '', videoUrl: '', isActive: true,
  pdfUpload: null as { name: string; type: string; data: string } | null,
};

export const useMaterialCrud = (
  loadMaterials: () => void,
  subjects: any[],
  selectedSubject?: string,
) => {
  const dispatch = useAdminDispatch();
  const { showToast } = useToast();

  const [materialModal, setMaterialModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<IAdminStudyMaterial | null>(null);
  const [materialForm, setMaterialForm] = useState(emptyMaterialForm);
  const [actionError, setActionError] = useState<string | null>(null);
  const [confirmDeleteMaterial, setConfirmDeleteMaterial] = useState<{ id: string; title: string } | null>(null);

  const openMaterialModal = (material?: IAdminStudyMaterial) => {
    setActionError(null);
    if (material) {
      setEditingMaterial(material);
      const subId = typeof material.subject === 'object' ? material.subject._id : material.subject;
      setMaterialForm({
        title: material.title, description: material.description || '', subject: subId || '',
        category: material.category, chapter: material.chapter || '', duration: material.duration,
        author: material.author || '', tags: (material.tags || []).join(', '), content: material.content || '',
        pdfUrl: material.pdfUrl || '', videoUrl: material.videoUrl || '', isActive: material.isActive,
        pdfUpload: null,
      });
    } else {
      setEditingMaterial(null);
      setMaterialForm({
        ...emptyMaterialForm,
        subject: selectedSubject || (subjects[0] as any)?.id || '',
      });
    }
    setMaterialModal(true);
  };

  const saveMaterial = async () => {
    setActionError(null);
    if (!materialForm.title.trim()) {
      setActionError('Title is required');
      return;
    }
    if (!materialForm.subject) {
      setActionError('Please select a subject');
      return;
    }
    try {
      const payload = {
        ...materialForm, tags: materialForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
        duration: Number(materialForm.duration),
      };
      if (editingMaterial) await dispatch(updateMaterial({ id: editingMaterial.id, data: payload })).unwrap();
      else await dispatch(createMaterial(payload)).unwrap();
      showToast(editingMaterial ? 'Material updated' : 'Material created', 'success');
      setMaterialModal(false);
      loadMaterials();
    } catch (e: any) { setActionError(typeof e === 'string' ? e : e?.message || 'Failed to save material'); }
  };

  const handleDeleteMaterial = (id: string, title: string) => {
    setConfirmDeleteMaterial({ id, title });
  };

  const performDeleteMaterial = async () => {
    if (!confirmDeleteMaterial) return;
    await dispatch(deleteMaterial(confirmDeleteMaterial.id));
    showToast(`Material "${confirmDeleteMaterial.title}" deleted`, 'success');
    setConfirmDeleteMaterial(null);
    loadMaterials();
  };

  return {
    materialModal,
    setMaterialModal,
    editingMaterial,
    materialForm,
    setMaterialForm,
    actionError,
    setActionError,
    confirmDeleteMaterial,
    setConfirmDeleteMaterial,
    openMaterialModal,
    saveMaterial,
    handleDeleteMaterial,
    performDeleteMaterial,
  };
};
