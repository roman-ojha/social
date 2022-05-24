type youtubeVideoDataType = {
  homePageVideos: {
    videoId: string;
    title: string;
    thumbnail: string;
  }[];
};

const youtubeData: youtubeVideoDataType = {
  homePageVideos: [
    //   English Songs
    {
      videoId: "4NRXx6U8ABQ",
      title: "The Weeknd - Blinding Lights (Official Video)",
      thumbnail:
        "https://i.ytimg.com/vi/4NRXx6U8ABQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDvETvQtaJawV6yIYO4SmuQ2Ud6gA",
    },
    {
      videoId: "Io0fBr1XBUA",
      title: "The Chainsmokers - Don't Let Me Down (Official Video) ft. Daya",
      thumbnail:
        "https://i.ytimg.com/vi/Io0fBr1XBUA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBVpzP6i4amgb0fk6uSUjDRazDp_g",
    },
    {
      videoId: "Pkh8UtuejGw",
      title: "Shawn Mendes, Camila Cabello - Señorita (Official Music Video)",
      thumbnail:
        "https://i.ytimg.com/vi/Pkh8UtuejGw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA_f2dwvbDSjx710wJ7KTwG9k5HgQ",
    },
    {
      videoId: "JGwWNGJdvx8",
      title: "Ed Sheeran - Shape of You (Official Music Video)",
      thumbnail:
        "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCtA7onuiJmHyjpL6XPfyW6d_fSeg",
    },
    {
      videoId: "CevxZvSJLk8",
      title: "Katy Perry - Roar (Official)",
      thumbnail:
        "https://i.ytimg.com/vi/CevxZvSJLk8/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDxJBUN3gZXVBZJdmFy_4WhcPUvUw",
    },
    {
      videoId: "jzD_yyEcp0M",
      title:
        "Marshmello & Anne-Marie - FRIENDS (Music Video) *OFFICIAL FRIENDZONE ANTHEM*",
      thumbnail:
        "https://i.ytimg.com/vi/jzD_yyEcp0M/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLARVwMZv1KSTDKTW8SVeN4OsPlAaA",
    },
    // Hindi Songs
    {
      videoId: "VOLKJJvfAbg",
      title:
        "Bekhayali Full Song | Kabir Singh | Shahid K,Kiara A|Sandeep Reddy Vanga | Sachet-Parampara | Irshad",
      thumbnail:
        "https://i.ytimg.com/vi/VOLKJJvfAbg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC1gzIvFtYzNk46ywJn3UvEe4147g",
    },
    {
      videoId: "sAzlWScHTc4",
      title:
        "Naacho Naacho (Full Video) RRR - NTR, Ram Charan | M M Kreem | SS Rajamouli | Vishal Mishra & Rahul",
      thumbnail:
        "https://i.ytimg.com/vi/sAzlWScHTc4/hq720.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDZpvBnlJxypvc1lEiWdGeQmU0afg",
    },
    {
      videoId: "ZmcBC9-wAXM",
      title:
        "Qaafirana | Kedarnath | Sushant Rajput | Sara Ali Khan | Arijit Singh & Nikhita | Amit Trivedi",
      thumbnail:
        "https://i.ytimg.com/vi/ZmcBC9-wAXM/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCAMVzudTzBRJMpy1RfD9RVWi1OYA",
    },
    // Nepali Songs
    {
      videoId: "sTbBZFoVk3U",
      title:
        "Dubo Phulyo || KABADDI KABADDI KABADDI - Movie Song || Dayahang Rai, Upasana Singh, Karma, Wilson",
      thumbnail:
        "https://i.ytimg.com/vi/sTbBZFoVk3U/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCWz3YzUbHEDyR9iP_jDyOnaPrfFg",
    },
    {
      videoId: "wzH8bVWrxJg",
      title:
        "NACHA FIRIRI || Mahesh Kafle Ft. Melina Rai || Nischal Basnet || Swastima Khadka || Kristal Klaws",
      thumbnail:
        "https://i.ytimg.com/vi/wzH8bVWrxJg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBxzsYjafXvf8twZuBV6krPfB22ow",
    },
    {
      videoId: "Pkj6YFJFI8U",
      title:
        "Malai Nasodha | Narayan Gopal | Hari Bhakta Katuwal | Nepali Song",
      thumbnail:
        "https://i.ytimg.com/vi/Pkj6YFJFI8U/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCKoW0t42jisb71np-rXQpaRqdn8g",
    },
    // Technology
    {
      videoId: "cV5TjZCJkuA",
      title: "This Smartphone Changes Everything...",
      thumbnail:
        "https://i.ytimg.com/vi/cV5TjZCJkuA/hq720.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD5WjwsfI3Ydp4BdzdM_XTMW40E_w",
    },
    {
      videoId: "JJ5WP2BKigc",
      title: "Unboxing The Mind Bending Wallpaper TV...",
      thumbnail:
        "https://i.ytimg.com/vi/JJ5WP2BKigc/hq720.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBSoFfDppYrtkrEPrbOBHGeflLmjQ",
    },
    {
      videoId: "4XsfwD1ZwlU",
      title: "5 Majedaar Gadgets I bought Online !",
      thumbnail:
        "https://i.ytimg.com/vi/4XsfwD1ZwlU/hq720.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAlILcDtJlSWV24LU-NZXrQ2vX88w",
    },
    {
      videoId: "mr9kK0_7x08",
      title: "Tesla Factory Tour with Elon Musk!",
      thumbnail:
        "https://i.ytimg.com/vi/mr9kK0_7x08/hq720.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBNQantjqYxttVwhZdkj2P_bMKI_A",
    },
    {
      videoId: "DyKQ7qtTJag",
      title: "Tesla Model S PLAID Impressions: Re-Inventing the Wheel!",
      thumbnail:
        "https://i.ytimg.com/vi/DyKQ7qtTJag/hq720.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDA65r99jYgTgw56Iq8z-GNTYGZ4A",
    },
    {
      videoId: "eQ_8F4nzyiw",
      title: "Building a PC... using only Wish.com",
      thumbnail:
        "https://i.ytimg.com/vi/eQ_8F4nzyiw/hq720.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCycY-XSAS7rMWBkkYJ88g9tcDvng",
    },
    // South indian movies
    {
      videoId: "ULEQb_l-N08",
      title:
        "K.G.F Full Movie | Yash, Srinidhi Shetty, Ananth Nag, Ramachandra Raju, Achyuth Kumar, Malavika",
      thumbnail:
        "https://i.ytimg.com/vi/ULEQb_l-N08/hq720.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAOcXIvc_Pory6QdV-Yd1EUjHevEQ",
    },
    {
      videoId: "zzhfvt5vZHI",
      title:
        "Dear Comrade (2020) New Released Hindi Dubbed Full Movie | Vijay Devarakonda, Rashmika, Shruti",
      thumbnail:
        "https://i.ytimg.com/vi/zzhfvt5vZHI/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAaGeagcNVD-sL1qRIe-bemYDiedg",
    },
  ],
};

export default youtubeData;
