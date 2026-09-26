import React, { useState } from 'react';
import { explorationNodes } from './data/explorationNodes';

function App() {
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [historyStack, setHistoryStack] = useState([]);

  const node = explorationNodes[currentNodeId] || {
    title: "見つかりません",
    description: "指定されたノードが存在しません。",
    links: ["start"]
  };

  const navigateTo = (nextId) => {
    setHistoryStack((prev) => [...prev, currentNodeId]);
    setCurrentNodeId(nextId);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (historyStack.length > 0) {
      const prevId = historyStack[historyStack.length - 1];
      setHistoryStack((prev) => prev.slice(0, prev.length - 1));
      setCurrentNodeId(prevId);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#f7f9fc',
      color: '#333',
      margin: 0,
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '100vh',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        background: '#ffffff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        boxSizing: 'border-box',
        marginTop: '20px',
        marginBottom: '20px'
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          color: '#2c3e50',

          marginTop: '0',
          textAlign: 'center',
          marginBottom: '24px'
        }}>☀️ 日焼け止めを塗っても焼けるのはなぜ？</h1>

        {historyStack.length > 0 && (
          <button 
            onClick={goBack}
            style={{
              background: '#edf2f7',
              border: '1px solid #cbd5e0',
              color: '#4a5568',
              marginBottom: '20px',
              padding: '12px 16px',
              borderRadius: '8px',
              textAlign: 'left',
              fontSize: '0.95rem',
              fontWeight: 500,
              cursor: 'pointer',
              width: '100%'
            }}
          >
            ← もとの質問に戻る
          </button>
        )}

        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '12px'
          }}>{node.title}</div>
          <p style={{
            fontSize: '1rem',
            color: '#4a5568',
            lineHeight: '1.6',
            marginBottom: '0'
          }}>{node.description}</p>
        </div>

        {node.links && node.links.length > 0 && (
          <div style={{
            marginTop: '20px',
            borderTop: '1px solid #edf2f7',
            paddingTop: '20px'
          }}>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: 'bold',
              color: '#718096',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>次に進む・深掘りする</div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {node.links.map(linkId => {
                const targetNode = explorationNodes[linkId];
                if (!targetNode) return null;
                return (
                  <button 
                    key={linkId}
                    onClick={() => navigateTo(linkId)}
                    style={{
                      background: '#ebf8ff',
                      border: '1px solid #bee3f8',
                      color: '#2b6cb0',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      textAlign: 'left',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    💡 {targetNode.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* --- コピーライト（フッター） --- */}
        <div style={{
          marginTop: '40px',
          borderTop: '1px solid #edf2f7',
          paddingTop: '20px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#a0aec0'
        }}>
          © 2026 Dendroam / koh5884. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default App;