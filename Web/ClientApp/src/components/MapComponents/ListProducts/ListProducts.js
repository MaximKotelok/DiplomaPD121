const ListPharmacies = (props) => {

    const handleReserve = (id) => {
        console.log(`reserve: ${id}`)
    };

    return (
        <div>
            <h1>Products in {props.city}</h1>
            <ul>
                {props.townProducts.map(product => (
                    <li
                        key={product.id}
                        style={{
                            border: '2px solid #000',
                            padding: '10px',
                            color: props.selectedProduct && props.selectedProduct.id === product.id ? 'red' : 'black'
                        }}
                        onClick={() => { 
                            props.onProductClick(product)
                            if (props.onMapSelect) {
                                props.onMapSelect(product);
                            }
                        }}
                    >
                        <p>{product.pharmacy.address}, {product.pharmacy.longitude},{product.pharmacy.latitude}</p>
                        <p>{product.product.title}, {product.price}</p>
                        <p>{product.product.manufacturer.name}</p>
                        <button onClick={() => {
                            const mapsUrl = `https://www.google.com/maps?q=${product.pharmacy.longitude},${product.pharmacy.latitude}&z=15&t=m`;
                            window.open(mapsUrl, '_blank');
                        }}>Open Map</button>
                        <button onClick={() => { handleReserve(product.id) }}>Reserve</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ListPharmacies;