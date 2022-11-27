import Head from 'next/head';
import Layout from '../layout/layout';
import styles from '../styles/Form.module.css';
import Link from 'next/link';

import {HiOutlineUser, HiAtSymbol, HiFingerPrint} from 'react-icons/hi';
import {useState} from 'react';
import {useFormik} from 'formik';
import {register_validate} from '../lib/validate';
import {useRouter} from 'next/router';
import {Toast} from '../components/toast';

interface ValuesForm {
	name: string;
	email: string;
	password: string;
	cpassword: string;
}

export default function Register() {
	const [show, setShow] = useState({password: false, cpassword: false});
	const [error, setError] = useState(null);

	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			cpassword: '',
		},
		validate: register_validate,
		onSubmit,
	});

	async function onSubmit(values: ValuesForm) {
		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(values),
		};

		await fetch('http://localhost:3000/api/auth/signup', options)
			.then((res) => res.json())
			.then((user) => {
				if (user?.status === true) {
					router.push('http://localhost:3000/');
				} else {
					if (user?.message) {
						setError(user?.message);
					} else {
						setError(null);
					}
				}
			});
	}

	return (
		<Layout>
			<Head>
				<title>Register</title>
			</Head>

			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
					<p className="w-3/4 mx-auto text-sm text-gray-400">Lorem Ipsum is simply dummy text of the.</p>
				</div>

				<form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
					<div className={`${styles.input_group} ${formik.errors.name && formik.touched.name ? 'border-rose-600' : ''}`}>
						<input type="text" name="name" placeholder="name" className={styles.input_text} {...(formik.getFieldProps('name') as any)} />

						<span className="icon flex items-center px-4">
							<HiOutlineUser size={25} />
						</span>
					</div>
					{formik.errors.name && formik.touched.name ? <Toast errorMessage={`${formik.errors.name}`} /> : <></>}

					{error ? <Toast errorMessage={`${error}`} /> : <></>}

					<div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
						<input type="email" name="email" placeholder="Email" className={styles.input_text} {...(formik.getFieldProps('email') as any)} />

						<span className="icon flex items-center px-4">
							<HiAtSymbol size={25} />
						</span>
					</div>
					{formik.errors.email && formik.touched.email ? <Toast errorMessage={`${formik.errors.email}`} /> : <></>}

					{/* 				{formik.errors.email && formik.touched.email ? <span className="text-rose-500">{formik.errors.email}</span> : <></>} */}
					<div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
						<input type={`${show.password ? 'text' : 'password'}`} name="password" placeholder="Password" className={styles.input_text} {...(formik.getFieldProps('password') as any)} />

						<span className="icon flex items-center px-4" onClick={() => setShow({...show, password: !show.password})}>
							<HiFingerPrint size={25} />
						</span>
					</div>
					{formik.errors.password && formik.touched.password ? <Toast errorMessage={`${formik.errors.password}`} /> : <></>}

					{/* 	{formik.errors.password && formik.touched.password ? <span className="text-rose-500">{formik.errors.password}</span> : <></>} */}
					<div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
						<input type={`${show.cpassword ? 'text' : 'password'}`} name="cpassword" placeholder="Confirm Passowrd" className={styles.input_text} {...(formik.getFieldProps('cpassword') as any)} />

						<span className="icon flex items-center px-4" onClick={() => setShow({...show, cpassword: !show.cpassword})}>
							<HiFingerPrint size={25} />
						</span>
					</div>

					{formik.errors.cpassword && formik.touched.cpassword ? <Toast errorMessage={`${formik.errors.cpassword}`} /> : <></>}

					{/* 	{formik.errors.cpassword && formik.touched.cpassword ? <span className="text-rose-500">{formik.errors.cpassword}</span> : <></>} */}
					<div className="input-button">
						<button type="submit" className={styles.button}>
							Sign Up
						</button>
					</div>
				</form>

				<p className="text-center text-gray-400">
					Have an account?
					<Link className="text-blue-700" href={'/login'}>
						Sign In
					</Link>
				</p>
			</section>
		</Layout>
	);
}
