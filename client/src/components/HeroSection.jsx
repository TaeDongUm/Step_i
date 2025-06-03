import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <>
      <div style={{
        minHeight: '50vh', // 세로 크기를 50%로 줄임
        background: '#62d96b', // 내비게이션바 색상으로 배경 설정
        padding: '20px 20px', // 위쪽 여백 줄임
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff'
      }}>
        {/* 왼쪽 텍스트 섹션 */}
        <div style={{ flex: 1, paddingRight: 20, textAlign: 'center' }}> {/* Center align the left div */}
          <h1 style={{
            fontWeight: 700,
            fontSize: '44.8px', // 글자 크기 20% 감소
            margin: '0 0 12px 0',
            lineHeight: 1.15
          }}>
            나만의<br />
            발자취를 통해<br />
            <span style={{ color: '#fff' }}>성장하세요!</span>
          </h1>
          <p style={{
            fontSize: '16px', // 글자 크기 20% 감소
            marginBottom: 20,
            lineHeight: 1.6
          }}>
            Step(성장)+I(나)와 함께 매일의 작은 성취를 기록하고<br />
            꾸준함을 통해 더 나은 나를 만들어가세요.
          </p>
          <Link to="/register">
            <button style={{
              background: '#fff',
              color: '#62d96b',
              border: 'none',
              fontWeight: 600,
              borderRadius: 6,
              padding: '10px 20px',
              fontSize: 18, // 버튼 글자 크기 유지
              cursor: 'pointer'
            }}>
              시작하기
            </button>
          </Link>
        </div>

        {/* 오른쪽 이미지 섹션 */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <img src="/main_habit_image.png" alt="Habit Tracker" style={{
            maxWidth: '60%', // 이미지 크기 감소
            height: 'auto',
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
          }} />
        </div>
      </div>

      {/* 새로운 설명 섹션 */}
      <div style={{
        background: '#fff', // 배경 흰색
        color: '#009a5d', // 글자 색상 변경
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>이런 걸 할 수 있어요!</h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column', // 세로로 정렬
          gap: '40px',
          marginTop: '40px'
        }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', paddingBottom: '20px', borderBottom: '1px solid #62d96b' }}>
            <h3 style={{ fontSize: '48px', fontWeight: 'bold', margin: 0 }}>01</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>습관 형성</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>작은 습관을 통해 큰 변화를 만들어보세요.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', paddingBottom: '20px', borderBottom: '1px solid #62d96b' }}>
            <h3 style={{ fontSize: '48px', fontWeight: 'bold', margin: 0 }}>02</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>목표 달성</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>매일의 목표를 설정하고 성취를 기록하세요.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', paddingBottom: '20px', borderBottom: '1px solid #62d96b' }}>
            <h3 style={{ fontSize: '48px', fontWeight: 'bold', margin: 0 }}>03</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>커뮤니티</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>다른 사용자들과 경험을 공유하고 동기부여를 얻으세요.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
            <h3 style={{ fontSize: '48px', fontWeight: 'bold', margin: 0 }}>04</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>통계 분석</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>나의 성취를 데이터로 확인하고 분석하세요.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}