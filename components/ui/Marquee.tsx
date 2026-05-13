'use client';

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
}

export default function Marquee({ items, reverse = false }: MarqueeProps) {
  return (
    <div className="marquee-wrap">
      <div 
        className="marquee-track" 
        style={reverse ? { animationDirection: 'reverse', animationDuration: '25s' } : undefined}
      >
        {items.map((item, idx) => (
          <span key={idx} style={{ display: 'contents' }}>
            <span className="marquee-item">{item}</span>
            <span className="marquee-item filled">{reverse ? '✦' : '·'}</span>
          </span>
        ))}
      </div>
    </div>
  );
}