import React, { useState, useEffect } from 'react';
import { MapPin, Search as SearchIcon, MessageCircle, Star, Globe, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [query, setQuery] = useState('');
    const [animated, setAnimated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setAnimated(true);
    }, []);

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        } else {
            navigate(`/search?q=`);
        }
    };

    return (
        <>
            {/* Animated Background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                zIndex: -1,
                overflow: 'hidden'
            }}>
                {/* Floating Shapes */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite'
                }}></div>
                <div style={{
                    position: 'absolute',
                    top: '60%',
                    right: '15%',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    animation: 'float 8s ease-in-out infinite reverse'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '20%',
                    width: '80px',
                    height: '80px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    animation: 'float 10s ease-in-out infinite'
                }}></div>
            </div>

            <section className="hero" style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: 'white',
                position: 'relative',
                transform: animated ? 'translateY(0)' : 'translateY(50px)',
                opacity: animated ? 1 : 0,
                transition: 'all 1s ease-out'
            }}>
                <div style={{
                    animation: 'bounce 2s ease-in-out',
                    display: 'inline-block',
                    marginBottom: '2rem'
                }}>
                    <MapPin className="hero-icon" size={80} strokeWidth={2} style={{ color: '#ffd700' }} />
                </div>
                <h1 className="hero-title" style={{
                    fontSize: '5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Discover Your Perfect Stay
                </h1>
                <p className="hero-subtitle" style={{
                    fontSize: '1.3rem',
                    marginBottom: '3rem',
                    opacity: 0.9,
                    maxWidth: '600px',
                    margin: '0 auto 3rem',
                    lineHeight: 1.6
                }}>
                    Connect with unique homestays, hotels, and local experiences worldwide
                </p>

                <div className="search-container" style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    position: 'relative',
                    transform: animated ? 'scale(1)' : 'scale(0.8)',
                    transition: 'transform 0.8s ease-out 0.3s'
                }}>
                    <input
                        type="text"
                        placeholder="Search for a destination..."
                        className="search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        style={{
                            width: '100%',
                            padding: '1.2rem 3rem 1.2rem 1.5rem',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '1.1rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            outline: 'none',
                            background: 'rgba(255,255,255,0.95)',
                            color: '#333'
                        }}
                    />
                    <button
                        className="btn search-btn"
                        onClick={handleSearch}
                        style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) scale(1)'}
                    >
                        <SearchIcon size={20} strokeWidth={2.5} color="white" />
                    </button>
                </div>

                {/* Feature Highlights */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    marginTop: '4rem',
                    maxWidth: '800px',
                    margin: '4rem auto 0'
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '2rem',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transform: animated ? 'translateY(0)' : 'translateY(30px)',
                        opacity: animated ? 1 : 0,
                        transition: 'all 0.8s ease-out 0.5s'
                    }}>
                        <Globe size={40} style={{ color: '#ffd700', marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Global Network</h3>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Access thousands of unique stays worldwide</p>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '2rem',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transform: animated ? 'translateY(0)' : 'translateY(30px)',
                        opacity: animated ? 1 : 0,
                        transition: 'all 0.8s ease-out 0.7s'
                    }}>
                        <Users size={40} style={{ color: '#ffd700', marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Local Guides</h3>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Expert local guides for authentic experiences</p>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '2rem',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transform: animated ? 'translateY(0)' : 'translateY(30px)',
                        opacity: animated ? 1 : 0,
                        transition: 'all 0.8s ease-out 0.9s'
                    }}>
                        <Award size={40} style={{ color: '#ffd700', marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Verified Quality</h3>
                        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>All listings verified for your peace of mind</p>
                    </div>
                </div>
            </section>

            <div className="chat-bubble" onClick={() => alert("Connecting to an agent...")} style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                zIndex: 1000,
                animation: 'pulse 2s infinite'
            }}>
                <MessageCircle size={24} color="white" />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                        40% { transform: translateY(-10px); }
                        60% { transform: translateY(-5px); }
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                `
            }} />
        </>
    );
}
