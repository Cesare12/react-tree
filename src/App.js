import React from "react";
// import "./styles.css";
import Tree from './components/Tree'
import { TreeContext } from './components/contextTypes'
import { convertTreeToList, convertListToTree,add } from './util/treeUtil'

class App extends React.Component {
  state = {
    treeData: [{
      key: '0',
      title: '1-',
      children: [],
    }],
  }


  createNode = (index) => {
    const { treeData } = this.state;
    const flattenData = convertTreeToList(treeData);

    const newFlattenData = add(flattenData ,index);

    const newTreeData = convertListToTree(newFlattenData)
    this.setState({
      treeData: newTreeData
    })
  }

  deleteNode = (index) => {
    const { treeData } = this.state;
    const flattenData = convertTreeToList(treeData);

    const newFlattenData = flattenData.filter(item =>
      item.key.slice(0, index.length) !== index
    )

    const newTreeData = convertListToTree(newFlattenData);

    this.setState({
      treeData: newTreeData
    })
  }

  render() {
    return (
      <>
        <TreeContext.Provider value={{
          createNode: this.createNode,
          deleteNode: this.deleteNode,
        }}>
          <Tree tree={this.state.treeData} />
        </TreeContext.Provider>
      </>
    );
  }
}

export default App;
