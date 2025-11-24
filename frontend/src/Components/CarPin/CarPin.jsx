
import carImg from '../../assets/blue-car.png'
import "./CarPin.css"

const CarPin = () => {
  return (
    <div className="car-container">
      <div className="bubble">Park here?</div>
      <img src={carImg} alt="Blue car" className="car-image" />
    </div>
  );
};

export default CarPin;
