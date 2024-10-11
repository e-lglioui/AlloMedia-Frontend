import { useSelector } from "react-redux";


const Redu = () => {
    const { value } = useSelector(state => state.counter);
    console.log(value);
    

    return (
        <>

            <h1> {value} </h1>

        </>
    )
};

export default Redu;
