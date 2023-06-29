import axios from "axios";

export async function getStaticPaths() {
  // Fetch the list of pages from your WordPress backend
  //   const response = await axios.get(
  //     "http://localhost/fuse-wp/index.php/wp-json/wp/v2/pages"
  //   );
  //   const pages = Array.isArray(response.data) ? response.data : [];

  //   // Generate paths for all the pages with their slugs
  //   const paths = pages.map((page) => ({
  //     params: {
  //       slug: page.slug,
  //     },
  //   }));
  //   console.log({ paths });
  //   return {
  //     paths,
  //     fallback: false,
  //   };
  return {
    paths: [],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const response = await axios.get(
    `http://localhost/fuse-wp/index.php/wp-json/wp/v2/pages?slug=${slug}`
  );
  const page = response.data[0];

  return {
    props: {
      page,
    },
  };
}

export default function Page({ page }) {
  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <h1>{page?.title?.rendered}</h1>
      <div
        className="content-container"
        dangerouslySetInnerHTML={{ __html: page?.content?.rendered }}
      />
    </div>
  );
}

// SSR
// import axios from "axios";

// export default function Page({ page }) {
//   return (
//     <>
//       <div style={{ width: "70%", margin: "auto" }}>
//         <h1>{page.title.rendered}</h1>
//         <div
//           className="content-container"
//           dangerouslySetInnerHTML={{
//             __html: page.content.rendered,
//           }}
//         />
//       </div>
//     </>
//   );
// }

// export async function getServerSideProps({ params }) {
//   const { slug } = params;

//   const response = await axios.get(
//     `http://localhost/fuse-wp/index.php/wp-json/wp/v2/pages?slug=${slug}`
//   );
//   const page = response.data[0];

//   return {
//     props: {
//       page,
//     },
//   };
// }
