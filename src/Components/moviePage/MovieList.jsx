const movies = [
  [
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/atlas_basic.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/atlas_silver.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/atlas_gold.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/atlas.vtt"
  ],
  [
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/sonic_basic.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/sonic_silver.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/sonic_gold.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/sonic.vtt"
  ],
  [
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/shaw_basic.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/shaw_silver.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/shaw_gold.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/shaw.vtt"
  ],
  [
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/inter_basic.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/inter_silver.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/inter_gold.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/new_inter.vtt"
  ],
  [
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/madmax_basic.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/madmax_silver.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/madmax_gold.m3u8",
    "https://opensoft-video-gehvced7g6fbhrfc.z02.azurefd.net/testing/madmax.vtt"
  ],
];

function chooseMovie(title) {
  return movies[title.charCodeAt(0) % 5];
}

export default chooseMovie;
