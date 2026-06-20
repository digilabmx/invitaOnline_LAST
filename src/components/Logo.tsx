import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon';
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'full', 
  light = false 
}) => {
  // Use exact theme colors or handle inverted light/dark
  // Theme colors: #2D241E (dark brown), #A68966 (soft gold), background #FAF9F6
  const primaryColor = light ? '#FAF9F6' : '#2D241E'; 
  const secondaryColor = '#A68966';

  if (variant === 'icon') {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={`w-10 h-10 ${className}`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curved thin decorative trace line */}
        <path 
          d="M 35 80 A 30 30 0 0 0 78 40" 
          stroke={secondaryColor} 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Curved text arc on the left side */}
        <path
          id="iconCurvePath"
          d="M 12,58 A 34 34 0 0,1 62,12"
          fill="none"
          stroke="none"
        />
        <text className="font-sans" fontSize="6.5" letterSpacing="0.25" fill={primaryColor} opacity="0.6">
          <textPath xlinkHref="#iconCurvePath" startOffset="0%">
            INVITACIONES DIGITALES
          </textPath>
        </text>

        {/* 'i' character */}
        <text 
          x="38" 
          y="56" 
          fontFamily="Cinzel, Georgia, serif" 
          fontSize="42" 
          fontWeight="bold" 
          fill={primaryColor} 
          textAnchor="middle"
        >
          i
        </text>

        {/* 'o' character */}
        <text 
          x="58" 
          y="56" 
          fontFamily="Cinzel, 'Playfair Display', Georgia, serif" 
          fontSize="40" 
          fontWeight="300" 
          fill={secondaryColor} 
          textAnchor="middle"
        >
          o
        </text>
      </svg>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Monogram part */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-10 h-10 shrink-0"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arc */}
          <path 
            d="M 35 80 A 30 30 0 0 0 78 40" 
            stroke={secondaryColor} 
            strokeWidth="1.5" 
            strokeLinecap="round"
            fill="none"
          />
          {/* Curved text path */}
          <path
            id="compactCurvePath"
            d="M 12,58 A 34 34 0 0,1 62,12"
            fill="none"
            stroke="none"
          />
          <text className="font-sans" fontSize="6.5" letterSpacing="0.25" fill={primaryColor} opacity="0.6">
            <textPath xlinkHref="#compactCurvePath" startOffset="0%">
              INVITACIONES DIGITALES
            </textPath>
          </text>
          
          {/* 'i' */}
          <text x="38" y="56" fontFamily="Cinzel, Georgia, serif" fontSize="42" fontWeight="bold" fill={primaryColor} textAnchor="middle">i</text>
          {/* 'o' */}
          <text x="58" y="56" fontFamily="Cinzel, Georgia, serif" fontSize="40" fontWeight="300" fill={secondaryColor} textAnchor="middle">o</text>
        </svg>

        {/* Text next to monogram */}
        <div className="flex flex-col">
          <span 
            className="font-sans text-lg font-bold tracking-[0.18em] uppercase leading-none" 
            style={{ color: primaryColor }}
          >
            invitaonline
          </span>
          <span 
            className="font-sans text-[7px] tracking-[0.4em] uppercase opacity-75 mt-0.5" 
            style={{ color: secondaryColor }}
          >
            Invitaciones Digitales
          </span>
        </div>
      </div>
    );
  }

  // Full variant (matches the image structure vertically)
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Monogram central element */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-24 h-24 mb-2"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arc */}
        <path 
          d="M 35 80 A 30 30 0 0 0 78 40" 
          stroke={secondaryColor} 
          strokeWidth="1.2" 
          strokeLinecap="round"
          fill="none"
        />
        {/* Arc Text path */}
        <path
          id="fullCurvePath"
          d="M 12,58 A 34 34 0 0,1 62,12"
          fill="none"
          stroke="none"
        />
        <text className="font-sans font-medium" fontSize="6.5" letterSpacing="0.25" fill={primaryColor} opacity="0.65">
          <textPath xlinkHref="#fullCurvePath" startOffset="5%">
            INVITACIONES DIGITALES
          </textPath>
        </text>

        {/* Monogram Letters */}
        <text 
          x="38" 
          y="56" 
          fontFamily="Cinzel, Georgia, serif" 
          fontSize="42" 
          fontWeight="700" 
          fill={primaryColor} 
          textAnchor="middle"
        >
          i
        </text>
        <text 
          x="58" 
          y="56" 
          fontFamily="Cinzel, Georgia, serif" 
          fontSize="40" 
          fontWeight="300" 
          fill={secondaryColor} 
          textAnchor="middle"
        >
          o
        </text>
      </svg>

      {/* Main Brand Title */}
      <h1 
        className="font-sans text-2xl font-bold tracking-[0.18em] uppercase leading-none"
        style={{ color: primaryColor }}
      >
        invitaonline
      </h1>

      {/* Subtitle */}
      <p 
        className="font-sans text-[9px] tracking-[0.5em] uppercase opacity-75 mt-1"
        style={{ color: secondaryColor }}
      >
        Invitaciones Digitales
      </p>
    </div>
  );
};
