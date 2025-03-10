import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import '../../styles/carousel.css';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'B&O Premium Headphones',
    price: 499.99,
    description: 'Luxurious silver wireless headphones with adaptive noise cancellation and premium sound quality',
    image: '/images/products/img1.png'
  },
  {
    id: '2',
    name: 'Purple Wireless Headphones',
    price: 299.99,
    description: 'Stylish purple headphones with immersive audio and comfortable fit',
    image: '/images/products/img2.png'
  },
  {
    id: '3',
    name: 'Purple Wireless Earbuds',
    price: 199.99,
    description: 'Premium purple earbuds with active noise cancellation and crystal-clear sound',
    image: '/images/products/img3.png'
  },
  {
    id: '4',
    name: 'Black Pro Earbuds',
    price: 249.99,
    description: 'Professional-grade black earbuds with studio-quality audio performance',
    image: '/images/products/img4.png'
  },
  {
    id: '5',
    name: 'White AirPods Pro',
    price: 279.99,
    description: 'Sleek white earbuds with spatial audio and transparency mode',
    image: '/images/products/img5.png'
  }
];

const ProductCarousel = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsNext(true);
    setCurrentIndex((prev) => (prev + 1) % mockProducts.length);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsNext(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsNext(false);
    setCurrentIndex((prev) => (prev - 1 + mockProducts.length) % mockProducts.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff + mockProducts.length) % mockProducts.length);
    let translateX = 0;
    let translateZ = 0;
    let rotateY = 0;
    let opacity = 1;
    let scale = 1;

    if (normalizedDiff === 0) {
      translateZ = 300;
      scale = 1.3;
    } else if (normalizedDiff === 1 || normalizedDiff === mockProducts.length - 1) {
      translateX = normalizedDiff === 1 ? 300 : -300;
      translateZ = 150;
      rotateY = normalizedDiff === 1 ? 45 : -45;
      opacity = 0.7;
      scale = 0.9;
    } else {
      translateX = normalizedDiff < mockProducts.length / 2 ? 600 : -600;
      translateZ = 0;
      rotateY = normalizedDiff < mockProducts.length / 2 ? 90 : -90;
      opacity = 0.4;
      scale = 0.7;
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      transition: 'all 0.5s ease-in-out',
      filter: normalizedDiff === 0 ? 'none' : 'blur(2px)'
    };
  };

  return (
    <div 
      className={`carousel ${isNext ? 'next' : 'prev'}`}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x > rect.width / 2) {
          handleNext();
        } else {
          handlePrev();
        }
      }}
    >
      <div className="list" ref={containerRef}>
        {mockProducts.map((product, index) => (
          <motion.div
            key={product.id}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: '-150px',
              marginTop: '-200px',
              ...getCardStyle(index)
            }}
            initial={false}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
              setShowDetail(true);
            }}
          >
            <Card
              sx={{
                width: 300,
                height: 400,
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[10],
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                transformStyle: 'preserve-3d'
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover'
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;