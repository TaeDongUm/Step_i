import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WritePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        // localStorage에서 기존 게시글 목록을 가져옴
        const savedPosts = localStorage.getItem('communityPosts');
        const posts = savedPosts ? JSON.parse(savedPosts) : [];

        // 새 게시글 생성
        const newPost = {
            id: Date.now(),
            title,
            content,
            author: '현재사용자', // 실제로는 로그인한 사용자 정보를 사용해야 함
            date: new Date().toISOString().split('T')[0],
            comments: []
        };

        // 새 게시글을 목록에 추가하고 localStorage에 저장
        const updatedPosts = [newPost, ...posts];
        localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));

        // 작성 완료 후 목록으로 이동
        navigate('/community');
    };

    return (
        <div className="responsive-container">
            <div className="content">
                <button
                    onClick={() => navigate('/community')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#888',
                        cursor: 'pointer',
                        padding: '0',
                        marginBottom: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    ← 목록으로 돌아가기
                </button>

                <form onSubmit={handleSubmit}>
                    <div style={{
                        padding: '24px',
                        background: '#fff',
                        border: '1px solid #eee',
                        borderRadius: '12px'
                    }}>
                        <div style={{ marginBottom: '16px' }}>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="내용을 입력하세요"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    minHeight: '300px',
                                    resize: 'vertical',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button
                                type="button"
                                onClick={() => navigate('/community')}
                                style={{
                                    padding: '12px 24px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    background: '#fff',
                                    cursor: 'pointer'
                                }}
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                style={{
                                    padding: '12px 24px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    background: '#62d96b',
                                    color: '#fff',
                                    cursor: 'pointer'
                                }}
                            >
                                작성하기
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WritePost; 