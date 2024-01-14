import $ from "jquery";

const setupAccordion = () => {
  $(".toggleButton").on("click", function () {
    // $(".svg-victorina").html(
    //   '<line x1="12" y1="5" x2="12" y2="19" stroke="black" stroke-width="2"/>' +
    //     '<line x1="5" y1="12" x2="19" y2="12" stroke="black" stroke-width="2"/>'
    // );

    const isExpanded = $(this).attr("aria-expanded") === "true";
    const value = $(this).attr("data-bs-target");
    const svgIcon = $(`svg[data-bs-target="${value}"]`);

    if (isExpanded) {
      svgIcon.html(
        '<line x1="12" y1="5" x2="12" y2="19" stroke="black" stroke-width="2"/>' +
          '<line x1="5" y1="12" x2="19" y2="12" stroke="black" stroke-width="2"/>'
      );
    } else {
      if ($(this).hasClass("btn-togle-victorina")) {
        svgIcon.html(
          '<line x1="5" y1="12" x2="19" y2="12" stroke="black" stroke-width="2"/>'
        );
      }
    }
  });
};

export default setupAccordion;
