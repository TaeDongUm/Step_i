import React, { useState, useEffect } from 'react';

const defaultTags = ['건강', '학습', '운동'];

const AddRoutineModal = ({ isOpen, onClose, onAdd, customTags, editingRoutine }) => {
    const [title, setTitle] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [xp, setXp] = useState(10);
    const [estimatedTime, setEstimatedTime] = useState(30);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (editingRoutine) {
            setTitle(editingRoutine.title);
            setSelectedTag(editingRoutine.category);
            setXp(editingRoutine.xp);
            setEstimatedTime(editingRoutine.estimatedTime || 30);
        } else {
            setTitle('');
            setSelectedTag('');
            setXp(10);
            setEstimatedTime(30);
        }
    }, [editingRoutine]);

    const allTags = [...defaultTags, ...customTags];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !selectedTag) return;

        onAdd({
            title,
            category: selectedTag,
            xp: parseInt(xp),
            estimatedTime: parseInt(estimatedTime),
            completed: editingRoutine?.completed || false
        });

        // Reset form
        setTitle('');
        setSelectedTag('');
        setXp(10);
        setEstimatedTime(30);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#fff',
                borderRadius: 12,
                padding: 32,
                width: '100%',
                maxWidth: 480,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
                    {editingRoutine ? '루틴 수정하기' : '새로운 루틴 추가하기'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>루틴 내용</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #ddd',
                                borderRadius: 6,
                                fontSize: 16
                            }}
                            placeholder="루틴 내용을 입력하세요"
                        />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>태그</label>
                        <select
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #ddd',
                                borderRadius: 6,
                                fontSize: 16
                            }}
                        >
                            <option value="">태그를 선택하세요</option>
                            {allTags.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>예상 시간 (분)</label>
                        <input
                            type="number"
                            value={estimatedTime}
                            onChange={(e) => setEstimatedTime(e.target.value)}
                            min="1"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #ddd',
                                borderRadius: 6,
                                fontSize: 16
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>경험치</label>
                        <input
                            type="number"
                            value={xp}
                            onChange={(e) => setXp(e.target.value)}
                            min="1"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #ddd',
                                borderRadius: 6,
                                fontSize: 16
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '10px 24px',
                                border: '1px solid #ddd',
                                borderRadius: 6,
                                background: '#fff',
                                fontSize: 16,
                                cursor: 'pointer'
                            }}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '10px 24px',
                                border: 'none',
                                borderRadius: 6,
                                background: '#62d96b',
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            {editingRoutine ? '수정하기' : '추가하기'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRoutineModal; 