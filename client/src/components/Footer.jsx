export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: '#fff',
      borderTop: '1px solid #eee',
      padding: '28px 0 10px 0',
      marginTop: 60,
      textAlign: 'center',
      color: '#888',
      fontSize: 15
    }}>
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontWeight: 600, fontSize: 17, color: '#222', marginRight: 10 }}>
          <span style={{ fontSize: 18, marginRight: 5 }}>🏅</span>Stepi
        </span>
        <span style={{ margin: '0 18px' }}>Features</span>
        <span style={{ margin: '0 18px' }}>About</span>
        <span style={{ margin: '0 18px' }}>Privacy</span>
        <span style={{ margin: '0 18px' }}>Terms</span>
        <span style={{ margin: '0 18px' }}>Contact</span>
      </div>
      <div>
        © 2025 Stepi. All rights reserved.
      </div>
    </footer>
  );
}