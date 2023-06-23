import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter as nav } from "next/navigation";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const navRouter = nav();

  useEffect(() => {
    const getPostById = async () => {
      const res = await fetch(
        `http://localhost/wordpress/index.php/wp-json/wp/v2/pages/${id}`
      );
      const data = await res.json();
      setPost(data);
    };

    if (id) getPostById();
  }, [id]);

  const onDeleteHandler = async () => {
    const headers = new Headers();

    const username = "ajay";
    const password = "G4uR KaXO o644 feEh u0yF PjnN";

    headers.set("Content-Type", "application/json");
    headers.set(
      "Authorization",
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    );

    const res = await fetch(
      `http://localhost/wordpress/index.php/wp-json/wp/v2/pages/${id}`,
      {
        method: "DELETE",
        headers,
      }
    );
    if (res.status == 200) {
      alert("Post Deleted Succesfully!!");
      navRouter.push("/");
    }
  };

  return (
    Object.keys(post).length !== 0 && (
      <>
        {/* <p>
          <strong>Id</strong>: {post.id}
        </p>
        <p>
          <strong>Title</strong>: {post.title.rendered}
        </p>
        <p>
          <strong>Status</strong>: {post.status}
        </p>
        <p>
          <strong>Type</strong>: {post.type}
        </p> */}
        {/* <p> */}
        {/* <strong>Content</strong>: */}

        <div style={{ width: "70%", margin: "auto" }}>
          <h1>{post.title.rendered}</h1>
          <div
            className="content-container"
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
            // style={{ width: "70%", margin: "auto" }}
          />
          <span
            style={{
              color: "red",
              marginTop: "15px",
              cursor: "pointer",
            }}
            onClick={onDeleteHandler}
          >
            DELETE
          </span>
        </div>

        {/* </p> */}
        {/* <p>
          <strong> Modified Time</strong>:
          {moment(post.modified_gmt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </p> */}
      </>
    )
  );
};

export default Post;
