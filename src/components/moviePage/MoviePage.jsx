import styles from "./moviePage.module.css"


const MoviePage = ()=>{
    return(<>
    <div className={styles.heroSmall}>
        <div className={styles.title}>Lorem, ipsum dolor.</div>
    </div>
        <div className={styles.heroContainer}>
            <div className={styles.content}>
                <div className={styles.title}>Lorem ipsum dolor sit.</div>
                <div className={styles.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis repellat soluta, amet inventore iure alias hic provident unde possimus cum culpa itaque voluptas minima! Incidunt quibusdam corrupti aliquid ipsum dolorum mollitia delectus voluptates odio voluptatum labore, ab, iusto magni. Laboriosam consequatur similique odio qui magnam minima in molestias quasi dolorem!</div>
                <div className={styles.info}>
                    <span>
                    <span>IMDb 6.5</span>
                    <span>2 h 58 min</span>
                    <span>2023</span>
                    </span>
                    <span className={styles.stamps}>
                    <span>X-RAY</span>
                    <span>HDR</span>
                    <span>UHD</span>
                    <span>U/A 13+</span>
                    </span>
                </div>
                <div className={styles.genreList}>
                    <span>Comedy</span>
                    <span>Drama</span>
                    <span>International</span>
                    <span>Romance</span>
                </div>
                <div className={styles.button}>
                    <span><button>A</button></span>
                    <span><button>B</button></span>
                    <span><button>C</button></span>
                    <span><button>D</button></span>
                </div>
            </div>
        </div>
        </>
    )
}

export default MoviePage;