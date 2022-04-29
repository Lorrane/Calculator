import React from "react";

function Button({ button, onClick, className }) {
    return (
        <button
            onClick={() => {
                onClick(button);
            }}
            className={className}
        >
            {button}
        </button>
    );
}

export default Button;
