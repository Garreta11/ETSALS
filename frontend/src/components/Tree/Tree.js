import { useEffect, useState } from 'react';
import styles from './Tree.module.scss';

const nodeRadius = 10;
const horizontalSpacing = 150; // Base horizontal spacing
const verticalSpacing = 200; // Vertical spacing between levels

const Tree = ({ data, width, height }) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  // "Reingold-Tilford" tree layout algorithm
  useEffect(() => {
    const calculateNodeSizes = (node) => {
      if (!node.children || node.children.length === 0) {
        node.width = nodeRadius * 2;
        node.height = nodeRadius * 2;
      } else {
        node.children.forEach((child) => calculateNodeSizes(child));
        const totalWidth = node.children.reduce(
          (acc, child) => acc + child.width + horizontalSpacing,
          -horizontalSpacing
        );
        node.width = totalWidth;
        node.height =
          Math.max(...node.children.map((child) => child.height)) +
          verticalSpacing;
      }
    };

    const calculateNodePositions = (node, startX, depth) => {
      node.depth = depth;
      node.y = depth * verticalSpacing;
      if (!node.children || node.children.length === 0) {
        node.x = startX;
      } else {
        let currentX = startX;
        node.children.forEach((child) => {
          calculateNodePositions(child, currentX, depth + 1);
          currentX += child.width + horizontalSpacing;
        });
        node.x =
          (node.children[0].x + node.children[node.children.length - 1].x) / 2;
      }
    };

    const createTree = (data) => {
      const root = { ...data };
      calculateNodeSizes(root);
      calculateNodePositions(root, (width - root.width) / 2, 0);
      const nodes = [];
      const links = [];

      const traverse = (node) => {
        nodes.push(node);
        if (node.children) {
          node.children.forEach((child) => {
            links.push({ parent: node, child });
            traverse(child);
          });
        }
      };

      traverse(root);
      return { nodes, links };
    };

    const { nodes, links } = createTree(data);
    setNodes(nodes);
    setLinks(links);
  }, [data, width, height]);

  return (
    <div className={styles.tree}>
      <div className={styles.tree__container}>
        <svg width={width} height={height}>
          {links.map((link, index) => (
            <line
              key={index}
              x1={link.parent.x}
              y1={link.parent.y + 30}
              x2={link.child.x}
              y2={link.child.y}
              stroke='#000'
              strokeWidth='2'
            />
          ))}
          {nodes.map((node, index) => (
            <g key={index} transform={`translate(${node.x},${node.y + 20})`}>
              <text
                style={{
                  textAnchor: 'middle',
                  font: '15px sans-serif',
                }}
              >
                {node.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Tree;
