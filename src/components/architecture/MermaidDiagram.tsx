'use client'

import React, { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

export default function MermaidDiagram({ chart }: { chart: string }) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).mermaid && chartRef.current && chart) {
      const mermaid = (window as any).mermaid;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
      });
      
      const id = 'mermaid-svg-' + Math.random().toString(36).substring(7);
      mermaid.render(id, chart).then(({ svg }: { svg: string }) => {
        if (chartRef.current) {
          chartRef.current.innerHTML = svg;
          setRendered(true);
        }
      }).catch((err: Error) => {
        console.error("Mermaid render error", err);
      });
    }
  }, [chart, rendered]) // adding rendered to re-trigger if script loads late

  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js" 
        strategy="lazyOnload"
        onLoad={() => setRendered(false)} // force effect re-run
      />
      <div className="flex justify-center p-8 bg-background rounded-lg border border-border">
        <div ref={chartRef} className={!rendered ? "opacity-0" : "opacity-100 transition-opacity duration-500"} />
      </div>
    </>
  )
}
