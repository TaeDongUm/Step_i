import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [post, setPost] = useState(null);

    // 게시글 데이터 로드
    useEffect(() => {
        const savedPosts = localStorage.getItem('communityPosts');
        if (savedPosts) {
            const posts = JSON.parse(savedPosts);
            const foundPost = posts.find(p => p.id === parseInt(id));
            if (foundPost) {
                setPost(foundPost);
            } else {
                // 게시글을 찾을 수 없는 경우 목록으로 이동
                navigate('/community');
            }
        }
    }, [id, navigate]);

    const handleAddComment = (parentId = null) => {
        if (!newComment.trim() || !post) return;

        const comment = {
            id: Date.now(),
            author: '현재사용자', // 실제로는 로그인한 사용자 정보를 사용해야 함
            content: newComment,
            date: new Date().toISOString().split('T')[0],
            replies: []
        };

        // localStorage에서 게시글 목록을 가져옴
        const savedPosts = localStorage.getItem('communityPosts');
        if (savedPosts) {
            const posts = JSON.parse(savedPosts);
            const updatedPosts = posts.map(p => {
                if (p.id === post.id) {
                    if (parentId) {
                        // 대댓글 추가
                        return {
                            ...p,
                            comments: p.comments.map(c => {
                                if (c.id === parentId) {
                                    return {
                                        ...c,
                                        replies: [...c.replies, comment]
                                    };
                                }
                                return c;
                            })
                        };
                    } else {
                        // 새 댓글 추가
                        return {
                            ...p,
                            comments: [...p.comments, comment]
                        };
                    }
                }
                return p;
            });

            // localStorage 업데이트
            localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));

            // 현재 게시글 상태 업데이트
            const updatedPost = updatedPosts.find(p => p.id === post.id);
            if (updatedPost) {
                setPost(updatedPost);
            }
        }

        setNewComment('');
        setReplyTo(null);
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    const renderComments = (comments, isReply = false) => {
        return comments.map(comment => (
            <div key={comment.id} style={{ marginLeft: isReply ? '40px' : '0' }}>
                <div style={{
                    padding: '16px',
                    background: '#f4f7f6',
                    borderRadius: '8px',
                    marginBottom: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ fontWeight: '600' }}>{comment.author}</div>
                        <div style={{ color: '#888', fontSize: '14px' }}>{comment.date}</div>
                    </div>
                    <div style={{ marginBottom: '12px' }}>{comment.content}</div>
                    {!isReply && (
                        <button
                            onClick={() => setReplyTo(comment.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#62d96b',
                                cursor: 'pointer',
                                padding: '0',
                                fontSize: '14px'
                            }}
                        >
                            답글 달기
                        </button>
                    )}
                </div>
                {replyTo === comment.id && (
                    <div style={{ marginBottom: '12px' }}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="답글을 입력하세요"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                marginBottom: '8px',
                                resize: 'vertical'
                            }}
                        />
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setReplyTo(null)}
                                style={{
                                    padding: '8px 16px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    background: '#fff',
                                    cursor: 'pointer'
                                }}
                            >
                                취소
                            </button>
                            <button
                                onClick={() => handleAddComment(comment.id)}
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    background: '#62d96b',
                                    color: '#fff',
                                    cursor: 'pointer'
                                }}
                            >
                                답글 작성
                            </button>
                        </div>
                    </div>
                )}
                {comment.replies && renderComments(comment.replies, true)}
            </div>
        ));
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

                <div style={{
                    padding: '24px',
                    background: '#fff',
                    border: '1px solid #eee',
                    borderRadius: '12px',
                    marginBottom: '24px'
                }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                        {post.title}
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div style={{ color: '#888' }}>
                            작성자: {post.author} • {post.date}
                        </div>
                    </div>
                    <div style={{ marginBottom: '24px' }}>{post.content}</div>
                </div>

                {/* 댓글 섹션 */}
                <div style={{ marginTop: '32px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>댓글</h3>
                    {renderComments(post.comments)}

                    {/* 새 댓글 작성 폼 */}
                    <div style={{ marginTop: '24px' }}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력하세요"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                marginBottom: '8px',
                                resize: 'vertical'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => handleAddComment()}
                                style={{
                                    padding: '8px 24px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    background: '#62d96b',
                                    color: '#fff',
                                    cursor: 'pointer'
                                }}
                            >
                                댓글 작성
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail; 