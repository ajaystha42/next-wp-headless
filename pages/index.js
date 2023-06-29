import styles from "../styles/Home.module.css";
import Image from "next/image";
import mypic from "../asset/thumbnail.jpeg";
import Link from "next/link";
import axios from "axios";

export const API_SERVER_LINK =
  "http://localhost/fuse-wp/index.php/wp-json/wp/v2/";

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div style={{ paddingLeft: "20px" }}></div>
        <div className={styles.grid}>
          {data.map((post, index) => {
            return (
              <Link key={index} className={styles.card} href={`/${post.slug}`}>
                <div style={{ overflow: "hidden" }}>
                  {/* <Image
                    src={mypic}
                    alt="Picture of the author"
                    // className="img-class"
                  /> */}
                </div>
                <h2>{post.title.rendered}</h2>
                {/* <p>{post.content.rendered}</p> */}
                <p>
                  <strong>Status</strong>: {post.status}
                </p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get(`${API_SERVER_LINK}pages`);
  const { data } = res;
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
}
