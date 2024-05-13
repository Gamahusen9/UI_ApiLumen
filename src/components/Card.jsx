export default function Card(props){
    return(
        <>
        <div className="bg-gray-800 border-t border-gray-600  shadow rounded-lg  w-3/4 w-full p-6 mt-10 ">
        <h1 className="text-white">Judul : {props.judul}</h1>
        <p className="text-white">Content: {props.content}</p>
        </div>
        </>
    )
}