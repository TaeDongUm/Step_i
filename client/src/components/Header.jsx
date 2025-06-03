import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/register'];
  if (hideHeaderRoutes.includes(location.pathname)) return null;

  return (
    <header style={{
      width: '100%',
      height: 44,
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{
        fontWeight: 700,
        fontSize: 17,
        display: 'flex',
        alignItems: 'center',
        flex: 1
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/stepi_logo1.png" alt="Stepi Logo" style={{ height: 30, marginRight: 10 }} />
        </Link>
      </div>
      <nav style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
        <Link to="/today" style={{ color: '#000', textDecoration: 'none', fontSize: 14 }}>오늘 이룬 것들</Link>
        <Link to="/community" style={{ color: '#000', textDecoration: 'none', fontSize: 14 }}>커뮤니티</Link>
        <Link to="/dashboard" style={{ color: '#000', textDecoration: 'none', fontSize: 14 }}>나의 루틴</Link>
        <Link to="/routine-create" style={{ color: '#000', textDecoration: 'none', fontSize: 14 }}>루틴 만들기</Link>
        <Link to="/profile" style={{ color: '#000', textDecoration: 'none', fontSize: 14 }}>나의 발자취</Link>
        <Link to="/login">
          <button style={{
            background: '#fff',
            color: '#62d96b',
            border: 'none',
            fontWeight: 600,
            borderRadius: 6,
            padding: '5px 14px',
            fontSize: 14,
            cursor: 'pointer'
          }}>로그인</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

export function HeroSection() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#62d96b', // 내비게이션바 색상으로 배경 설정
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff'
    }}>
      {/* 왼쪽 텍스트 섹션 */}
      <div style={{ flex: 1, paddingRight: 20 }}>
        <h1 style={{
          fontWeight: 700,
          fontSize: 46,
          margin: '0 0 12px 0',
          lineHeight: 1.15
        }}>
          Build better <span style={{ color: '#fff' }}>habits</span>
        </h1>
        <p style={{
          fontSize: 18,
          marginBottom: 20,
          lineHeight: 1.6
        }}>
          Try our habit tracker to stay consistent and reach your goals.
        </p>
        <Link to="/register">
          <button style={{
            background: '#fff',
            color: '#62d96b',
            border: 'none',
            fontWeight: 600,
            borderRadius: 6,
            padding: '10px 20px',
            fontSize: 16,
            cursor: 'pointer'
          }}>
            Get started
          </button>
        </Link>
      </div>

      {/* 오른쪽 이미지 섹션 */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <img src="/main_habit_image.png" alt="Habit Tracker" style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
        }} />
      </div>
    </div>
  );
}