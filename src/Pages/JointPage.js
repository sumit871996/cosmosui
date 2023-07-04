import React, { useEffect, useRef } from 'react';
import { dia, shapes } from 'jointjs';

const JointPage = (props) => {
  const canvas = useRef(null);
  useEffect(() => {
    const graph = new dia.Graph();

    const paper = new dia.Paper({
      model: graph,
      background: {
        color: '#F8F9FA',
      },
      frozen: true,
      async: true,
      sorting: dia.Paper.sorting.APPROX,
      cellViewNamespace: shapes,
    });

    canvas.current.appendChild(paper.el);
    paper.render();

    const rect = new shapes.standard.Rectangle({
      position: { x: 100, y: 100 },
      size: { width: 100, height: 50 },
      attrs: {
        label: {
          text: props.title,
        },
      },
      interactive: {
        draggable: true,
      },
    });

    graph.addCell(rect);
    paper.unfreeze();

    const paperWidth = '100%'; // Set the desired width of the paper
    const paperHeight = '100%'; // Set the desired height of the paper
    paper.setDimensions(paperWidth, paperHeight);

    return () => {
      paper.remove();
    };
  }, []);

  return <div className='canvas' ref={canvas} />;
};

export default JointPage;
