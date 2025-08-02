import { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, ZoomBehavior, D3ZoomEvent } from 'd3-zoom';
import 'd3-transition';

interface UseMapZoomReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  svgRef: React.RefObject<SVGSVGElement>;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  currentZoom: number;
}

export const useMapZoom = (): UseMapZoomReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [currentZoom, setCurrentZoom] = useState(1);
  const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current);

    // Create zoom behavior with constraints
    const zoomBehavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 8]) // Allow zoom from 50% to 800%
      .on('zoom', (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
        const { transform } = event;
        
        // Apply transform to the map group element
        const g = svg.select('#map-group');
        if (!g.empty()) {
          g.attr('transform', transform.toString());
        }
        
        // Update current zoom level
        setCurrentZoom(transform.k);
      });

    // Store zoom behavior reference
    zoomBehaviorRef.current = zoomBehavior;

    // Apply zoom behavior directly to the SVG element
    svg.call(zoomBehavior);

    // Initialize transform
    const g = svg.select('#map-group');
    if (!g.empty()) {
      g.attr('transform', 'translate(0,0) scale(1)');
    }

    // Cleanup
    return () => {
      svg.on('.zoom', null);
    };
  }, []);

  const zoomIn = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    
    select(svgRef.current)
      .transition()
      .duration(300)
      .call(zoomBehaviorRef.current.scaleBy, 1.5);
  };

  const zoomOut = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    
    select(svgRef.current)
      .transition()
      .duration(300)
      .call(zoomBehaviorRef.current.scaleBy, 1 / 1.5);
  };

  const resetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    
    select(svgRef.current)
      .transition()
      .duration(500)
      .call(zoomBehaviorRef.current.transform, zoomIdentity);
  };

  return {
    containerRef,
    svgRef,
    zoomIn,
    zoomOut,
    resetZoom,
    currentZoom,
  };
};