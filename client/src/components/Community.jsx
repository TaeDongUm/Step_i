import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Community = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // localStorage에서 게시글 목록을 가져옴
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('communityPosts');
    return savedPosts ? JSON.parse(savedPosts) : [
      {
        id: 1,
        title: '첫 번째 게시글',
        content: '내용...',
        author: '작성자1',
        date: '2024-03-15',
        comments: []
      }
    ];
  });

  // 게시글이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('communityPosts', JSON.stringify(posts));
  }, [posts]);

  // 현재 페이지의 게시글만 표시
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="responsive-container">
      <div className="content">
        <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>커뮤니티</h1>

        {/* 게시글 목록 */}
        <div style={{ marginBottom: '24px' }}>
          {currentPosts.map(post => (
            <Link
              to={`/community/post/${post.id}`}
              key={post.id}
              style={{
                display: 'block',
                padding: '16px',
                border: '1px solid #eee',
                borderRadius: '8px',
                marginBottom: '12px',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
                {post.title}
              </h2>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {post.author} • {post.date}
              </div>
            </Link>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '80px' // 글 작성 버튼을 위한 여백
        }}>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              style={{
                padding: '8px 12px',
                border: '1px solid #eee',
                borderRadius: '4px',
                background: currentPage === number ? '#62d96b' : 'white',
                color: currentPage === number ? 'white' : 'inherit',
                cursor: 'pointer'
              }}
            >
              {number}
            </button>
          ))}
        </div>

        {/* 글 작성 버튼 */}
        <Link
          to="/community/write"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#62d96b',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '24px',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>✏️</span>
          글 작성하기
        </Link>
      </div>
    </div>
  );
};

export default Community;