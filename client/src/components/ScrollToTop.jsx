import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the modern standard for scrolling to the top of a page
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null; // This component doesn't render anything
}

export default ScrollToTop; 