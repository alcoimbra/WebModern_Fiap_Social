import { Container, IconSignOut } from "./styles";
import { useEffect, useState } from "react";
import imgLogo from "../../assets/profileStandard.png";
import imgProfileStandard from "../../assets/profileStandard.png";
import { getUser } from "../../services/security";
import { api } from "../../services/api";

function Header() {
    const [ imgProfile, setImgProfile ] = useState(imgProfileStandard);

    let signedUser = getUser();

    useEffect(() => {
        setImgProfile(signedUser.image != null ? signedUser.image : imgProfileStandard);
    }, []);

    const handleFileInputChange = async (e) => {
        const imageFile = e.target.files[0];

        if (!imageFile) {
            return alert("Selecione uma Imagem");
        }

        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)){
            return alert("Selecione uma Imagem Válida");
        }

        try {
            var _URL = window.URL || window.webkitURL;
            var img = new Image();

            img.onload = function() {
                if (this.width === this.height) {
                    upload(imageFile);
                } else {
                    return alert("Selecione apenas Imagens Quadradas")
                }
            };

            img.src = _URL.createObjectURL(imageFile);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const upload = async (imageFile) => {
        const data = new FormData();

        data.append("image", imageFile);

        const response = await api.post(`/students/${ signedUser.studentId }/images`, data, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        });

        setImgProfile(response.data.image != null ? response.data.image : imgProfileStandard);
    }

    return (
        <Container>
            <div>
                <input accept="image/*" type="file" id="uploadImg" onChange={ handleFileInputChange } style={{ display: 'none' }} />
                <img src={ imgLogo } id="logo" />
                <label htmlFor="uploadImg">
                    <img src={ imgProfile } id="imgProfile" className="profile-img" />
                </label>
                <p>{ signedUser.name }</p>
            </div>
            <IconSignOut />
        </Container>
    )
}

export default Header;