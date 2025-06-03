import React from 'react';

const defaultTags = ['건강', '학습', '운동'];

const Statistics = ({ routines, customTags = [] }) => {
    const calculateTagStats = () => {
        const tagStats = {};
        const allTags = [...defaultTags, ...customTags];
        const totalRoutines = routines.length;

        allTags.forEach(tag => {
            const tagRoutines = routines.filter(r => r.category === tag);
            tagStats[tag] = {
                total: tagRoutines.length,
                completed: tagRoutines.filter(r => r.completed).length,
                totalRoutines: totalRoutines
            };
        });

        return Object.entries(tagStats)
            .map(([tag, stats]) => ({
                tag,
                ...stats,
                completionRate: stats.totalRoutines === 0 ? 0 : Math.round((stats.completed / stats.totalRoutines) * 100)
            }))
            .sort((a, b) => b.completed - a.completed)
            .slice(0, 5);
    };

    const calculateTotalStats = () => {
        const total = routines.length;
        const completed = routines.filter(r => r.completed).length;
        const totalXp = routines.reduce((sum, r) => sum + (r.completed ? r.xp : 0), 0);

        return {
            total,
            completed,
            completionRate: total ? Math.round((completed / total) * 100) : 0,
            totalXp
        };
    };

    const topTags = calculateTagStats();
    const totalStats = calculateTotalStats();

    return (
        <div>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>통계</h2>

            {/* 전체 통계 */}
            <div style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 12,
                padding: 24,
                marginBottom: 24
            }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>전체 통계</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>전체 루틴</div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>{totalStats.total}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>완료한 루틴</div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>{totalStats.completed}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>완료율</div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>{totalStats.completionRate}%</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>획득한 XP</div>
                        <div style={{ fontSize: 24, fontWeight: 600 }}>{totalStats.totalXp}</div>
                    </div>
                </div>
            </div>

            {/* 태그별 통계 */}
            <div style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 12,
                padding: 24
            }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>태그별 통계</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {topTags.map(({ tag, total, completed, completionRate, totalRoutines }) => (
                        <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <div style={{ fontWeight: 500 }}>{tag}</div>
                                    <div style={{ color: '#888' }}>{completionRate}%</div>
                                </div>
                                <div style={{
                                    height: 6,
                                    background: '#f4f4f4',
                                    borderRadius: 3,
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${completionRate}%`,
                                        height: '100%',
                                        background: completionRate >= 75 ? '#62d96b' :
                                            completionRate >= 50 ? '#ffd54f' :
                                                completionRate >= 25 ? '#ffb74d' : '#ef5350',
                                        borderRadius: 3
                                    }} />
                                </div>
                            </div>
                            <div style={{ color: '#888', fontSize: 14 }}>
                                {completed}/{totalRoutines}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Statistics; 