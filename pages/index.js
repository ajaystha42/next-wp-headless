import styles from "../styles/Home.module.css";
import Image from "next/image";
import mypic from "../asset/thumbnail.jpeg";
import Link from "next/link";

export default function Home({ data }) {
  // const newData = data.forEach( (post, ind) => {
  //   const imgLink =
  //     post?._links["wp:featuredmedia"]?.length > 0
  //       ? post._links["wp:featuredmedia"][0].href
  //       : "";
  //   if (imgLink) {
  //     const imgUrl = await getImage(imgLink);
  //     return {
  //       ...post,
  //       featuredImage: imgUrl,
  //     };
  //   }
  // });
  // console.log({ newData });
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div style={{ paddingLeft: "20px" }}>
          {/* <Link href="/posts/create">
            <button>Create Post</button>
          </Link> */}
        </div>
        <div className={styles.grid}>
          {data.map((post, index) => {
            return (
              <Link
                key={index}
                className={styles.card}
                href={`pages/${post.id}`}
              >
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
  const res = await fetch(
    "http://localhost/wordpress/index.php/wp-json/wp/v2/pages"
  );
  const data = await res.json();
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
