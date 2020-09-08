import Swal from "sweetalert2";
// import jwt_decode from "jwt-decode";
const fetchPostProducts = (form, history) => async (dispatch) => {
    const url = `http://139.162.59.84:7000/api/v1/products`;
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    console.log(token);
    const options = {
        body: JSON.stringify(form),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${token}`,
        },
    };
    console.log(options, "ini options");
    const response = await fetch(url, options);
    await response.json();

    if (response.status === 201) {
        Swal.fire({
            title: "Add Succes!",
            text: "",
            icon: "success",
        });

        history.push("/");
    }
};

export { fetchPostProducts };
