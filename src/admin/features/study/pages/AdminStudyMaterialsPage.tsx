import React, { useEffect, useCallback } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { fetchSubjects, fetchAdminMaterials } from '../store/study.slice';
import { useAdminStudyState, useSubjectCrud, useMaterialCrud, useFileUpload } from '../hooks';
import type { IAdminSubject } from '../../../types';
import ConfirmModal from '../../../components/ConfirmModal';
import PageHeader from '../../../components/PageHeader';
import { StudyTabBar, SubjectList, MaterialList, SubjectFormModal, StudyMaterialFormModal } from '../components';

const AdminStudyMaterialsPage: React.FC = () => {
  const dispatch = useAdminDispatch();
  const { subjects, materials, loading } = useAdminStudyState();

  const [activeTab, setActiveTab] = React.useState<'subjects' | 'materials'>('subjects');
  const [subjectSearch, setSubjectSearch] = React.useState('');
  const [materialSearch, setMaterialSearch] = React.useState('');
  const [selectedSubject, setSelectedSubject] = React.useState('');

  const loadSubjects = useCallback(() => { dispatch(fetchSubjects()); }, [dispatch]);
  const loadMaterials = useCallback(() => { dispatch(fetchAdminMaterials({ subject: selectedSubject || undefined })); }, [dispatch, selectedSubject]);

  useEffect(() => { loadSubjects(); }, [loadSubjects]);
  useEffect(() => { if (activeTab === 'materials') loadMaterials(); }, [activeTab, loadMaterials]);

  const subjectCrud = useSubjectCrud(loadSubjects);
  const materialCrud = useMaterialCrud(loadMaterials, subjects, selectedSubject);
  const fileUpload = useFileUpload(materialCrud.setMaterialForm, materialCrud.setActionError);

  const filteredSubjects = subjects.filter((s: IAdminSubject) => s.name.toLowerCase().includes(subjectSearch.toLowerCase()));
  const filteredMaterials = materials.filter((m: any) => m.title.toLowerCase().includes(materialSearch.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Study Materials" subtitle="Manage subjects and study materials" />
      <StudyTabBar activeTab={activeTab} subjectsCount={subjects.length} materialsCount={materials.length} onChange={setActiveTab} />

      {activeTab === 'subjects' && (
        <SubjectList
          subjects={subjects} filteredSubjects={filteredSubjects} subjectSearch={subjectSearch}
          onSubjectSearchChange={setSubjectSearch} onAddSubject={() => subjectCrud.openSubjectModal()}
          onEditSubject={(s) => subjectCrud.openSubjectModal(s)} onDeleteSubject={(id, name) => subjectCrud.handleDeleteSubject(id, name)}
        />
      )}

      {activeTab === 'materials' && (
        <MaterialList
          materials={materials} filteredMaterials={filteredMaterials} materialSearch={materialSearch}
          selectedSubject={selectedSubject} subjects={subjects} loading={loading}
          onMaterialSearchChange={setMaterialSearch} onSubjectChange={setSelectedSubject}
          onAddMaterial={() => materialCrud.openMaterialModal()} onEditMaterial={materialCrud.openMaterialModal}
          onDeleteMaterial={materialCrud.handleDeleteMaterial}
        />
      )}

      <SubjectFormModal
        isOpen={subjectCrud.subjectModal} onClose={() => subjectCrud.setSubjectModal(false)}
        editingSubject={subjectCrud.editingSubject} form={subjectCrud.subjectForm}
        onFormChange={subjectCrud.setSubjectForm} actionError={subjectCrud.actionError}
        onSave={subjectCrud.saveSubject}
      />

      <StudyMaterialFormModal
        isOpen={materialCrud.materialModal} onClose={() => materialCrud.setMaterialModal(false)}
        materialForm={materialCrud.materialForm} onChange={materialCrud.setMaterialForm}
        onSubmit={materialCrud.saveMaterial} onPdfUpload={fileUpload.handlePdfUpload}
        onNotesUpload={fileUpload.handleNotesUpload} editingMaterial={materialCrud.editingMaterial}
        subjects={subjects} actionError={materialCrud.actionError}
        pdfFileName={fileUpload.pdfFileName} notesFileName={fileUpload.notesFileName}
      />

      <ConfirmModal isOpen={!!subjectCrud.confirmDeleteSubject} onCancel={() => subjectCrud.setConfirmDeleteSubject(null)} onConfirm={subjectCrud.performDeleteSubject}
        title="Delete Subject" message={subjectCrud.confirmDeleteSubject ? `Delete subject "${subjectCrud.confirmDeleteSubject.name}"? This will deactivate related materials.` : ''} />
      <ConfirmModal isOpen={!!materialCrud.confirmDeleteMaterial} onCancel={() => materialCrud.setConfirmDeleteMaterial(null)} onConfirm={materialCrud.performDeleteMaterial}
        title="Delete Material" message={materialCrud.confirmDeleteMaterial ? `Delete material "${materialCrud.confirmDeleteMaterial.title}"?` : ''} />
    </div>
  );
};

export default AdminStudyMaterialsPage;
