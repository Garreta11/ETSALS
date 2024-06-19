import { useEffect, useState } from 'react';
import styles from './Tree.module.scss';

const nodeRadius = 10;
const horizontalSpacing = 800; // Adjust spacing as needed
const verticalSpacing = 200;

const Tree = ({ data, width, height }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const createTree = (data) => {
      const root = { ...data, depth: 0 };
      const nodes = [];
      const links = [];

      const assignPositions = (node, depth = 0, x = 0, y = 0) => {
        node.depth = depth;
        node.x = x;
        node.y = y;
        nodes.push(node);
        if (node.children) {
          let startX = x - ((node.children.length - 1) * horizontalSpacing) / 2;
          node.children.forEach((child, index) => {
            const childX = startX + index * horizontalSpacing;
            const childY = y + verticalSpacing;
            links.push({ parent: node, child });
            assignPositions(child, depth + 1, childX, childY);
          });
        }
      };

      assignPositions(root, 0, width / 2, nodeRadius * 2);
      return { nodes, links };
    };

    const { nodes, links } = createTree(data);
    setNodes(nodes);
    setLinks(links);
  }, [data, width, height]);

  return (
    <div className={styles.tree}>
      <svg width={width} height={height}>
        {links.map((link, index) => (
          <line
            key={index}
            x1={link.parent.x}
            y1={link.parent.y + 20}
            x2={link.child.x}
            y2={link.child.y - 20}
            stroke='#000'
            // strokeOpacity='0.4'
            strokeWidth='2'
          />
        ))}
        {nodes.map((node, index) => (
          <g key={index} transform={`translate(${node.x},${node.y})`}>
            {/* <circle r={nodeRadius} fill='#000' /> */}
            <text
              dy={3}
              x={node.children ? -12 : 12}
              style={{
                textAnchor: node.children ? 'end' : 'start',
                font: '12px sans-serif',
              }}
            >
              {node.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Tree;
