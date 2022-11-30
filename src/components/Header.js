import icon from "../assets/svg/headerIcon.svg";

export default function Header() {
  return (
    <div className="header">
      <div>
        <img src={icon} alt="icon"></img>
        <span className="header-text">
          to<span>do</span>
        </span>
      </div>
    </div>
  );
}
