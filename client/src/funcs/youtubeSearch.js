import yts from "yt-search";

const searchYoutubeVideos = async (query) => {
  const r = await yts(query);
  const video = r.videos.slice(0, 50);
  video.forEach(function (v) {
    const views = String(v.views).padStart(10, " ");
    console.log(`${views} | ${v.title} (${v.timestamp}) | ${v.author.name}`);
  });
};

export default searchYoutubeVideos;
