import styles from './d3Tree.module.scss';
import Tree from 'react-d3-tree';
import data from '../../data';

const D3Tree = () => {
  return (
    <div className={styles.canvas}>
      <Tree
        data={data}
        orientation='vertical'
        zoomable
        enableLegacyTransitions
        pathFunc='straight'
        translate={{
          x: window.innerWidth / 2,
          y: 100,
        }}
        dimensions={{
          height: window.innerHeight,
          width: window.innerWidth,
        }}
      />
    </div>
  );
};

export default D3Tree;
