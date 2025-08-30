import axios from "axios";
import Swiper from "swiper";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const ul = document.querySelector(".swiper-wrapper");

const baseurl = "https://sound-wave.b.goit.study/api";

async function getFeedbacks(page = 1) {
  const endPoint = "/feedbacks";
  const url = baseurl + endPoint;
  const params = {
    limit: 10,
    page,
  };
  try {
    const res = await axios.get(url, { params });
    return res.data;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
  }
}

function renderFeedbacks(data) {
  return data
    .map(
      (feedback) =>
        `<li class="swiper-slide">
        <h1>${feedback.descr}</h1>
        <p>${feedback.name}</p>
      </li>`
    )
    .join("");
}

async function renderAllFeedbacks() {
  try {
    const response = await getFeedbacks();
    console.log("API response:", response);
    if (response && response.data && response.data.length > 0) {
      const markup = renderFeedbacks(response.data);
      console.log("Generated markup:", markup);
      ul.insertAdjacentHTML("beforeend", markup);

      const swiper = new Swiper(".mySwiper", {
        modules: [Navigation, Autoplay, Pagination],

        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
        loop: true,

        spaceBetween: 30,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

renderAllFeedbacks();
