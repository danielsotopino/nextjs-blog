import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from '../../styles/utils.module.css'
import { useForm } from "react-hook-form";
import Alert from 'react-bootstrap/Alert'
import useSWR from 'swr'
import Axios from "axios";

export default function Form() {
    const { register, handleSubmit, errors, watch } = useForm({ mode: 'onBlur' });
    const watchAllFields = watch();
    const onSubmit = formData => {
        alert(JSON.stringify(formData));
        Axios.get('/api/form').then(res => {
            alert('Resultado: ' + res.data.text);
        });
    }

    return (
        <Layout>
            <Head>
                <title>Form example</title>
            </Head>
            <h1 className={utilStyles.headingXl}>Form example</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        // Register input
                        ref={register({ required: true, maxLength: 10 })}
                        name="title"
                        type="text"
                        className="form-control"
                        id="title" />
                    {errors.title &&
                        // if errors then display alert
                        <Alert variant="danger">
                            {/* // if title error type is "required" display following message */}
                            {errors.title?.type === "required" && <p>Title is required</p>}
                            {/* // if title error type is "maxLength" display following message */}
                            {errors.title?.type === "maxLength" && <p>Max length of title is 10 characters!</p>}
                        </Alert>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        // Register input
                        ref={register({ required: true, maxLength:  50})}
                        name="description"
                        rows="5"
                        type="text"
                        className="form-control"
                        id="description">
                    </textarea>
                    {errors.description &&
                        // if errors then display alert
                        <Alert variant="danger">
                            {/* // if title error type is "required" display following message */}
                            {errors.description?.type === "required" && <p>Description is required</p>}
                            {/* // if title error type is "maxLength" display following message */}
                            {errors.description?.type === "maxLength" && <p>Max length of title is 50 characters!</p>}
                        </Alert>
                    }
                </div>
                <button
                    type="submit"
                    className="btn btn-primary">Create
                </button>
            </form>
        
        </Layout>
    )
}