// to debug stuff like api calls
import { useState } from 'react';
import { withApiData, queries } from "../api";
// import { useMutation } from "@apollo/client";
// import { mutations } from "@/api";
import { CldImage, CldUploadWidget } from 'next-cloudinary';

function DataView(props) {
  const { data } = props;

  console.log(data);
  return <p>{JSON.stringify(data, null, 2)}</p>;
}

console.log(queries.home);
const Home = withApiData({ query: queries.home })(DataView);
const Team = withApiData({
  query: queries.team,
  propMapper: (props) => ({ id: props.id }),
})(DataView);

function DebugView(props) {
  const [uploadInfo, updateUploadInfo] = useState();
  const [uploadError, updateUploadError] = useState();

  function handleOnUpload({ event, info }, widget) {
    console.log("handleOnUpload", event, info);
    if (event === "success") {
      updateUploadInfo(info);
    }
    widget.close({
      quiet: true
    });
  }

  function handleOnUploadError(error) {
    console.error("handleOnUploadError", error);
    updateUploadError(error);
  }

  // example for using mutations:
  // const [createTeam, { data, loading, error }] = useMutation(mutations.createTeam)

  // const onSubmit = async () => {
  //   try {
  //     const createdTeam = await createTeam({
  //       variables: {
  //         data: {
  //           name: "Bike Gang",
  //           members: [{ name: "Tina" }, { name: "Jan" }]
  //         }
  //       }
  //     })
  //     console.log(createdTeam)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  console.log(props.data);
  return (
    <div>
      <h1>debug view</h1>
      <h2>Home</h2>
      <Home></Home>
      <h2>Team</h2>
      <Team id="366821575551353037"></Team>
      <h1>Cloudinary Image Upload</h1>
      <CldUploadWidget options={{ sources: ['local', 'camera'] }} onUpload={handleOnUpload} onError={handleOnUploadError}>
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <button className="button" onClick={handleOnClick}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
      {uploadError && <p>{uploadError.status}</p>}

      {uploadInfo && (
        <>
          {uploadInfo.resource_type === 'image' && (
            <p><CldImage width={uploadInfo.width} height={uploadInfo.height} src={uploadInfo.path} alt="Uploaded image" /></p>
          )}
          <p>{uploadInfo?.secure_url}</p>
        </>
      )}
    </div>
  );
}

export default DebugView;
