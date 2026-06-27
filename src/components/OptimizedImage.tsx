import React, { useState, useEffect } from 'react';

interface OptimizedImageProps extends React.ComponentPropsWithoutRef<'img'> {
  src: string;
}

const FALLBACK_URLS: Record<string, string> = {
  '/hero_phone_mockup_1781992151448.webp': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/wedding_portrait_1781994427687.webp': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/sofia_alejandro_stairs_1782247280237.webp': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/v_s_hero_1782248283047.webp': 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/isabella_mateo_couple.webp': 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/hacienda_hero_1782249686184.webp': 'https://images.unsplash.com/photo-1507504038482-76211a224ebc?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/celestial_hero_1782250292221.webp': 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/quince_card_1781992176864.webp': 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/bautizo_card_1781992187887.webp': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/cumpleanos_card_1781992199358.webp': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200&fm=webp',
  
  // Gallery & Detail fallbacks
  '/versailles_garden.webp': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/greenhouse_wedding.webp': 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/tuscany_villa.webp': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/romantic_lake.webp': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/flower_meadow.webp': 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=1200&fm=webp',
  
  '/v_s_hotel_1782248295585.webp': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/v_s_gala_1782248306837.webp': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/v_s_terrace_1782248319080.webp': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/v_s_stairs_1782248329087.webp': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/v_s_dress_men_1782248340756.webp': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/v_s_dress_women_1782248350235.webp': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1200&fm=webp',

  '/hacienda_balcony_1782249700340.webp': 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/hacienda_horses_1782249712620.webp': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/hacienda_patio_1782249723122.webp': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/hacienda_gardens_1782249733973.webp': 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200&fm=webp',

  '/celestial_observatory_1782250302880.webp': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/celestial_forest_1782250315828.webp': 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/celestial_lake_1782250329521.webp': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200&fm=webp',
  '/celestial_couple_1782250364007.webp': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200&fm=webp'
};

export default function OptimizedImage({ src, alt, className, referrerPolicy, ...props }: OptimizedImageProps) {
  const isWebp = src && src.endsWith('.webp');
  const isJpg = src && (src.endsWith('.jpg') || src.endsWith('.jpeg'));

  const webpSrc = isWebp ? src : (isJpg ? src.replace(/\.(jpg|jpeg)$/i, '.webp') : null);
  const jpgSrc = isJpg ? src : (isWebp ? src.replace(/\.webp$/i, '.jpg') : null);

  const [currentSrc, setCurrentSrc] = useState(webpSrc || src);
  const [triedJpg, setTriedJpg] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  // Sync state if src prop changes
  useEffect(() => {
    setCurrentSrc(webpSrc || src);
    setTriedJpg(false);
    setTriedFallback(false);
  }, [src]);

  const handleError = () => {
    if (jpgSrc && !triedJpg) {
      // Step 1: WebP failed, fallback to local JPG
      setCurrentSrc(jpgSrc);
      setTriedJpg(true);
    } else if (!triedFallback) {
      // Step 2: Both local formats failed (or weren't applicable), fallback to premium CDN
      const cleanKey = src ? src.split('?')[0] : '';
      const unsplashFallback = FALLBACK_URLS[cleanKey];
      if (unsplashFallback && currentSrc !== unsplashFallback) {
        setCurrentSrc(unsplashFallback);
        setTriedFallback(true);
      }
    }
  };

  const finalReferrerPolicy = 'no-referrer';

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      referrerPolicy={finalReferrerPolicy}
      {...props}
    />
  );
}
