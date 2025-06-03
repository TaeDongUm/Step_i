import React, { useState } from 'react';
import AddRoutineModal from './AddRoutineModal';
import Calendar from './Calendar';
import Statistics from './Statistics';
import Tags from './Tags';
import { useNavigate } from 'react-router-dom';

const defaultTags = ['건강', '학습', '운동'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const [activeTab, setActiveTab] = useState('today');
  const [showAddRoutineModal, setShowAddRoutineModal] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [customTags, setCustomTags] = useState([]);

  const isPastDate = (date) => {
    const today = new Date();
    const routineDate = new Date(date);
    return routineDate.toDateString() < today.toDateString();
  };

  const handleAddRoutine = (newRoutine) => {
    if (editingRoutine) {
      setRoutines(routines.map(r =>
        r.id === editingRoutine.id ? { ...newRoutine, id: r.id, date: r.date } : r
      ));
      setEditingRoutine(null);
    } else {
      setRoutines([
        ...routines,
        {
          ...newRoutine,
          id: Date.now(),
          date: new Date().toISOString()
        }
      ]);
    }
    setShowAddRoutineModal(false);
  };

  const handleEditRoutine = (routine) => {
    setEditingRoutine(routine);
    setShowAddRoutineModal(true);
  };

  const handleDeleteRoutine = (id) => {
    if (window.confirm('정말로 이 루틴을 삭제하시겠습니까?')) {
      setRoutines(routines.filter(r => r.id !== id));
    }
  };

  const handleAddTag = (tag, isDelete = false) => {
    if (isDelete) {
      setCustomTags(customTags.filter(t => t !== tag));
    } else {
      if (!customTags.includes(tag)) {
        setCustomTags([...customTags, tag]);
      }
    }
  };

  const handleCompleteRoutine = (routineId) => {
    setRoutines(routines.map(routine =>
      routine.id === routineId
        ? { ...routine, completed: !routine.completed }
        : routine
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'today':
        return (
          <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h1 style={{ fontSize: 24, fontWeight: 600 }}>My Routines</h1>
              <button
                onClick={() => setShowAddRoutineModal(true)}
                style={{
                  background: '#62d96b',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
              >
                + 새로운 루틴 추가하기
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {routines.map(routine => (
                <div
                  key={routine.id}
                  style={{
                    background: '#fff',
                    border: '1px solid #eee',
                    borderRadius: 8,
                    padding: 16
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{routine.title}</div>
                      <div style={{ fontSize: 14, color: '#666' }}>{routine.category}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => handleEditRoutine(routine)}
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
                        onClick={() => handleDeleteRoutine(routine.id)}
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
                  </div>
                  <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>
                    {routine.estimatedTime}분 • {routine.xp} XP
                  </div>
                  <button
                    onClick={() => handleCompleteRoutine(routine.id)}
                    style={{
                      width: '100%',
                      background: routine.completed ? '#f4f7f6' : '#62d96b',
                      color: routine.completed ? '#222' : '#fff',
                      border: 'none',
                      padding: '8px',
                      borderRadius: 6,
                      cursor: 'pointer'
                    }}
                  >
                    {routine.completed ? '완료' : '완료하기'}
                  </button>
                </div>
              ))}
            </div>

            {showAddRoutineModal && (
              <AddRoutineModal
                isOpen={showAddRoutineModal}
                onClose={() => {
                  setShowAddRoutineModal(false);
                  setEditingRoutine(null);
                }}
                onAdd={handleAddRoutine}
                editingRoutine={editingRoutine}
                customTags={customTags}
              />
            )}
          </div>
        );
      case 'calendar':
        return <Calendar routines={routines} />;
      case 'statistic':
        return <Statistics routines={routines} customTags={customTags} />;
      case 'tags':
        return <Tags routines={routines} onAddTag={handleAddTag} customTags={customTags} />;
      default:
        return <div>Today View</div>;
    }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="responsive-container" style={{ margin: '40px auto 0' }}>
        {/* Tabs */}
        <div style={{
          display: 'flex',
          background: '#f7f7f7',
          borderRadius: 6,
          overflow: 'hidden',
          width: 'fit-content',
          marginBottom: 24
        }}>
          {['today', 'calendar', 'statistic', 'tags'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#fff' : 'transparent',
                border: 'none',
                padding: '10px 24px',
                fontWeight: 500,
                fontSize: 16,
                color: activeTab === tab ? '#222' : '#888',
                cursor: 'pointer'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;