import { postToServer, postPhotoToServer } from '../utils/Queries';
import React, { useState } from 'react';

const CombinedComponent = () => {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        categoryId: '',
        specialRow: '',
    });

    const [selectedFile, setSelectedFile] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handlePhotoSelect = (e) => {
        const selectedFile = e.target.files[0];
        setSelectedFile(selectedFile);
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();

        const { title, description, categoryId, specialRow } = product;
        let pathToPhoto = "";

        const formData = new FormData();
        formData.append("file", selectedFile);
        let a = await postPhotoToServer("Photo/Add", "product", formData);
        pathToPhoto = a.data;

        const data = await postToServer('Medicine', {
            Title: title,
            Description: description,
            CategoryId: categoryId,
            SpecialRow: specialRow,
            PathToPhoto: pathToPhoto,
        });

        console.log(data);

        setProduct({
            title: '',
            description: '',
            categoryId: '',
            specialRow: '',

        });
    };

    return (
        <div>
            <form enctype="multipart/form-data">
                <div>
                    <label>
                        Title:
                        <input
                            name="title"
                            type="text"
                            value={product.title}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        CategoryId:
                        <input
                            name="categoryId"
                            type="text"
                            value={product.categoryId}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        SpecialRow:
                        <input
                            name="specialRow"
                            type="text"
                            value={product.specialRow}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Select Photo:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoSelect}
                        />
                    </label>
                </div>

                <button type="button" onClick={handleProductSubmit}>
                    Send
                </button>
            </form>
        </div>
    );
};
export default CombinedComponent;