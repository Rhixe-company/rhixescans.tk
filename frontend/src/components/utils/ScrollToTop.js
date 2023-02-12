import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const mybutton = document.getElementById("btn-back-to-top");
  window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  mybutton?.addEventListener("click", backToTop);
  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-danger btn-sm btn-floating btn-lg"
        id="btn-back-to-top"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default ScrollToTop;
