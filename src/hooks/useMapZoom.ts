import { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, ZoomBehavior, D3ZoomEvent } from 'd3-zoom';
import 'd3-transition';

interface UseMapZoomReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  svgRef: React.RefCallback<SVGSVGElement>;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  currentZoom: number;
}

export const useMapZoom = (): UseMapZoomReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgElement, setSvgElement] = useState<SVGSVGElement | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [currentZoom, setCurrentZoom] = useState(1);
  const zoomBehaviorRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Callback ref to track when SVG becomes available
  const setSvgRef = (element: SVGSVGElement | null) => {
    svgRef.current = element;
    setSvgElement(element);
  };

  // Main initialization effect - only sets up cleanup
  useEffect(() => {
    // Cleanup function
    return () => {
      if (svgElement) {
        select(svgElement).on('.zoom', null);
      }
      zoomBehaviorRef.current = null;
    };
  }, [svgElement]);

  // Secondary effect that runs when SVG becomes available
  useEffect(() => {    
    if (!svgElement) {
      return;
    }

    if (zoomBehaviorRef.current) {
      return;
    }

    const svg = select(svgElement);

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

    // Initialize transform - with delay to ensure map group is rendered
    setTimeout(() => {
      const g = svg.select('#map-group');
      if (!g.empty()) {
        g.attr('transform', 'translate(0,0) scale(1)');
      }
    }, 50);
    
  }, [svgElement]); // This effect re-runs when svgElement changes
  
  // Helper function to initialize zoom if not already done
  const ensureZoomInitialized = () => {
    if (!zoomBehaviorRef.current && svgElement) {
      const svg = select(svgElement);
      
      const zoomBehavior = zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 8])
        .on('zoom', (event: D3ZoomEvent<SVGSVGElement, unknown>) => {
          const { transform } = event;
          const g = svg.select('#map-group');
          if (!g.empty()) {
            g.attr('transform', transform.toString());
          }
          setCurrentZoom(transform.k);
        });

      zoomBehaviorRef.current = zoomBehavior;
      svg.call(zoomBehavior);
      return true;
    }
    return !!zoomBehaviorRef.current;
  };

  const zoomIn = () => {
    if (!svgElement) {
      return;
    }
    
    // Try to initialize zoom if not already done
    if (!ensureZoomInitialized()) {
      return;
    }
    
    select(svgElement)
      .transition()
      .duration(300)
      .call(zoomBehaviorRef.current!.scaleBy, 1.5);
  };

  const zoomOut = () => {
    if (!svgElement) {
      return;
    }
    
    // Try to initialize zoom if not already done
    if (!ensureZoomInitialized()) {
      return;
    }
    
    select(svgElement)
      .transition()
      .duration(300)
      .call(zoomBehaviorRef.current!.scaleBy, 1 / 1.5);
  };

  const resetZoom = () => {
    if (!svgElement) {
      return;
    }
    
    // Try to initialize zoom if not already done
    if (!ensureZoomInitialized()) {
      return;
    }
    
    select(svgElement)
      .transition()
      .duration(500)
      .call(zoomBehaviorRef.current!.transform, zoomIdentity);
  };

  return {
    containerRef,
    svgRef: setSvgRef, // Return the callback ref
    zoomIn,
    zoomOut,
    resetZoom,
    currentZoom,
  };
};