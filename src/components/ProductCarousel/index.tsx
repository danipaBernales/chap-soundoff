import { useState, useRef, useEffect } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning) return;

      const scrollDelta = e.deltaY;
      if (Math.abs(scrollDelta) < 50) return;

      setIsTransitioning(true);
      if (scrollDelta > 0) {
        setCurrentIndex((prev) => (prev + 1) % mockProducts.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + mockProducts.length) % mockProducts.length);
      }
      setTimeout(() => setIsTransitioning(false), 500);
    };

    const list = listRef.current;
    if (!list) return;

    list.addEventListener('wheel', handleScroll, { passive: false });
    
    const updateCarousel = () => {
      if (!list) return;
      const items = Array.from(list.children) as HTMLElement[];
      items.forEach((item, index) => {
        const diff = index - currentIndex;
        const normalizedDiff = ((diff + mockProducts.length) % mockProducts.length);
        const itemNumber = normalizedDiff + 1;

        item.style.transform = `var(--item${itemNumber}-transform)`;
        item.style.filter = `var(--item${itemNumber}-filter)`;
        item.style.opacity = `var(--item${itemNumber}-opacity)`;
        item.style.zIndex = `var(--item${itemNumber}-zIndex)`;
        item.style.transition = isTransitioning ? 'all 0.5s ease-in-out' : '';
      });
    };

    updateCarousel();

    return () => {
      list.removeEventListener('wheel', handleScroll);
    };
  }, [currentIndex, isTransitioning]);

  return (
    <div className="carousel">
      <div className="list" ref={listRef}>
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="item"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="title">{product.name}</h3>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;