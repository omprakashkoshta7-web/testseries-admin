import React, { useState } from 'react';
import { Button, Input, Modal, Textarea } from '@shared/components';
import { Plus, Edit, Trash2, GripVertical } from '@shared/icons';

interface Section {
  id: string;
  name: string;
  description?: string;
  order: number;
  totalQuestions?: number;
}

interface SectionManagementProps {
  testId: string;
  sections: Section[];
  loading: boolean;
  onAddSection: (name: string, description?: string) => void;
  onUpdateSection: (sectionId: string, name: string, description?: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onReorder: (sections: Section[]) => void;
  onAssignQuestions: (sectionId: string) => void;
}

const SectionManagement: React.FC<SectionManagementProps> = ({
  testId,
  sections,
  loading,
  onAddSection,
  onUpdateSection,
  onDeleteSection,
  onReorder,
  onAssignQuestions,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [draggedSection, setDraggedSection] = useState<string | null>(null);

  const handleAddSection = () => {
    if (!formData.name.trim()) return;
    onAddSection(formData.name, formData.description);
    setFormData({ name: '', description: '' });
    setShowAddModal(false);
  };

  const handleEditSection = () => {
    if (!editingSection || !formData.name.trim()) return;
    onUpdateSection(editingSection.id, formData.name, formData.description);
    setFormData({ name: '', description: '' });
    setEditingSection(null);
    setShowEditModal(false);
  };

  const openEditModal = (section: Section) => {
    setEditingSection(section);
    setFormData({ name: section.name, description: section.description || '' });
    setShowEditModal(true);
  };

  const handleDragStart = (sectionId: string) => {
    setDraggedSection(sectionId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetSection: Section) => {
    if (!draggedSection) return;
    const newSections = sections.map(s => ({ ...s }));
    const draggedIdx = newSections.findIndex(s => s.id === draggedSection);
    const targetIdx = newSections.findIndex(s => s.id === targetSection.id);
    if (draggedIdx >= 0 && targetIdx >= 0) {
      [newSections[draggedIdx], newSections[targetIdx]] = [newSections[targetIdx], newSections[draggedIdx]];
      newSections.forEach((s, idx) => s.order = idx);
      onReorder(newSections);
    }
    setDraggedSection(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-tb-navy">Test Sections</h3>
        <Button onClick={() => setShowAddModal(true)} size="sm">
          <Plus className="w-4 h-4" /> Add Section
        </Button>
      </div>

      {sections.length === 0 ? (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-tb-gray-500 mb-4">No sections added yet</p>
          <Button onClick={() => setShowAddModal(true)} variant="secondary">
            Create First Section
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {sections.map((section) => (
            <div
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(section.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(section)}
              className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-tb-blue hover:shadow-sm transition-all"
            >
              <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
              <div className="flex-1">
                <h4 className="font-medium text-tb-navy">{section.name}</h4>
                {section.description && <p className="text-sm text-tb-gray-500">{section.description}</p>}
                {section.totalQuestions !== undefined && (
                  <p className="text-xs text-tb-gray-400 mt-1">{section.totalQuestions} questions</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onAssignQuestions(section.id)}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:bg-blue-50"
                >
                  Assign Qs
                </Button>
                <Button
                  onClick={() => openEditModal(section)}
                  variant="ghost"
                  size="sm"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => onDeleteSection(section.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); setFormData({ name: '', description: '' }); }}
        title="Add New Section"
        footer={
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAddSection}>Add Section</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Section Name"
            placeholder="e.g., Physics, Mathematics, Reading Comprehension"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Textarea
            label="Description (Optional)"
            placeholder="Brief description of this section"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setEditingSection(null); setFormData({ name: '', description: '' }); }}
        title="Edit Section"
        footer={
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button onClick={handleEditSection}>Update</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Section Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Textarea
            label="Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SectionManagement;
