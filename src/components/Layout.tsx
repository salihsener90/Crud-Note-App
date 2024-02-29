//bu layout bileşeni sayesinde url de alınan id ile eşleşen 
//note'un bilgilerini bulucaz ve 
//bu bilgileri bütün alt route lara aktarcaz

import { Navigate, Outlet, useParams } from "react-router-dom"
import { Note } from "../types";

type LayoutProps = {
notes:Note[],
}

const Layout = ({notes}:LayoutProps) => {
    //1)URL den id yi al
    const {id} = useParams();

    //2) url den alınan id ile eşlesen note'u bul
const found = notes.find((n)=> n.id === id);
//3=> note bulunamdıysa kullanıcıyı anasayfaya yönlendir
if(!found) return <Navigate to={'/'}/>

//4=>note bulunduysa bulunan note'u alt route aktar

  return <Outlet context={found}/>;
}

export default Layout
