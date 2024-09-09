import { CartContext } from '@/utils/ContextReducer';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';

function Card(props) {
    const data = props.foodData;
    const {state, dispatch} = useContext(CartContext);
    const priceOptions = Object.keys(data.price);
    const [size, setSize] = useState(priceOptions[0]);
    const [qty, setQty] = useState(1);
    
    const handleQty = (e) => {
        setQty(Number(e.target.value));
    };

    const handleSize = (e) => {
        setSize(e.target.value);
    };

    const handleAddToCart = async() => {
        const updateItem = await state.find(
            (item)=> item.tempId === data["_id"] + size
        );
        if(!updateItem){
            dispatch({
                type:"ADD",
                id:data["_id"],
                tempId:data["_id"]+size,
                name:data.name,
                price:finalPrice,
                qty:qty,
                priceOptions:size,
                img:data.img
            });
        }
        if(updateItem){
            dispatch({
                type:"UPDATE",
                tempId:data["_id"]+size,
                price:finalPrice,
                qty:qty,
                
            });
        }
       // console.log(state);

    };

    // Ensure `qty` and `data.price[size]` are numbers
    const finalPrice = qty * (parseInt(data.price[size]) || 0);

    return (
        <div className="box">
            <div className="w-80 rounded-lg bg-white dark:bg-black border-gradient">
                <Link href={{pathname:"/Item/[item]"}} as={`Item/${data["_id"]}`}>
                <div className="relative w-full h-80">
                    <Image
                        src={data.img}
                        fill // use 'fill' for the layout
                        alt="pizza"
                        style={{ objectFit: 'cover' }} // Apply objectFit through style
                    />
                </div>
                <div className="p-4">
                    <div className="font-bold mb-2 text-xl uppercase">{data.name}</div>
                    <p className="short_description text-gray-700 dark:text-gray-400 text-base">
                        {data.description}
                    </p>
                </div>
                <div className="flex px-4 justify-between">
                    <select 
                        className="h-100 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
                        onChange={handleQty}
                        value={qty}
                    >
                        {Array.from(Array(6), (e, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                    <select 
                        className="h-100 p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300 border border-black dark:border-gray-400 rounded"
                        onChange={handleSize}
                        value={size}
                    >
                        {priceOptions.map((option) => (
                            <option className="uppercase" key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex p-4 font-bold justify-between">
                    <button onClick={handleAddToCart} className="border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100">
                        Add to cart
                    </button>
                    <p className="p-2 text-xl">₹{finalPrice}/-</p>
                </div>
                </Link>
            </div>
        </div>
    );
}

export default Card;
