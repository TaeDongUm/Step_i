import React, { useState } from 'react';

const TAGS = ['health', 'exercise', 'study', 'part-time job', 'daily', 'etc'];

function RoutineCreatePersonal() {
  const [task, setTask] = useState('');
  const [tag, setTag] = useState('');
  const [createdAt, setCreatedAt] = useState(null);
  const [canComplete, setCanComplete] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [xp, setXp] = useState(0);

  // 최소 10초 후에 할일완료 버튼 활성화(예시)
  const handleCreate = () => {
    setCreatedAt(Date.now());
    setCanComplete(false);
    setCompleted(false);
    setTimeout(() => setCanComplete(true), 10000);
  };

  const handleComplete = () => {
    setCompleted(true);
    setXp(50); // 예시 경험치
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: 32 }}>
      <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 18 }}>개인 루틴 만들기</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="할 일을 입력하세요"
          style={{ width: '100%', fontSize: 16, padding: 10, borderRadius: 6, border: '1px solid #ddd', marginBottom: 10 }}
        />
        <select value={tag} onChange={e => setTag(e.target.value)} style={{ width: '100%', fontSize: 16, padding: 10, borderRadius: 6, border: '1px solid #ddd' }}>
          <option value="">태그 선택</option>
          {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <button
        onClick={handleCreate}
        disabled={!task || !tag || createdAt}
        style={{ width: '100%', background: '#62d96b', color: '#fff', fontWeight: 600, fontSize: 17, border: 'none', borderRadius: 6, padding: '13px 0', cursor: (!task || !tag || createdAt) ? 'not-allowed' : 'pointer', marginBottom: 16 }}
      >
        루틴 생성
      </button>
      {createdAt && !completed && (
        <button
          onClick={handleComplete}
          disabled={!canComplete}
          style={{ width: '100%', background: canComplete ? '#62d96b' : '#bbb', color: '#fff', fontWeight: 600, fontSize: 17, border: 'none', borderRadius: 6, padding: '13px 0', cursor: canComplete ? 'pointer' : 'not-allowed', marginBottom: 16 }}
        >
          할일완료
        </button>
      )}
      {completed && (
        <div style={{ color: '#62d96b', fontWeight: 700, fontSize: 18, marginTop: 10 }}>
          완료! +{xp} XP 획득
        </div>
      )}
    </div>
  );
}

function RoutineCreateTogether() {
  // 방 개설, 참여, 인원, 제한시간 등 로직 (더미 UI)
  const [roomOpen, setRoomOpen] = useState(false);
  const [maxTime, setMaxTime] = useState(30);
  const [maxPeople, setMaxPeople] = useState(2);
  const [joined, setJoined] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allReady, setAllReady] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [xp, setXp] = useState(0);
  const [bonus, setBonus] = useState(0);

  const handleOpenRoom = () => {
    setRoomOpen(true);
    setJoined(true);
    setTasks([]);
    setAllReady(false);
    setCompleted(false);
    setXp(0);
    setBonus(0);
  };

  const handleJoin = () => setJoined(true);
  const handleSetTask = () => setAllReady(true);
  const handleComplete = () => {
    setCompleted(true);
    setXp(50);
    setBonus(30);
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: 32 }}>
      <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 18 }}>함께 루틴 만들기</h2>
      {!roomOpen ? (
        <div>
          <div style={{ marginBottom: 10 }}>
            최대 방 유지 시간(분):
            <input type="number" min={5} max={120} value={maxTime} onChange={e => setMaxTime(Number(e.target.value))} style={{ width: 60, marginLeft: 8 }} />
          </div>
          <div style={{ marginBottom: 10 }}>
            최대 인원(2~6명):
            <input type="number" min={2} max={6} value={maxPeople} onChange={e => setMaxPeople(Number(e.target.value))} style={{ width: 40, marginLeft: 8 }} />
          </div>
          <button onClick={handleOpenRoom} style={{ width: '100%', background: '#62d96b', color: '#fff', fontWeight: 600, fontSize: 17, border: 'none', borderRadius: 6, padding: '13px 0', cursor: 'pointer', marginBottom: 16 }}>
            방 개설하기
          </button>
        </div>
      ) : !joined ? (
        <button onClick={handleJoin} style={{ width: '100%', background: '#62d96b', color: '#fff', fontWeight: 600, fontSize: 17, border: 'none', borderRadius: 6, padding: '13px 0', cursor: 'pointer', marginBottom: 16 }}>
          방 참여하기
        </button>
      ) : !allReady ? (
        <div>
          <div style={{ marginBottom: 10 }}>
            할일/루틴을 입력하세요 (모든 인원이 입력해야 시작 가능)
          </div>
          <button onClick={handleSetTask} style={{ width: '100%', background: '#62d96b', color: '#fff', fontWeight: 600, fontSize: 17, border: 'none', borderRadius: 6, padding: '13px 0', cursor: 'pointer', marginBottom: 16 }}>
            할일 설정 완료
          </button>
        </div>
      ) : !completed ? (
        <button onClick={handleComplete} style={{ width: '100%', background: '#62d96b', color: '#fff', fontWeight: 600, fontSize: 17, border: 'none', borderRadius: 6, padding: '13px 0', cursor: 'pointer', marginBottom: 16 }}>
          할일 함께 시작하기
        </button>
      ) : (
        <div style={{ color: '#62d96b', fontWeight: 700, fontSize: 18, marginTop: 10 }}>
          완료! +{xp} XP, +{bonus} XP(함께 보너스)
        </div>
      )}
    </div>
  );
}

const RoutineCreate = () => {
  const [tab, setTab] = useState('personal');
  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <div style={{ display: 'flex', gap: 0, marginBottom: 22 }}>
        <button
          onClick={() => setTab('personal')}
          style={{
            background: tab === 'personal' ? '#fff' : '#f7f7f7',
            border: '1px solid #eee',
            borderBottom: tab === 'personal' ? 'none' : '1px solid #eee',
            fontWeight: 500,
            fontSize: 17,
            padding: '10px 36px',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            color: '#222',
            outline: 'none',
            cursor: 'pointer'
          }}
        >개인</button>
        <button
          onClick={() => setTab('together')}
          style={{
            background: tab === 'together' ? '#fff' : '#f7f7f7',
            border: '1px solid #eee',
            borderBottom: tab === 'together' ? 'none' : '1px solid #eee',
            fontWeight: 500,
            fontSize: 17,
            padding: '10px 36px',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            color: '#222',
            outline: 'none',
            cursor: 'pointer',
            marginLeft: -1
          }}
        >함께</button>
      </div>
      {tab === 'personal' ? <RoutineCreatePersonal /> : <RoutineCreateTogether />}
    </div>
  );
};

export default RoutineCreate;
