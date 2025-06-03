import React, { useState } from 'react';

// 더미 데이터
const calendarData = {
  '2025-05-01': [{ title: 'Drink 2L of water', category: 'Health', xp: 10 }],
  '2025-05-02': [{ title: 'Drink 2L of water', category: 'Health', xp: 10 }],
  '2025-05-03': [{ title: 'Drink 2L of water', category: 'Health', xp: 10 }],
  '2025-05-05': [{ title: 'Drink 2L of water', category: 'Health', xp: 10 }],
  '2025-05-08': [{ title: 'Drink 2L of water', category: 'Health', xp: 10 }],
  '2025-05-10': [{ title: 'Drink 2L of water', category: 'Health', xp: 10 }],
  '2025-05-12': [
    { title: 'Drink 2L of water', category: 'Health', xp: 10 },
    { title: 'Apply for 2 jobs', category: 'Career', xp: 50 },
    { title: 'Read for 30 minutes', category: 'Personal', xp: 20 }
  ]
};

const getMonthDays = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState('2025-05-12');
  const [currentMonth, setCurrentMonth] = useState(4); // 0-indexed (May)
  const [currentYear, setCurrentYear] = useState(2025);

  const days = getMonthDays(currentYear, currentMonth);
  const today = new Date();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(y => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(y => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  // 달력에서 각 날짜가 완료된 날인지 확인
  const getDateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const completedDays = Object.keys(calendarData);

  // 월별 통계 계산
  const activeDays = completedDays.filter(d => d.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`)).length;
  const completedTasks = completedDays.reduce(
    (acc, d) => d.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`) ? acc + calendarData[d].length : acc, 0
  );
  const xpEarned = completedDays.reduce(
    (acc, d) => d.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`) ? acc + calendarData[d].reduce((sum, t) => sum + t.xp, 0) : acc, 0
  );

  // 선택일 태스크
  const tasks = calendarData[selectedDate] || [];
  const totalXP = tasks.reduce((sum, t) => sum + t.xp, 0);

  // 달력 첫 요일 맞추기
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const totalCells = Math.ceil((days.length + firstDayOfWeek) / 7) * 7;
  const calendarCells = [];
  for(let i=0; i<totalCells; i++) {
    if(i < firstDayOfWeek || i >= days.length + firstDayOfWeek) {
      calendarCells.push(null);
    } else {
      calendarCells.push(days[i - firstDayOfWeek]);
    }
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: 32, display: 'flex', gap: 40 }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontWeight: 700, fontSize: 38, marginBottom: 10 }}>Calendar</h1>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 36, marginTop: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 6 }}>Task History</div>
          <div style={{ color: '#888', fontSize: 16, marginBottom: 24 }}>View your completed tasks by date</div>
          <div style={{ width: 600 }}>
            {/* 달력 헤더 */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 12, gap: 18 }}>
              <button onClick={handlePrevMonth} style={{ border: 'none', background: 'none', fontSize: 22, cursor: 'pointer' }}>{'<'}</button>
              <span style={{ fontSize: 20, fontWeight: 600 }}>
                {today.toLocaleString('en-US', { month: 'long' , year: 'numeric', timeZone: 'UTC' }).replace(
                  today.getFullYear(), currentYear).replace(
                  today.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }), 
                  new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })
                )}
              </span>
              <button onClick={handleNextMonth} style={{ border: 'none', background: 'none', fontSize: 22, cursor: 'pointer' }}>{'>'}</button>
            </div>
            {/* 요일 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', color: '#888', fontWeight: 500, marginBottom: 5 }}>
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            {/* 날짜 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {calendarCells.map((d, idx) => (
                d ? (
                  <button
                    key={idx}
                    style={{
                      width: 38, height: 38, borderRadius: 7,
                      background: getDateKey(d) === selectedDate ? '#eee' : completedDays.includes(getDateKey(d)) ? '#62d96b' : 'transparent',
                      color: completedDays.includes(getDateKey(d)) ? '#fff' : '#222',
                      border: getDateKey(d) === selectedDate ? '1.5px solid #bbb' : 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 16
                    }}
                    onClick={() => setSelectedDate(getDateKey(d))}
                  >{d.getDate()}</button>
                ) : <div key={idx}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 우측 사이드 */}
      <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 6 }}>
            {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
          </div>
          <div style={{ color: '#888', fontSize: 14, marginBottom: 14 }}>Completed Tasks</div>
          <div>
            {tasks.length === 0 && (
              <div style={{ color: '#888', fontSize: 16 }}>No completed tasks.</div>
            )}
            {tasks.map((t, i) => (
              <div key={i} style={{
                background: '#f8f8f8', borderRadius: 8, padding: '10px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{t.title}</div>
                  <div style={{
                    background: '#fff', color: '#222', borderRadius: 10, fontSize: 13, padding: '2px 10px', fontWeight: 500, display: 'inline-block', marginTop: 2, border: '1px solid #eee'
                  }}>{t.category}</div>
                </div>
                <div style={{
                  background: '#62d96b', color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 15, padding: '3px 13px', marginLeft: 18
                }}>+{t.xp} XP</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #eee', margin: '10px 0', height: 0 }}></div>
          <div style={{ fontWeight: 600, fontSize: 17, textAlign: 'right', marginTop: 6 }}>
            Total XP gained: <span style={{ color: '#222' }}>{totalXP} XP</span>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Monthly Stats</div>
          <div style={{ fontSize: 16, marginBottom: 5 }}>
            <span style={{ color: '#888' }}>Days active:</span> <span style={{ fontWeight: 600 }}>{activeDays}/{days.length}</span>
          </div>
          <div style={{ fontSize: 16, marginBottom: 5 }}>
            <span style={{ color: '#888' }}>Tasks completed:</span> <span style={{ fontWeight: 600 }}>{completedTasks}</span>
          </div>
          <div style={{ fontSize: 16 }}>
            <span style={{ color: '#888' }}>XP earned:</span> <span style={{ fontWeight: 600 }}>{xpEarned}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;