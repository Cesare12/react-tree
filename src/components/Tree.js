import React from 'react';
import Tick from './Tick'
// import classNames from 'classnames';
import { TreeContext } from './contextTypes'

const Tree = props => (
    <>
        {
            props.tree && props.tree.map(item => {
                return (
                    <Node
                        key={item.key}
                        title={item.title}
                        tree={item.children}
                        id={item.key}
                        checkable={props.checkable}
                    >
                    </Node>
                )
            })
        }
    </>
)

const Node = props => {
    if (props.id === '0') {
        return (
            <TreeContext.Consumer>
                {context => (
                    <>
                        {props.checkable && <input type="checkbox"></input>}
                        <span>{props.title}
                            <Tick />
                            <button
                                id={props.id}
                                onClick={() => { context.createNode(props.id) }}
                            >➕</button>
                        </span>
                        <ul>
                            {props.tree &&
                                <Tree tree={props.tree} checkable={props.checkable}></Tree>
                            }
                        </ul>
                    </>
                )}
            </TreeContext.Consumer>
        )
    }
    return (
        <TreeContext.Consumer>
            {
                context => (
                    <li style={{ listStyle: "none" }}>
                        {props.checkable && <input type="checkbox"></input>}
                        <button id={props.id} onClick={() => { context.deleteNode(props.id) }}>❌</button>
                        <span>
                            {props.title}
                            <input placeholder="Note"></input>
                            <Tick />
                            <button
                                id={props.id}
                                onClick={() => { context.createNode(props.id) }}
                            >➕</button>
                        </span>
                        <ul>
                            {props.tree &&
                                <Tree tree={props.tree} checkable={props.checkable}></Tree>
                            }
                        </ul>
                    </li>
                )
            }
        </TreeContext.Consumer>
    )

}


export default Tree;