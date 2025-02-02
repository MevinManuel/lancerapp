import React from 'react';
import styled from 'styled-components';

const HomePage = () => {
  return (
    <Container>
      <Title>Where Skill Meets Opportunity.</Title>
      <Subtitle>Amplify Your Expertise. Accelerate Your Growth.</Subtitle>
      {/* Add a button or call to action here */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0; 
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #666;
`;

export default HomePage;