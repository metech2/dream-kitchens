import CustomImage from "./CustomImage"

export default function HeroSection(){
    const images = [
        "/img/img_1.jpg",
        "/img/img_2.jpg",
        "/img/img_3.jpg",
        "/img/img_4.jpg",
        "/img/img_5.jpg",
        "/img/img_6.jpg",
        "/img/img_7.jpg",
        "/img/img_8.jpg",
        "/img/img_9.jpg"
    ]
    return(
        <div className="section hero">
            <div className="col typoghraphy"> 
                <h1 className="title">What Are We About</h1>
                <p className="info">Dream Kitchens adalah tempat mencari ide memasakmu, so exploring now! </p>
                <button className="btn">Explore Now</button>
            </div>
            <div className="col gallery">
                {images.map((src, index)=> (
                    <CustomImage key={index} imgsrc={src} pt={"90%"}/>
                ))}

            </div>
        </div>
    )
}