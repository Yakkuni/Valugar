import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageTitle = styled.h1`
  color: #0090C1;
  font-size: 28px;
  margin-bottom: 30px;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImage = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const AboutContent = styled.div`
  p {
    margin-bottom: 20px;
    line-height: 1.6;
    color: #444;
  }
`;

const AboutSection = styled.section`
  margin-top: 60px;
`;

const SectionTitle = styled.h2`
  color: #0090C1;
  font-size: 24px;
  margin-bottom: 20px;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const MemberImage = styled.div`
  height: 200px;
  background-color: #ddd;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MemberInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const MemberName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
  color: #333;
`;

const MemberRole = styled.p`
  color: #0090C1;
  font-weight: 500;
  margin-bottom: 10px;
`;

const MemberBio = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background: #f9f9f9;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const ValueIcon = styled.div`
  color: #0090C1;
  font-size: 32px;
  margin-bottom: 15px;
`;

const ValueTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const ValueDescription = styled.p`
  color: #666;
  line-height: 1.5;
`;

const AboutPage: React.FC = () => {
  return (
    <PageContainer>
      <PageTitle>Sobre a Valugar</PageTitle>
      
      <AboutGrid>
        <AboutImage>
          <img src="/public/imagens/sobre.jpg" alt="Equipe Valugar" />
        </AboutImage>
        
        <AboutContent>
          <p>A Valugar é uma empresa imobiliária fundada em 2015 com a missão de transformar a experiência de alugar e comprar imóveis no Brasil. Nossa plataforma conecta proprietários e inquilinos/compradores de forma simples e segura.</p>
          
          <p>Com uma equipe especializada e um rigoroso processo de seleção de imóveis, garantimos qualidade e transparência em todas as negociações. Nosso compromisso é oferecer um serviço personalizado, onde cada cliente é único e suas necessidades são atendidas com dedicação e profissionalismo.</p>
          
          <p>Utilizamos tecnologia avançada para facilitar o processo de busca e locação, proporcionando uma experiência intuitiva e eficiente para todos os nossos usuários. Nosso objetivo é simplificar o mercado imobiliário, tornando-o mais acessível e transparente para todos.</p>
        </AboutContent>
      </AboutGrid>
      
      <AboutSection>
        <SectionTitle>Nossos Valores</SectionTitle>
        
        <ValuesGrid>
          <ValueCard>
            <ValueIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </ValueIcon>
            <ValueTitle>Transparência</ValueTitle>
            <ValueDescription>Acreditamos que relações de confiança são construídas com base em transparência. Por isso, prezamos por clareza em todas as informações e condições dos imóveis.</ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
            </ValueIcon>
            <ValueTitle>Inovação</ValueTitle>
            <ValueDescription>Buscamos constantemente novas tecnologias e soluções para melhorar a experiência de nossos clientes e tornar o processo de locação e compra mais eficiente.</ValueDescription>
          </ValueCard>
          
          <ValueCard>
            <ValueIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
            </ValueIcon>
            <ValueTitle>Compromisso</ValueTitle>
            <ValueDescription>Nosso compromisso é com a satisfação dos nossos clientes. Trabalhamos incansavelmente para garantir que suas necessidades sejam atendidas com excelência.</ValueDescription>
          </ValueCard>
        </ValuesGrid>
      </AboutSection>
      
      <AboutSection>
        <SectionTitle>Nossa Equipe</SectionTitle>
        
        <TeamGrid>
          <TeamMember>
            <MemberImage>
              {/* Placeholder for team member image */}
              <div style={{ height: '100%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#999" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
              </div>
            </MemberImage>
            <MemberInfo>
              <MemberName>Ana Silva</MemberName>
              <MemberRole>CEO</MemberRole>
              <MemberBio>Com 15 anos de experiência no mercado imobiliário, Ana fundou a Valugar com a visão de transformar o setor através da tecnologia.</MemberBio>
            </MemberInfo>
          </TeamMember>
          
          <TeamMember>
            <MemberImage>
              {/* Placeholder for team member image */}
              <div style={{ height: '100%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#999" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
              </div>
            </MemberImage>
            <MemberInfo>
              <MemberName>Carlos Mendes</MemberName>
              <MemberRole>Diretor de Operações</MemberRole>
              <MemberBio>Responsável por garantir que todos os processos operacionais da Valugar funcionem com eficiência e excelência.</MemberBio>
            </MemberInfo>
          </TeamMember>
          
          <TeamMember>
            <MemberImage>
              {/* Placeholder for team member image */}
              <div style={{ height: '100%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#999" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
              </div>
            </MemberImage>
            <MemberInfo>
              <MemberName>Mariana Santos</MemberName>
              <MemberRole>Diretora de Marketing</MemberRole>
              <MemberBio>Especialista em marketing digital, Mariana é responsável por todas as estratégias de comunicação e aquisição de clientes.</MemberBio>
            </MemberInfo>
          </TeamMember>
        </TeamGrid>
      </AboutSection>
    </PageContainer>
  );
};

export default AboutPage;