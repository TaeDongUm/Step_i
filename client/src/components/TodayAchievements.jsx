import React, { useState } from 'react';
 
// 더미 데이터: 여러 회원의 오늘 업적
const initialAchievements = [
  {
    id: 1,
    user: 'jobseeker01',
    time: '2025-05-24 09:32',
    content: 'Apply for 2 jobs',
    category: 'Career',
    likes: 2
  },
  {
    id: 2,
    user: 'sally',
    time: '2025-05-24 08:15',
    content: 'Read for 30 minutes',
    category: 'Personal',
    likes: 1
  },
  {
    id: 3,
    user: 'me',
    time: '2025-05-24 07:50',
    content: 'Drink 2L of water',
    category: 'Health',
    likes: 0
  },
  {
    id: 4,
    user: 'devkim',
    time: '2025-05-24 07:10',
    content: 'Practice coding',
    category: 'Skill',
    likes: 3
  }
];

const TodayAchievements = () => {
  const [achievements, setAchievements] = useState(initialAchievements);
  const handleLike = (id) => {
    setAchievements(achs => achs.map(a => a.id === id ? { ...a, likes: a.likes + 1 } : a));
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: 36 }}>
      <div style={{ fontWeight: 700, fontSize: 20, color: '#62d96b', marginBottom: 18, textAlign: 'center' }}>
        여러분의 하루는 어떠신가요? 작은 발자취를 남겨보세요!
      </div>
      <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 18, textAlign: 'center' }}>오늘 이룬 것들</h1>
      <div style={{ color: '#888', fontSize: 17, marginBottom: 24, textAlign: 'center' }}>
        오늘({new Date().getFullYear()}.{String(new Date().getMonth()+1).padStart(2,'0')}.{String(new Date().getDate()).padStart(2,'0')})에 회원들이 이룬 루틴/업적을 실시간으로 확인하세요.
      </div>
      {achievements.length === 0 ? (
        <div style={{ color: '#bbb', fontSize: 18, textAlign: 'center', margin: '40px 0' }}>
          오늘 완료한 항목이 없습니다.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {achievements.sort((a, b) => b.time.localeCompare(a.time)).map(a => (
            <div key={a.id} style={{
              background: '#f8f8f8', borderRadius: 10, padding: '18px 20px', border: '1px solid #eee',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 2 }}>
                  <span style={{ color: '#4d8ee1' }}>{a.user}</span>
                  <span style={{ color: '#bbb', fontWeight: 400, fontSize: 14, marginLeft: 10 }}>{a.time}</span>
                </div>
                <div style={{ fontSize: 16, color: '#222', marginBottom: 2 }}>{a.content}</div>
                <div style={{ fontSize: 14, color: '#888' }}>{a.category}</div>
              </div>
              <button onClick={() => handleLike(a.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: 18
              }}>
                <span role="img" aria-label="like" style={{ fontSize: 24, marginRight: 4 }}>👍</span>
                <span style={{ fontWeight: 600, color: '#62d96b', fontSize: 16 }}>{a.likes}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayAchievements;
