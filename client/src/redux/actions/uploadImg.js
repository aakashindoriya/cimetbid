export function uplodeFile(pics, setPic,setPicLoading) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "aakash");
    data.append("cloud_name", "ddwzcxybx");
    setPicLoading(true)
    fetch("https://api.cloudinary.com/v1_1/ddwzcxybx/image/upload", {
        method: "post",
        body: data,
    })
        .then((res) => res.json())
        .then((data) => {
            setPicLoading(false)
            setPic(data.url.toString());
            console.log(data.url.toString());

        })
        .catch((err) => {
            setPicLoading(false)
            console.log(err);

        });
}