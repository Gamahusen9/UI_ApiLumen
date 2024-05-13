export default function title(props){
    return(
        <>
        <h1 className="text-white">Nama: {props.name}</h1>
        <p className="text-white">Page: {props.page}</p>
        <p className="text-white">Lang: {props.lang}</p>
        </>
    )
}