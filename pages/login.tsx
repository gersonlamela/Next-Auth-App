import Head from 'next/head';
import Layout from '../layout/layout';
import styles from '../styles/Form.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {HiAtSymbol, HiFingerPrint} from 'react-icons/hi';
import {useState} from 'react';
import {signIn, useSession} from 'next-auth/react';
import {useFormik} from 'formik';
import login_validate from '../lib/validate';
import {useRouter} from 'next/router';
import {Toast} from '../components/toast';
import {withFormik, FormikProps, FormikErrors, Field, Form} from 'formik';

interface FormValues {
	email: string;
	password: string;
}

export default function Login(props: FormikProps<FormValues>) {
	const {isSubmitting} = props;
	const [show, setShow] = useState(false);
	const [error, setError] = useState(null);
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate: login_validate,
		onSubmit,
	});

	async function onSubmit(values: FormValues) {
		const status: any = await signIn('credentials', {
			redirect: false,
			email: values.email,
			password: values.password,
			callbackUrl: '/',
		});

		if (status?.error) {
			setError(status.error);
		} else {
			setError(null);
		}

		console.log(status);
		if (status.url) router.push(status.url);

		if (status.ok) router.push(status.url);
	}

	//Google Handler function

	async function handleGoogleSignin() {
		signIn('google', {callbackUrl: 'http://localhost:3000/'});
	}
	//Github Login
	async function handleGithubSignin() {
		signIn('github', {callbackUrl: 'http://localhost:3000/'});
	}

	return (
		<Layout>
			<Head>
				<title>Login</title>
			</Head>

			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
					<p className="w-3/4 mx-auto text-sm text-gray-400">Lorem Ipsum is simply dummy text of the.</p>
				</div>

				<form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
					<div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
						<input type="email" name="email" placeholder="Email" className={styles.input_text} {...(formik.getFieldProps('email') as any)} />

						<span className="icon flex items-center px-4">
							<HiAtSymbol size={25} />
						</span>
					</div>
					{formik.errors.email && formik.touched.email ? <Toast errorMessage={`${formik.errors.email}`} /> : <></>}

					<div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
						<input type={`${show ? 'text' : 'password'}`} name="password" placeholder="Password" className={styles.input_text} {...(formik.getFieldProps('password') as any)} />

						<span className="icon flex items-center px-4" onClick={() => setShow(!show)}>
							<HiFingerPrint size={25} />
						</span>
					</div>

					{formik.errors.password && formik.touched.password ? <Toast errorMessage={`${formik.errors.password}`} /> : <></>}
					{error ? <Toast errorMessage={`${error}`} /> : <></>}

					<div className="input-button">
						<button type="submit" className={styles.button} disabled={isSubmitting}>
							Login
						</button>
					</div>
					<div className="input-button">
						<button type="button" className={styles.button_custom} onClick={handleGoogleSignin}>
							Sign In with Google <Image src={'/assets/google.svg'} width="20" height={20} alt="Google"></Image>
						</button>
					</div>
					<div className="input-button">
						<button type="button" className={styles.button_custom} onClick={handleGithubSignin}>
							Sign In with GitHub <Image alt="github" src={'/assets/github.svg'} width={20} height={20}></Image>
						</button>
					</div>
				</form>

				<p className="text-center text-gray-400">
					don't have an account yet?
					<Link className="text-blue-700" href={'/register'}>
						Sign Up
					</Link>
				</p>
			</section>
		</Layout>
	);
}
