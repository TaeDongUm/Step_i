import React, { useState } from 'react';

const defaultTags = ['건강', '학습', '운동'];

const Tags = ({ routines, onAddTag, customTags: parentCustomTags }) => {
    const [newTag, setNewTag] = useState('');
    const [editingTag, setEditingTag] = useState(null);
    const [showAddTagModal, setShowAddTagModal] = useState(false);

    const getCompletionColor = (rate) => {
        if (rate <= 25) return '#ffcdd2'; // 연한 붉은색
        if (rate <= 75) return '#fff9c4'; // 노란색
        return '#c8e6c9'; // 초록색
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        if (!newTag.trim()) return;

        const tag = newTag.trim();
        if (![...defaultTags, ...parentCustomTags].includes(tag)) {
            onAddTag(tag);
        }
        setNewTag('');
        setShowAddTagModal(false);
    };

    const handleEditTag = (tag) => {
        setEditingTag(tag);
        setNewTag(tag);
        setShowAddTagModal(true);
    };

    const handleSaveEdit = () => {
        if (!newTag.trim()) return;
        if (editingTag === newTag.trim()) {
            setShowAddTagModal(false);
            setEditingTag(null);
            setNewTag('');
            return;
        }

        const newTagName = newTag.trim();
        if (![...defaultTags, ...parentCustomTags].includes(newTagName)) {
            onAddTag(newTagName);
            // Update routines with the new tag name
            routines.forEach(routine => {
                if (routine.category === editingTag) {
                    routine.category = newTagName;
                }
            });
        }
        setShowAddTagModal(false);
        setEditingTag(null);
        setNewTag('');
    };

    const handleDeleteTag = (tag) => {
        if (window.confirm('정말로 이 태그를 삭제하시겠습니까?')) {
            onAddTag(tag, true); // true indicates deletion
        }
    };

    const calculateTagStats = (tag) => {
        const total = routines.filter(r => r.category === tag).length;
        const completed = routines.filter(r => r.category === tag && r.completed).length;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { total, completed, completionRate };
    };

    const allTags = [...defaultTags, ...parentCustomTags];

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 600 }}>Tags</h1>
                <button
                    onClick={() => setShowAddTagModal(true)}
                    style={{
                        background: '#62d96b',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 6,
                        cursor: 'pointer'
                    }}
                >
                    + 새로운 태그 추가하기
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {[...defaultTags, ...parentCustomTags].map(tag => {
                    const stats = calculateTagStats(tag);
                    return (
                        <div
                            key={tag}
                            style={{
                                background: '#fff',
                                border: '1px solid #eee',
                                borderRadius: 8,
                                padding: 16
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                <div style={{ fontSize: 16, fontWeight: 600 }}>{tag}</div>
                                {!defaultTags.includes(tag) && (
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button
                                            onClick={() => handleEditTag(tag)}
                                            style={{
                                                background: '#f5f5f5',
                                                border: 'none',
                                                padding: '4px 8px',
                                                borderRadius: 4,
                                                cursor: 'pointer',
                                                color: '#666',
                                                fontSize: 12
                                            }}
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTag(tag)}
                                            style={{
                                                background: '#f5f5f5',
                                                border: 'none',
                                                padding: '4px 8px',
                                                borderRadius: 4,
                                                cursor: 'pointer',
                                                color: '#666',
                                                fontSize: 12
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div style={{ fontSize: 14, color: '#666' }}>
                                <div style={{ marginBottom: 4 }}>
                                    전체 루틴: {stats.total}개
                                </div>
                                <div style={{ marginBottom: 4 }}>
                                    완료된 루틴: {stats.completed}개
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    marginTop: 8
                                }}>
                                    <div style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        background: `conic-gradient(${getCompletionColor(stats.completionRate)} ${stats.completionRate * 3.6}deg, #f5f5f5 ${stats.completionRate * 3.6}deg)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: '#666'
                                    }}>
                                        {stats.completionRate}%
                                    </div>
                                    <div style={{ fontSize: 14, color: '#666' }}>
                                        완료율
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {showAddTagModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        background: '#fff',
                        padding: 24,
                        borderRadius: 8,
                        width: 400
                    }}>
                        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
                            {editingTag ? '태그 수정하기' : '새로운 태그 추가하기'}
                        </h2>
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="태그 이름을 입력하세요"
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #eee',
                                borderRadius: 6,
                                marginBottom: 16
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button
                                onClick={() => {
                                    setShowAddTagModal(false);
                                    setNewTag('');
                                    setEditingTag(null);
                                }}
                                style={{
                                    padding: '8px 16px',
                                    border: '1px solid #eee',
                                    borderRadius: 6,
                                    background: '#fff',
                                    cursor: 'pointer'
                                }}
                            >
                                취소
                            </button>
                            <button
                                onClick={editingTag ? handleSaveEdit : handleAddTag}
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: 6,
                                    background: '#62d96b',
                                    color: '#fff',
                                    cursor: 'pointer'
                                }}
                            >
                                {editingTag ? '수정하기' : '추가하기'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tags; 