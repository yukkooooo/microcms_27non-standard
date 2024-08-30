// src/components/Gallery.tsx
import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Gallery: React.FC = () => {
  const images = [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo3.jpg',
    '/images/photo4.jpg',
  ];

  return (
    <GalleryContainer>
      {images.map((src, index) => (
        <Image key={index} src={src} alt={`Photo ${index + 1}`} />
      ))}
    </GalleryContainer>
  );
};

export default Gallery;