// import rp from "request-promise";

const scrape = {
  scrapeYoutubeHomePage: () => {
    // // rp("https://youtube.com").then((html) => {
    // //   console.log(html);
    // // });

    function makeHttpObject() {
      if ("XMLHttpRequest" in window) return new XMLHttpRequest();
    }

    var request = makeHttpObject();
    request.open(
      "GET",
      "https://cors-anywhere.herokuapp.com/https://www.youtube.com/",
      true
    );
    request.setRequestHeader("origin", "x-requested-wit");
    request.send(null);
    request.onreadystatechange = function () {
      if (request.readyState === 4) console.log(request.responseText);
    };
  },
};

export default scrape;
