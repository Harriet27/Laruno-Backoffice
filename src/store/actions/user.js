import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
const fetchPostLogin = (form, history) => async (dispatch) => {
    try {
        const url = `http://139.162.59.84:7000/api/v1/users/login`;
        const options = {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "content-type": "application/json",
            },
        };

        const response = await fetch(url, options);
        const result = await response.json();

        if (response.status === 201) {
            Swal.fire({
                title: "Berhasil Login!",
                text: "",
                icon: "success",
            });
            localStorage.setItem("user", JSON.stringify(result));
            history.push("/products");
        } else if (response.status === 401) {
            localStorage.clear();
        } else {
            Swal.fire({
                title: "Wrong email!",
                text: "Email atau kata sandi anda tidak valid",
                icon: "error",
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Email atau Password Salah!",
            text: "",
            icon: "error",
        });
    }
};
export { fetchPostLogin };