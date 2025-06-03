import React, { useState } from 'react';

// 왼쪽 프로필/레벨/업적 데이터는 ProfileStatistics와 재사용 가능
const achievements = [
  { label: "Early Bird", desc: "Complete 5 tasks before 9 AM", achieved: true },
  { label: "Consistent", desc: "5-day streak of completing all tasks", achieved: true },
  { label: "Goal Crusher", desc: "Complete 50 tasks (32/50)", achieved: false },
];

// 오른쪽: 최근 활동 타임라인
const activities = [
  {
    time: "Today at 9:32 AM",
    type: "completed",
    desc: "Completed task: Apply for 2 jobs",
    detail: "+50 XP · Career",
  },
  {
    time: "Today at 8:15 AM",
    type: "completed",
    desc: "Completed task: Read for 30 minutes",
    detail: "+20 XP · Personal",
  },
  {
    time: "Yesterday at 5:45 PM",
    type: "added",
    desc: "Added new task: Update LinkedIn profile",
    detail: "Career · Monthly",
  },
  {
    time: "Yesterday at 2:30 PM",
    type: "completed",
    desc: "Completed task: Drink 2L of water",
    detail: "+10 XP · Health",
  }
];

const ProfileTaskHistory = () => {
  const [tab, setTab] = useState("history");

  return (
    <div style={{ display: 'flex', gap: 22, minHeight: '100vh', background: '#fff', padding: 36 }}>
      {/* Left Sidebar */}
      <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Profile Card */}
        <div style={{
          background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 28, textAlign: 'center'
        }}>
          <div style={{
            width: 70, height: 70, borderRadius: '50%', background: '#eee', margin: '0 auto 12px auto'
          }}></div>
          <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 2 }}>John Doe</div>
          <div style={{ color: '#888', fontSize: 16, marginBottom: 12 }}>Job Seeker</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            <span style={{
              background: '#f8f8f8', borderRadius: 16, padding: '3px 13px', fontWeight: 600, fontSize: 15, color: '#444', border: '1px solid #eee'
            }}>Level 3</span>
            <span style={{
              background: '#f8f8f8', borderRadius: 16, padding: '3px 13px', fontWeight: 600, fontSize: 15, color: '#444', border: '1px solid #eee'
            }}>Joined May 2025</span>
          </div>
        </div>
        {/* Level Progress */}
        <div style={{
          background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 22,
        }}>
          <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 10 }}>Level Progress</div>
          <div style={{ fontSize: 15, marginBottom: 4 }}>Level 3 <span style={{ float: 'right' }}>450/1000 XP</span></div>
          <div style={{
            background: '#f4f7f6', borderRadius: 7, height: 8, width: '100%', margin: '8px 0 16px 0', overflow: 'hidden'
          }}>
            <div style={{ height: '100%', width: '45%', background: '#62d96b', borderRadius: 7 }}></div>
          </div>
          <div style={{ color: '#888', fontSize: 14, marginBottom: 3 }}>
            Next reward: <span style={{ color: '#222', fontWeight: 500 }}>Premium Badge</span>
          </div>
          <div style={{ color: '#888', fontSize: 14 }}>
            XP needed: <span style={{ color: '#222', fontWeight: 500 }}>550 XP</span>
          </div>
        </div>
        {/* Achievements */}
        <div style={{
          background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 22
        }}>
          <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 10 }}>Achievements</div>
          {achievements.map(a => (
            <div key={a.label} style={{
              display: 'flex', alignItems: 'center', gap: 10, color: a.achieved ? '#62d96b' : '#bbb',
              fontWeight: a.achieved ? 600 : 500, marginBottom: 8, fontSize: 16
            }}>
              <span style={{
                width: 22, display: 'inline-block', textAlign: 'center', fontSize: 18
              }}>{a.achieved ? '✔' : '○'}</span>
              <span>
                <span style={{ fontWeight: 600 }}>{a.label}</span>
                <div style={{
                  fontWeight: 400, color: a.achieved ? '#7fbf87' : '#bbb', fontSize: 15, marginTop: 2
                }}>{a.desc}</div>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 22 }}>
          <button
            onClick={() => setTab('statistics')}
            style={{
              background: tab === 'statistics' ? '#fff' : '#f7f7f7',
              border: '1px solid #eee',
              borderBottom: tab === 'statistics' ? 'none' : '1px solid #eee',
              fontWeight: 500,
              fontSize: 17,
              padding: '10px 36px',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              color: '#222',
              outline: 'none',
              cursor: 'pointer'
            }}
          >Statistics</button>
          <button
            onClick={() => setTab('history')}
            style={{
              background: tab === 'history' ? '#fff' : '#f7f7f7',
              border: '1px solid #eee',
              borderBottom: tab === 'history' ? 'none' : '1px solid #eee',
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
          >Task History</button>
        </div>
        {/* Task History Content */}
        {tab === 'history' && (
          <div style={{
            background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 36, minHeight: 400
          }}>
            <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 22 }}>Recent Activity</div>
            <div>
              {activities.map((a, idx) => (
                <div key={idx} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 30
                }}>
                  {/* 아이콘 */}
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', border: a.type === 'completed' ? '2.5px solid #62d96b' : '2.5px solid #bbb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4
                  }}>
                    {a.type === 'completed' ? <span style={{ color: '#62d96b', fontSize: 22 }}>✔</span> : <span style={{ color: '#bbb', fontSize: 22 }}>＋</span>}
                  </div>
                  {/* 내용 */}
                  <div>
                    <div style={{ color: '#888', fontSize: 15 }}>{a.time}</div>
                    <div style={{ fontWeight: 700, fontSize: 17, margin: '2px 0 2px 0', color: '#222' }}>{a.desc}</div>
                    <div style={{ fontSize: 15, color: '#888', marginBottom: 2 }}>{a.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'statistics' && (
          <div style={{ color: "#888", fontSize: 20, marginTop: 50, textAlign: 'center' }}>
            Statistics feature is available in the previous tab.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTaskHistory;