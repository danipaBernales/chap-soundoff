import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const useProductCarousel = (products: Product[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextProduct = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const previousProduct = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToProduct = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return {
    currentIndex,
    isAnimating,
    currentProduct: products[currentIndex],
    nextProduct,
    previousProduct,
    goToProduct,
  };
};