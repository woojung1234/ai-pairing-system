import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>AI 기반 설명 가능한 페어링 시스템</h1>
          <p className="hero-subtitle">최적의 음식과 술 조합을 AI가 추천해 드립니다</p>
          <div className="hero-buttons">
            <Link to="/pairing" className="primary-button">페어링 시작하기</Link>
            <Link to="/about" className="secondary-button">서비스 소개</Link>
          </div>
        </div>
      </section>

      <section className="intro-section">
        <div className="container">
          <div className="section-heading">
            <h2>최적의 페어링을 찾아드립니다</h2>
            <p>화학 성분 기반 AI 분석으로 당신의 미각을 만족시킬 완벽한 조합을 제안합니다</p>
          </div>
          <div className="intro-cards">
            <div className="intro-card">
              <div className="card-icon">
                <i className="icon-science"></i>
              </div>
              <h3>화학 성분 분석</h3>
              <p>술과 음식의 화학적 성분을 분석하여 이론적으로 완벽한 조합을 찾습니다.</p>
            </div>
            <div className="intro-card">
              <div className="card-icon">
                <i className="icon-ai"></i>
              </div>
              <h3>AI 추천 시스템</h3>
              <p>최신 AI 기술로 수많은 페어링 데이터를 학습하여 개인 맞춤형 추천을 제공합니다.</p>
            </div>
            <div className="intro-card">
              <div className="card-icon">
                <i className="icon-explanation"></i>
              </div>
              <h3>투명한 설명</h3>
              <p>왜 이 조합이 좋은지 과학적 근거와 함께 자세히 설명해 드립니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="section-heading">
            <h2>이용 방법</h2>
            <p>간단한 단계를 통해 최고의 페어링을 경험하세요</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>술 또는 음식 검색</h3>
                <p>페어링을 원하는 술이나 음식을 입력하세요.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>AI 분석</h3>
                <p>입력한 항목의 특성을 AI가 분석합니다.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>추천 결과 확인</h3>
                <p>최적의 페어링 결과와 설명을 확인하세요.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>페어링 즐기기</h3>
                <p>추천된 조합으로 완벽한 미식 경험을 하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-pairings">
        <div className="container">
          <div className="section-heading">
            <h2>인기 페어링</h2>
            <p>사용자들이 가장 많이 찾는 페어링 조합</p>
          </div>
          <div className="pairings-grid">
            <div className="pairing-card">
              <div className="pairing-image"></div>
              <div className="pairing-content">
                <h3>레드 와인 + 스테이크</h3>
                <p>와인의 탄닌과 육류의 단백질이 만나 완벽한 조화를 이룹니다.</p>
                <Link to="/pairing?q=레드와인" className="link-button">자세히 보기</Link>
              </div>
            </div>
            <div className="pairing-card">
              <div className="pairing-image"></div>
              <div className="pairing-content">
                <h3>IPA 맥주 + 매운 치킨</h3>
                <p>맥주의 쌉쌀함이 매운맛을 중화시켜 풍미를 높여줍니다.</p>
                <Link to="/pairing?q=IPA맥주" className="link-button">자세히 보기</Link>
              </div>
            </div>
            <div className="pairing-card">
              <div className="pairing-image"></div>
              <div className="pairing-content">
                <h3>진로 소주 + 삼겹살</h3>
                <p>소주의 깔끔한 맛이 삼겹살의 고소함을 극대화합니다.</p>
                <Link to="/pairing?q=진로소주" className="link-button">자세히 보기</Link>
              </div>
            </div>
            <div className="pairing-card">
              <div className="pairing-image"></div>
              <div className="pairing-content">
                <h3>막걸리 + 해물파전</h3>
                <p>막걸리의 발효향과 해물파전의 감칠맛이 시너지를 냅니다.</p>
                <Link to="/pairing?q=막걸리" className="link-button">자세히 보기</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>나만의 완벽한 페어링을 찾아보세요</h2>
            <p>AI 기반 기술로 최적의 음식과 술 조합을 추천해 드립니다</p>
            <Link to="/pairing" className="primary-button">페어링 시작하기</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
