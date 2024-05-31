import img2 from "../../../assets/gallary/image2.jpg";
import img3 from "../../../assets/gallary/image3.jpg";
import img4 from "../../../assets/gallary/image4.jpg";
import img5 from "../../../assets/gallary/image5.jpg";

const allImg = [img2, img3, img4, img5];

const ImageGrid = () => {
  return (
    <div className="gap-4 grid grid-cols-2 items-start">
      {allImg.map((img, index) => (
        <div key={index}>
          <img
            src={img}
            alt="404 img banner"
            className="md:h-[350px] rounded-sm"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
