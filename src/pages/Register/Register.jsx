// import React, { useState } from "react";

// export default function Register() {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//     });
//     // logic ketika di submit
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (
//             form.name === "" ||
//             form.email === "" ||
//             form.password === "" ||
//             form.phone === ""
//         ) {
//             alert("registrasi dulu dong heyy");
//         } else {
//             alert("berhasil");
//         }
//     };
//     // untuk handlechange
//     const handleChange = (event) => {
//         setForm({ ...form, [event.target.name]: event.target.value });
//     };
//     console.log(form);
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Fullname</label>
//                     <div>
//                         <input
//                             type="text"
//                             name="name"
//                             id="name"
//                             required
//                             value={form.name}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>
//                 {/* section */}
//                 <div>
//                     <label>Email</label>
//                     <div>
//                         <input
//                             type="email"
//                             name="email"
//                             id="email"
//                             value={form.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                 </div>
//                 {/* section */}
//                 <div>
//                     <label>Password</label>
//                     <div>
//                         <input
//                             type="password"
//                             name="password"
//                             id="password"
//                             value={form.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                 </div>
//                 {/* section */}
//                 <div>
//                     <label>Phone Number</label>
//                     <div>
//                         <input
//                             type="number"
//                             name="phone"
//                             id="phone"
//                             value={form.phone}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                 </div>
//                 {/* section */}
//                 <button>register</button>
//             </form>
//         </div>
//     );
// }
