import { CardComent } from "./styles";
import { format } from "date-fns";
import imgProfile from "../,,/assets/profile.png";
import { getUser } from "../../services/security";

function Comment({ data }) {
    let signedUser = getUser();

    return (
        <CardComent>
            <header>
                <img src={ imgProfile } />
                
                <div>
                    <p>por { signedUser.studentId === data.Student.id ? "você" : data.Student.name }</p>
                    <span>em { format(new Date(data.create_at), "dd/mm/yyyy 'às' HH:mm" )}</span>
                </div>
            </header>
            <p>{ data.description } </p>
        </CardComent>
    );
}

export default Comment;