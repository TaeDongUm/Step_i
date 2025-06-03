import React, { useState } from 'react';
import CalendarView from './CalendarView'; // Assuming CalendarView is a separate component

const achievements = [
  { label: "Early Bird", desc: "Complete 5 tasks before 9 AM", achieved: true },
  { label: "Consistent", desc: "5-day streak of completing all tasks", achieved: true },
  { label: "Goal Crusher", desc: "Complete 50 tasks (32/50)", achieved: false },
];

const categoryPercentages = [
  { label: "Career", color: "#62d96b", percent: 45 },
  { label: "Health", color: "#ffe16a", percent: 30 },
  { label: "Skill", color: "#5b72ff", percent: 15 },
  { label: "Personal", color: "#4d8ee1", percent: 10 },
];

const ProfileStatistics = () => {
  const [tab, setTab] = useState("statistics");

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
            onClick={() => setTab('calendar')}
            style={{
              background: tab === 'calendar' ? '#fff' : '#f7f7f7',
              border: '1px solid #eee',
              borderBottom: tab === 'calendar' ? 'none' : '1px solid #eee',
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
          >Calendar</button>
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
        {/* Statistics Content */}
        {tab === 'statistics' && (
          <div>
            {/* Top row: streak, completed, XP */}
            <div style={{ display: 'flex', gap: 18, marginBottom: 20 }}>
              <div style={{
                flex: 1, background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center'
              }}>
                <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>Current Streak</div>
                <div style={{ fontWeight: 700, fontSize: 34 }}>5 Days</div>
                <div style={{ color: '#bbb', fontSize: 16 }}>Best: 7 days</div>
              </div>
              <div style={{
                flex: 1, background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center'
              }}>
                <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>Tasks Completed</div>
                <div style={{ fontWeight: 700, fontSize: 34 }}>32</div>
                <div style={{ color: '#bbb', fontSize: 16 }}>This month: 21</div>
              </div>
              <div style={{
                flex: 1, background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center'
              }}>
                <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>Total XP</div>
                <div style={{ fontWeight: 700, fontSize: 34 }}>2,450</div>
                <div style={{ color: '#bbb', fontSize: 16 }}>This week: 450</div>
              </div>
            </div>
            {/* Task Completion Rate */}
            <div style={{
              background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 28, marginBottom: 20
            }}>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Task Completion Rate</div>
              <div style={{ marginBottom: 14 }}>
                Daily Tasks
                <div style={{
                  background: '#f4f7f6', borderRadius: 7, height: 8, width: '100%', margin: '7px 0 2px 0', overflow: 'hidden'
                }}>
                  <div style={{ height: '100%', width: '85%', background: '#62d96b', borderRadius: 7 }}></div>
                </div>
                <span style={{ fontSize: 15, color: '#888', float: 'right', marginTop: -18 }}>85%</span>
              </div>
              <div style={{ marginBottom: 14 }}>
                Monthly Tasks
                <div style={{
                  background: '#f4f7f6', borderRadius: 7, height: 8, width: '100%', margin: '7px 0 2px 0', overflow: 'hidden'
                }}>
                  <div style={{ height: '100%', width: '60%', background: '#62d96b', borderRadius: 7 }}></div>
                </div>
                <span style={{ fontSize: 15, color: '#888', float: 'right', marginTop: -18 }}>60%</span>
              </div>
              <div>
                Yearly Tasks
                <div style={{
                  background: '#f4f7f6', borderRadius: 7, height: 8, width: '100%', margin: '7px 0 2px 0', overflow: 'hidden'
                }}>
                  <div style={{ height: '100%', width: '25%', background: '#62d96b', borderRadius: 7 }}></div>
                </div>
                <span style={{ fontSize: 15, color: '#888', float: 'right', marginTop: -18 }}>25%</span>
              </div>
            </div>
            {/* Category Breakdown */}
            <div style={{
              background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 28
            }}>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Category Breakdown</div>
              {categoryPercentages.map(c => (
                <div key={c.label} style={{
                  display: 'flex', alignItems: 'center', gap: 14, fontSize: 17, fontWeight: 500, marginBottom: 8
                }}>
                  <span style={{
                    width: 14, height: 14, borderRadius: '50%', background: c.color, display: 'inline-block'
                  }}></span>
                  <span style={{ flex: 1 }}>{c.label}</span>
                  <span style={{ fontWeight: 700 }}>{c.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Calendar Content */}
        {tab === 'calendar' && (
          <div style={{ marginTop: 40 }}>
            <CalendarView />
          </div>
        )}
        {/* Task History 탭은 추후 구현 */}
        {tab === 'history' && (
          <div style={{ color: "#888", fontSize: 20, marginTop: 50, textAlign: 'center' }}>
            Task History feature coming soon!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileStatistics;