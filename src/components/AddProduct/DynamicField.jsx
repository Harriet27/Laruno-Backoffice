import React, { useState } from 'react';
import Styled from 'styled-components';
export default function DynamicField(props) {
    const {
        handleAdd,
        handleChange,
        handleChangeContents,
        fields,
        handleRemove,
    } = props;

    console.log(fields, 'isi dari fields');

    return (
        <div className="App">
            <h1>Test Untuk learn about</h1>

            <button type="button" onClick={() => handleAdd()}>
                +
            </button>

            {/* --- Testing --- */}
            <div
                name="test"
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                {fields.map((field, idx) => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '200px',
                            }}
                            key={`${field}-${idx}`}
                        >
                            <label>Title</label>
                            <input
                                type="text"
                                name={`one-${idx}`}
                                placeholder="Enter text"
                                onChange={(e) => handleChange(idx, e)}
                            />
                            <label>Content</label>
                            <textarea
                                name={`number-${idx}`}
                                placeholder="Enter text"
                                onChange={(e) => handleChangeContents(idx, e)}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(idx)}
                            >
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
