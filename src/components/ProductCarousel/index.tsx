import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

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
    name: 'Premium Headphones',
    price: 299.99,
    description: 'High-fidelity wireless headphones with noise cancellation',
    image: 'https://via.placeholder.com/300x300'
  },
  {
    id: '2',
    name: 'Studio Microphone',
    price: 199.99,
    description: 'Professional condenser microphone for studio recording',
    image: 'https://via.placeholder.com/300x300'
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    price: 159.99,
    description: 'True wireless earbuds with premium sound quality',
    image: 'https://via.placeholder.com/300x300'
  }
];

const ProductCarousel = () => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const carouselX = useTransform(scrollYProgress, [0, 1], ['0%', '-200%']);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <Box
      ref={containerRef}
      sx={{
        height: '100vh',
        perspective: '1000px',
        overflow: 'hidden',
        position: 'relative',
        py: 4,
        px: 2,
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          gap: '4rem',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          x: carouselX,
          rotateY,
        }}
      >
        {[...mockProducts, ...mockProducts].map((product, index) => (
          <motion.div
            key={`${product.id}-${index}`}
            style={{ scale: scale }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              sx={{
                width: { xs: 250, md: 300 },
                height: hoveredProduct === product.id ? { xs: 350, md: 400 } : { xs: 250, md: 300 },
                transition: 'height 0.3s ease-in-out',
                bgcolor: 'background.paper',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: { xs: 150, md: 200 },
                  objectFit: 'cover',
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${product.price}
                </Typography>
                {hoveredProduct === product.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
};

export default ProductCarousel;