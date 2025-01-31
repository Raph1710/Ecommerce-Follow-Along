//eslint-disable-next-line
import React, {useState} from 'react'
import {AiOutlinePlusCircle} from "react-icons/ai";
import axios from "axios";

const CreateProduct = () => {
    const [image, setImage] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags,setTags] = useState('');
    const [price, setPrice] = useState("");
    const [stock,setStock]=useState("");
    const [email, setEmail] = useState("");

    const categoriesData = [
        {title: "Electronics"},
        {title: "Fashion"},
        {title: "Books"},
        {title: "Home Appliances"}
    ]

    const handleImagesChange=(e)=>{
        const files = Array.from(e.target.files);
        setImage((previewImages)=>previewImages.concat(files));
        const imagePreviews=files.map((file)=> URL.createObjectURL(file));
        setPreviewImages((prevPreviews)=>prevPreviews.concat(imagePreviews));
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("Hi");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("email", email);
    
        image.forEach((image)=>{
            formData.append("images", image);

        })

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        "Accept": "any",
      },
    };

    axios.post("http://localhost:8000/api/v2/product/productcreate", formData, config).then((res) => { 
    console.log("Response: ", res.data)}) // Log successful response
    .catch((err) => { console.log("Error: ", err)}); // Log error
    };

    return (
        <div className="min-h-screen bg-gradient-to-bl from-red-500 to-yellow-400 px-6 py-12 flex flex-col justify-center sm:px-9 lg:px-8">
            <div className="w-[90%] max-w-[600px] bd-white shadow h-auto rounded-[4px] p-4 mx-auto  ">
                <h5 className="mt-6-text-center text-3xl font-bold text-gray-900">Create Product</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Email <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required/>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Name <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product name"
                            required/>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Description <span className="text-sm text-red-500">*</span>
                        </label>
                        <textarea
                            value={description}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product's description"
                            rows="5"
                            required/>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option className="blocktext-s font-medium text-gray-700" value="">Select a category</option>
                            {categoriesData.map((category) => (
                                <option key={category.title} value={category.title}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Tags <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={tags}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter product's Tags"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Price <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={price}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter product's price"
                            required/>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Stock <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={stock}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="Enter stock quantity"
                            required/>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Upload Images <span className="text-sm text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            id="upload"
                            className="hidden"
                            onChange={handleImagesChange}
                            required/>

                        <label htmlFor="upload" className="cursor-pointer p-2">
                            <AiOutlinePlusCircle size={20} color="#555"/>
                        </label>
                        <div className="flex flex-wrap items-center justify-center p-2">
                            {previewImages.map((img,index)=>(
                            <img
                            src={img}
                            key={index}
                            alt="Preview"
                            className="object-cover object-center"/>
                        ))}
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center p-2">Create</button>
                </form>
            </div>
        </div>
    )

}

export default CreateProduct;