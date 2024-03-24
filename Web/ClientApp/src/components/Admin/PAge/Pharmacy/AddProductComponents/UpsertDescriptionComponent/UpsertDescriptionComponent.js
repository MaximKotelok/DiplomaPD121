import React, { useState } from 'react';
import styles from "./UpsertDescriptionComponent.module.css"
import "./CustomReactQuilStyles.css"
import ReactQuill from 'react-quill';

const UpsertDescriptionComponent = ({ descriptionName, description, setDescription, className }) => {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['blockquote', 'code-block'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'blockquote', 'code-block',
        'script',
    ];



    return (
        <div>
            <div className={`${className}`}>
                <p className='product-label'>{descriptionName}</p>
                <div>

                    <ReactQuill
                        className={styles["quill"]}
                        modules={modules}
                        formats={formats}
                        theme="snow"
                        value={description}
                        onChange={a => { setDescription(a) }}
                    />
                </div>
            </div>
        </div>


    )

}


export default UpsertDescriptionComponent;
