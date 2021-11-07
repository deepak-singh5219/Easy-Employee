import { useEffect, useState } from "react";
import { useParams } from "react-router";
import HeaderSection from "../../components/HeaderSection";
import Navigation from "../../components/navigation";
import SideBar from "../../components/sidebar";
import { getTeam, updateTeam } from "../../http";

const EditTeam = () =>
{
    const [imagePreview, setImagePreview] = useState('http://localhost:5500/storage/images/profile/profile-1636215026196-734067891umair.jpg');
    const [formData,setFormData] = useState({
        name:'',
        description:'',
        image:''
    });

    const {id} = useParams();

    useEffect(()=>{
        (async () =>{
            const {data} = await getTeam(id);
            setFormData(data.data);
            setImagePreview(data.data.image)
        })();
    },[])

    const inputEvent = (e) =>
    {
        const {name,value} = e.target;
        setFormData((old)=>
        {
            return{
                ...old,
                [name]:value
            }

        })
    }

    const onSubmit = async (e) =>
    {
        e.preventDefault();

        const {name,description} = formData;
        if(!name || !description) return;

        const fd = new FormData();
        Object.keys(formData).map((key)=>
        {
            fd.append(key,formData[key]);
            console.log(formData[key])
        })

        console.log(fd);
        const res = await updateTeam(id,fd);
        console.log(res);
    }

    const captureImage = (e) =>
    {
        const file = e.target.files[0];
        setFormData((old)=>
        {
            return{
                ...old,
                image:file
            }

        })
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>
        {
            setImagePreview(reader.result);
        }
    }

    return(
        <>
        <Navigation/>
        <SideBar/>
        <div className="main-content">
        <section className="section">
            <HeaderSection title='Edit Team'/>
                <div className="card">
                  <div className="card-body pr-5 pl-5 m-1">
                    <form className='row' onSubmit={onSubmit}>
                        <div className="form-group col-md-12 text-center">
                            <div className="input-group justify-content-center">
                                <input type="file" id='image' name='image' className="form-control d-none" onChange={captureImage} accept="image/*" />
                                <label htmlFor='image'> <img className='rounded' src={imagePreview} width='120' alt="" /> </label>
                            </div>
                        </div>

                        <div className="form-group col-md-12">
                            <label>Enter Team Name</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.name} type="text" id='name' name='name' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group col-md-12 ">
                            <label>Enter Team Description</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-file-alt"></i>
                                </div>
                                </div>
                                <input onChange={inputEvent} value={formData.description} type="text" id='description' name='description' className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group text-center col-md-12">
                            <button className='btn btn-primary btn-lg' type='submit' style={{width:'30vh'}}>Update Team</button>
                        </div>

                    </form>
                  </div>
                </div>
        </section>
      </div>
      </>
    )
}

export default EditTeam;