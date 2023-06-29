import axios from "axios";

export async function getServerSideProps({ params }) {
  const { slug } = params;
    
  // Make a request to your WordPress backend to fetch the page content
  const response = await axios.get(
    `http://localhost/fuse-wp/index.php/wp-json/wp/v2/pages?slug=${slug}`
  );
  const page = response.data[0]; // Assuming the response is an array with a single page

  return {
    props: {
      page,
    },
  };
}

export default function Page({ page }) {
  return (
    <div>
      {/* Render the page content */}
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
