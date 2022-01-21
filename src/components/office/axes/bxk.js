import React from "react";
import ReactTooltip from "react-tooltip";


const ToolTip = ({cell}) => {
    console.log(cell)
    const _afterShow = () => {

        console.log("after show");
    };

    return (
        <div className="App" >
            <button
                style={{
                    opacity:0,
                    position:"absolute",
                    width: '100%',
                    height: '100%',
                    right: 0,
                    top: 0,
                    zIndex: 13

            }}
                data-tip={cell.value}
                data-for={"tooltip"}
                data-event={"click"}
            >
            </button>

            <ReactTooltip
                id="tooltip"
                globalEventOff={"click"}
                afterShow={_afterShow}

            />
        </div>
    );
}

export default ToolTip