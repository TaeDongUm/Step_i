import React, { useState } from 'react';

const Calendar = ({ routines }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState('week');

    const getWeekDates = (date) => {
        const start = new Date(date);
        start.setDate(date.getDate() - date.getDay());
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const newDate = new Date(start);
            newDate.setDate(start.getDate() + i);
            dates.push(newDate);
        }
        return dates;
    };

    const getMonthDates = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const dates = [];

        // Add previous month's dates
        const firstDayOfWeek = firstDay.getDay();
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const date = new Date(year, month, -i);
            dates.push(date);
        }

        // Add current month's dates
        for (let i = 1; i <= lastDay.getDate(); i++) {
            dates.push(new Date(year, month, i));
        }

        // Add next month's dates
        const remainingDays = 42 - dates.length; // 6 rows * 7 days
        for (let i = 1; i <= remainingDays; i++) {
            dates.push(new Date(year, month + 1, i));
        }

        return dates;
    };

    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const navigateWeek = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + (direction * 7));
        setCurrentDate(newDate);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
    };

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const isCurrentMonth = (date) => {
        return date.getMonth() === currentDate.getMonth();
    };

    const getRoutinesForDate = (date) => {
        return routines.filter(routine => {
            const routineDate = new Date(routine.date);
            return routineDate.toDateString() === date.toDateString();
        });
    };

    const calculateCompletionRate = (date) => {
        const dayRoutines = getRoutinesForDate(date);
        if (dayRoutines.length === 0) return 0;
        const completed = dayRoutines.filter(r => r.completed).length;
        return Math.round((completed / dayRoutines.length) * 100);
    };

    const getCompletionColor = (rate) => {
        if (rate <= 25) return '#ffcdd2'; // 연한 붉은색
        if (rate <= 75) return '#fff9c4'; // 노란색
        return '#c8e6c9'; // 초록색
    };

    const renderCompletionCircle = (rate) => {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                position: 'absolute',
                bottom: 8,
                right: 8
            }}>
                <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: `conic-gradient(${getCompletionColor(rate)} ${rate * 3.6}deg, #f5f5f5 ${rate * 3.6}deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#666'
                }}>
                    {rate}%
                </div>
            </div>
        );
    };

    const renderRoutineList = (date, maxItems = 4) => {
        const dayRoutines = getRoutinesForDate(date);
        const hasMore = dayRoutines.length > maxItems;
        const displayRoutines = dayRoutines.slice(0, maxItems);

        return (
            <div style={{ fontSize: 14, color: '#666' }}>
                {displayRoutines.map(r => (
                    <div key={r.id} style={{
                        marginBottom: 4,
                        textDecoration: r.completed ? 'line-through' : 'none',
                        color: r.completed ? '#888' : '#666'
                    }}>
                        {r.title}
                    </div>
                ))}
                {hasMore && (
                    <div style={{
                        fontSize: 12,
                        color: '#888',
                        marginTop: 2
                    }}>
                        +{dayRoutines.length - maxItems}개 더 보기
                    </div>
                )}
            </div>
        );
    };

    const renderWeeklyView = () => {
        const weekDates = getWeekDates(currentDate);

        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                    <button
                        onClick={() => navigateWeek(-1)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: 24,
                            cursor: 'pointer',
                            color: '#666'
                        }}
                    >
                        ←
                    </button>

                    <div style={{ flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 600 }}>
                        {currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                    </div>

                    <button
                        onClick={() => navigateWeek(1)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: 24,
                            cursor: 'pointer',
                            color: '#666'
                        }}
                    >
                        →
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
                    {weekDates.map((date, index) => {
                        const completionRate = calculateCompletionRate(date);
                        const completionColor = getCompletionColor(completionRate);
                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedDate(date)}
                                style={{
                                    padding: 16,
                                    background: '#fff',
                                    border: '1px solid #eee',
                                    borderRadius: 8,
                                    minHeight: 120,
                                    cursor: 'pointer',
                                    margin: 4,
                                    boxShadow: `0 0 0 4px ${completionColor}`,
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                    marginBottom: 8,
                                    color: isToday(date) ? '#62d96b' : '#222'
                                }}>
                                    {formatDate(date)}
                                </div>
                                <div style={{ marginTop: 8 }}>
                                    {renderRoutineList(date)}
                                </div>
                                {renderCompletionCircle(completionRate)}
                            </div>
                        );
                    })}
                </div>

                {/* Selected Date Routines */}
                <div style={{ marginTop: 24 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
                        {selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}의 루틴
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {getRoutinesForDate(selectedDate).map(routine => (
                            <div
                                key={routine.id}
                                style={{
                                    padding: 16,
                                    border: '1px solid #eee',
                                    borderRadius: 8,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div>
                                    <div style={{
                                        fontSize: 16,
                                        fontWeight: 500,
                                        textDecoration: routine.completed ? 'line-through' : 'none',
                                        color: routine.completed ? '#888' : '#222'
                                    }}>
                                        {routine.title}
                                    </div>
                                    <div style={{ fontSize: 14, color: '#888', marginTop: 4 }}>
                                        {routine.category} • {routine.xp} XP • {routine.estimatedTime}분
                                    </div>
                                </div>
                                <div style={{
                                    padding: '4px 12px',
                                    background: routine.completed ? '#f4f7f6' : '#62d96b',
                                    color: routine.completed ? '#222' : '#fff',
                                    borderRadius: 6,
                                    fontSize: 14,
                                    fontWeight: 500
                                }}>
                                    {routine.completed ? '완료' : '진행중'}
                                </div>
                            </div>
                        ))}
                        {getRoutinesForDate(selectedDate).length === 0 && (
                            <div style={{
                                padding: 24,
                                textAlign: 'center',
                                color: '#888',
                                border: '1px dashed #ddd',
                                borderRadius: 8
                            }}>
                                이 날의 루틴이 없습니다
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderMonthView = () => {
        const monthDates = getMonthDates();

        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                    <button
                        onClick={() => navigateMonth(-1)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: 24,
                            cursor: 'pointer',
                            color: '#666'
                        }}
                    >
                        ←
                    </button>

                    <div style={{ flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 600 }}>
                        {currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                    </div>

                    <button
                        onClick={() => navigateMonth(1)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: 24,
                            cursor: 'pointer',
                            color: '#666'
                        }}
                    >
                        →
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                    {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                        <div
                            key={day}
                            style={{
                                textAlign: 'center',
                                padding: '8px 0',
                                fontWeight: 500,
                                color: '#666'
                            }}
                        >
                            {day}
                        </div>
                    ))}

                    {monthDates.map((date, index) => {
                        const completionRate = calculateCompletionRate(date);
                        const completionColor = getCompletionColor(completionRate);
                        return (
                            <div
                                key={index}
                                onClick={() => setSelectedDate(date)}
                                style={{
                                    padding: '8px',
                                    background: '#fff',
                                    border: '1px solid #eee',
                                    borderRadius: 8,
                                    minHeight: 100,
                                    opacity: isCurrentMonth(date) ? 1 : 0.5,
                                    cursor: 'pointer',
                                    margin: 4,
                                    boxShadow: `0 0 0 4px ${completionColor}`,
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    marginBottom: 4,
                                    color: isToday(date) ? '#62d96b' : '#222'
                                }}>
                                    {date.getDate()}
                                </div>
                                <div style={{ marginTop: 4 }}>
                                    {renderRoutineList(date, 3)}
                                </div>
                                {renderCompletionCircle(completionRate)}
                            </div>
                        );
                    })}
                </div>

                {/* Selected Date Routines */}
                <div style={{ marginTop: 24 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
                        {selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}의 루틴
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {getRoutinesForDate(selectedDate).map(routine => (
                            <div
                                key={routine.id}
                                style={{
                                    padding: 16,
                                    border: '1px solid #eee',
                                    borderRadius: 8,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div>
                                    <div style={{
                                        fontSize: 16,
                                        fontWeight: 500,
                                        textDecoration: routine.completed ? 'line-through' : 'none',
                                        color: routine.completed ? '#888' : '#222'
                                    }}>
                                        {routine.title}
                                    </div>
                                    <div style={{ fontSize: 14, color: '#888', marginTop: 4 }}>
                                        {routine.category} • {routine.xp} XP • {routine.estimatedTime}분
                                    </div>
                                </div>
                                <div style={{
                                    padding: '4px 12px',
                                    background: routine.completed ? '#f4f7f6' : '#62d96b',
                                    color: routine.completed ? '#222' : '#fff',
                                    borderRadius: 6,
                                    fontSize: 14,
                                    fontWeight: 500
                                }}>
                                    {routine.completed ? '완료' : '진행중'}
                                </div>
                            </div>
                        ))}
                        {getRoutinesForDate(selectedDate).length === 0 && (
                            <div style={{
                                padding: 24,
                                textAlign: 'center',
                                color: '#888',
                                border: '1px dashed #ddd',
                                borderRadius: 8
                            }}>
                                이 날의 루틴이 없습니다
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <button
                    onClick={() => setView('week')}
                    style={{
                        background: view === 'week' ? '#62d96b' : '#f7f7f7',
                        color: view === 'week' ? '#fff' : '#666',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 6,
                        marginRight: 8,
                        cursor: 'pointer'
                    }}
                >
                    주간
                </button>
                <button
                    onClick={() => setView('month')}
                    style={{
                        background: view === 'month' ? '#62d96b' : '#f7f7f7',
                        color: view === 'month' ? '#fff' : '#666',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 6,
                        cursor: 'pointer'
                    }}
                >
                    월간
                </button>
            </div>

            {view === 'month' ? renderMonthView() : renderWeeklyView()}
        </div>
    );
};

export default Calendar; 