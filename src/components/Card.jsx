export default function Card(props){
    return(
        <>
        <div className="bg-gray-800 border-gray-600  w-5/6 rounded-lg p-6 mt-10 ">
        <h1 className="text-white text-2xl pb-4">{props.judul}</h1>
        <p className="text-white">{props.content}</p>
        </div>
        </>
    )
}