import React from 'react';

export default function TestImage(props) {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <input
                    type="file"
                    name="file"
                    id={props.id}
                    onChange={props.onChange}
                />
                <button>Upload</button>
            </form>
        </div>
    );
}
